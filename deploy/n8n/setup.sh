#!/usr/bin/env bash
# One-shot form-capture setup: imports both workflows into n8n, creates the
# GHL credential from env, fills the GHL IDs, activates, and fires a test.
#
# Run ON THE VPS (where n8n lives), from the repo root:
#
#   export N8N_API_KEY='...'      # n8n → Settings → n8n API → create key
#   export GHL_API_KEY='...'      # GHL → Settings → Private Integrations
#   export GHL_LOCATION_ID='...'  # GHL → Settings → Business Profile
#   bash deploy/n8n/setup.sh
#
# Before running: create ONE pipeline in GHL named "Build Sprint" with a
# first stage named "New application" (GHL's public API cannot create
# pipelines, only read them; everything else here is automated).
#
# Secrets stay in env, per security.md. Nothing is written to the repo.
set -euo pipefail

N8N_URL="${N8N_URL:-http://localhost:5678}"
GHL_API="https://services.leadconnectorhq.com"
DIR="$(cd "$(dirname "$0")" && pwd)"

for v in N8N_API_KEY GHL_API_KEY GHL_LOCATION_ID; do
  [ -n "${!v:-}" ] || { echo "Missing \$$v — see the header of this script."; exit 1; }
done

n8n() { curl -sS -H "X-N8N-API-KEY: $N8N_API_KEY" -H 'Content-Type: application/json' "$@"; }
ghl() { curl -sS -H "Authorization: Bearer $GHL_API_KEY" -H 'Version: 2021-07-28' "$@"; }

echo "1/5 Looking up the Build Sprint pipeline in GHL..."
PIPES=$(ghl "$GHL_API/opportunities/pipelines?locationId=$GHL_LOCATION_ID")
PIPELINE_ID=$(echo "$PIPES" | python3 -c "
import json,sys
d=json.load(sys.stdin)
for p in d.get('pipelines',[]):
    if p.get('name','').strip().lower()=='build sprint':
        print(p['id']); break")
[ -n "$PIPELINE_ID" ] || { echo "No pipeline named 'Build Sprint' found in GHL. Create it (stages: New application, Fit call, Building, Done) and rerun."; exit 1; }
STAGE_ID=$(echo "$PIPES" | python3 -c "
import json,sys
d=json.load(sys.stdin)
for p in d.get('pipelines',[]):
    if p['id']=='$PIPELINE_ID':
        for s in p.get('stages',[]):
            if 'new' in s.get('name','').lower(): print(s['id']); break
        else:
            print(p['stages'][0]['id'] if p.get('stages') else '')")
[ -n "$STAGE_ID" ] || { echo "Pipeline has no stages; add 'New application' and rerun."; exit 1; }
echo "   pipeline $PIPELINE_ID / stage $STAGE_ID"

echo "2/5 Creating the GHL credential in n8n..."
CRED_ID=$(n8n -X POST "$N8N_URL/api/v1/credentials" -d "{
  \"name\": \"GHL\",
  \"type\": \"httpHeaderAuth\",
  \"data\": { \"name\": \"Authorization\", \"value\": \"Bearer $GHL_API_KEY\" }
}" | python3 -c "import json,sys; print(json.load(sys.stdin).get('id',''))")
[ -n "$CRED_ID" ] || { echo "Credential creation failed (a credential named GHL may already exist — delete it in n8n and rerun)."; exit 1; }
echo "   credential $CRED_ID"

import_wf() {  # $1 = json file
  python3 - "$1" "$CRED_ID" "$GHL_LOCATION_ID" "$PIPELINE_ID" "$STAGE_ID" <<'PY'
import json, sys
wf = json.load(open(sys.argv[1]))
cred, loc, pipe, stage = sys.argv[2:6]
s = json.dumps(wf)
s = s.replace('REPLACE_WITH_GHL_LOCATION_ID', loc)
s = s.replace('REPLACE_WITH_PIPELINE_ID', pipe)
s = s.replace('REPLACE_WITH_NEW_APPLICATION_STAGE_ID', stage)
wf = json.loads(s)
for n in wf['nodes']:
    if n['type'] == 'n8n-nodes-base.httpRequest':
        n['credentials'] = {'httpHeaderAuth': {'id': cred, 'name': 'GHL'}}
# the public API accepts only these fields
print(json.dumps({'name': wf['name'], 'nodes': wf['nodes'],
                  'connections': wf['connections'], 'settings': wf.get('settings', {})}))
PY
}

echo "3/5 Importing and activating both workflows..."
for f in lead-capture apply; do
  BODY=$(import_wf "$DIR/$f.workflow.json")
  WID=$(n8n -X POST "$N8N_URL/api/v1/workflows" -d "$BODY" | python3 -c "import json,sys; print(json.load(sys.stdin).get('id',''))")
  [ -n "$WID" ] || { echo "Import of $f failed."; exit 1; }
  n8n -X POST "$N8N_URL/api/v1/workflows/$WID/activate" >/dev/null
  echo "   $f imported ($WID) and active"
done

echo "4/5 Test submission -> lead-capture..."
R=$(curl -sS -X POST "https://auto.shiftandlead.com/webhook/lead-capture" \
  -H 'Content-Type: application/json' \
  -d '{"email":"setup-test@shiftandlead.com","source":"setup-test","_gotcha":""}')
echo "   response: $R"

echo "5/5 Done. Check GHL for a contact tagged 'setup-test', then delete it."
echo "Reminder: add the GHL notification automation (tag apply-build-sprint or"
echo "apply-workshop added -> notify me) so no application is ever missed."
