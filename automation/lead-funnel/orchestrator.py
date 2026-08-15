from __future__ import annotations

import argparse
import asyncio
import json
import os
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from dotenv import load_dotenv
from openai_codex import AsyncCodex, Sandbox

HERE = Path(__file__).resolve().parent
REPO_ROOT = HERE.parents[1]
PROMPTS = HERE / "prompts"
SCHEMA_PATH = HERE / "schemas" / "agent-result.schema.json"
STATE_DIR = HERE / "state"

load_dotenv(HERE / ".env")


def load_text(name: str) -> str:
    return (PROMPTS / name).read_text(encoding="utf-8")


def load_schema() -> dict[str, Any]:
    return json.loads(SCHEMA_PATH.read_text(encoding="utf-8"))


def parse_result(result: Any) -> dict[str, Any]:
    raw = getattr(result, "final_response", None)
    if not raw:
        raise RuntimeError("Codex turn completed without a final structured response")
    try:
        return json.loads(raw)
    except json.JSONDecodeError as exc:
        raise RuntimeError(f"Agent returned invalid JSON: {raw[:500]}") from exc


def require_pass(stage: str, data: dict[str, Any]) -> None:
    if data.get("status") != "done" or not data.get("tests_passed", False):
        blockers = "; ".join(data.get("blockers", [])) or "unspecified blocker"
        raise RuntimeError(f"{stage} did not pass: {blockers}")


def require_test_email() -> str:
    value = os.getenv("FUNNEL_TEST_EMAIL", "").strip()
    if not value:
        raise RuntimeError(
            "FUNNEL_TEST_EMAIL is required for integration/QA runs. "
            "Set it in automation/lead-funnel/.env or export it in the shell."
        )
    return value


def context_block(**stages: dict[str, Any]) -> str:
    return "\n\nPRIOR VERIFIED STAGE OUTPUTS:\n" + json.dumps(stages, indent=2)


def save_checkpoint(report: dict[str, Any]) -> Path:
    STATE_DIR.mkdir(parents=True, exist_ok=True)
    path = STATE_DIR / "latest.json"
    path.write_text(json.dumps(report, indent=2), encoding="utf-8")
    return path


def save_run(report: dict[str, Any]) -> Path:
    STATE_DIR.mkdir(parents=True, exist_ok=True)
    stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    path = STATE_DIR / f"run-{stamp}.json"
    path.write_text(json.dumps(report, indent=2), encoding="utf-8")
    save_checkpoint(report)
    return path


def record_stage(report: dict[str, Any], name: str, result: dict[str, Any]) -> None:
    report.setdefault("stages", {})[name] = result
    save_checkpoint(report)
    require_pass(name, result)


async def fork_agent(
    codex: AsyncCodex,
    master_id: str,
    *,
    name: str,
    prompt_file: str,
    task: str,
    schema: dict[str, Any],
    sandbox: Sandbox = Sandbox.workspace_write,
    model: str | None = None,
) -> dict[str, Any]:
    thread = await codex.thread_fork(
        master_id,
        cwd=str(REPO_ROOT),
        developer_instructions=load_text(prompt_file),
        sandbox=sandbox,
        model=model,
    )
    await thread.set_name(name)
    result = await thread.run(task, output_schema=schema, sandbox=sandbox, model=model)
    return parse_result(result)


async def start_master(codex: AsyncCodex, model: str | None) -> Any:
    master = await codex.thread_start(
        cwd=str(REPO_ROOT),
        developer_instructions=load_text("master.md"),
        sandbox=Sandbox.workspace_write,
        model=model,
    )
    await master.set_name("Shift & Lead Funnel Orchestrator")
    return master


async def audit_only(
    codex: AsyncCodex,
    master: Any,
    schema: dict[str, Any],
    model: str | None,
) -> dict[str, Any]:
    return await fork_agent(
        codex,
        master.id,
        name="Funnel Audit",
        prompt_file="audit.md",
        task=(
            "Execute the complete non-mutating audit now. "
            "Confirm the legacy guide capture is not reused for the new funnel. "
            "Return only the required structured result."
        ),
        schema=schema,
        sandbox=Sandbox.read_only,
        model=model,
    )


async def prepare_funnel(model: str | None) -> dict[str, Any]:
    require_test_email()
    schema = load_schema()
    report: dict[str, Any] = {"mode": "bootstrap", "status": "running", "stages": {}}

    async with AsyncCodex() as codex:
        master = await start_master(codex, model)

        audit = await audit_only(codex, master, schema, model)
        record_stage(report, "audit", audit)

        data_model = await fork_agent(
            codex,
            master.id,
            name="Lead Magnet Data Model",
            prompt_file="data-model.md",
            task=(
                "Validate the canonical registry against the current repository. "
                "Keep guide publication state separate from funnel/DM activation state. "
                "Make only evidence-based registry corrections."
                + context_block(audit=audit)
            ),
            schema=schema,
            model=model,
        )
        record_stage(report, "data_model", data_model)

        ghl = await fork_agent(
            codex,
            master.id,
            name="GHL Architect",
            prompt_file="ghl.md",
            task=(
                "Configure or verify the reusable GoHighLevel v2 guide-capture architecture. "
                "The old n8n/formspree-lead guide capture is legacy and must not be reused. "
                "Do not message existing contacts. Return a concrete integration contract "
                "for the website agent in handoff."
                + context_block(audit=audit, data_model=data_model)
            ),
            schema=schema,
            model=model,
        )
        record_stage(report, "ghl", ghl)

        website_task = fork_agent(
            codex,
            master.id,
            name="Website Funnel Builder",
            prompt_file="website.md",
            task=(
                "Implement the new reusable inline guide capture using the verified GHL "
                "integration contract. Replace/retire legacy guide-capture wiring only on "
                "eligible guide pages touched by this funnel. Do not deploy or push."
                + context_block(audit=audit, data_model=data_model, ghl=ghl)
            ),
            schema=schema,
            model=model,
        )
        content_task = fork_agent(
            codex,
            master.id,
            name="Content Campaign Builder",
            prompt_file="content.md",
            task=(
                "Prepare repository-based campaign assets for approved campaigns only. "
                "Do not publish, push, or activate external messaging."
                + context_block(data_model=data_model)
            ),
            schema=schema,
            model=model,
        )
        website, content = await asyncio.gather(website_task, content_task)
        record_stage(report, "website", website)
        record_stage(report, "content", content)

        blotato = await fork_agent(
            codex,
            master.id,
            name="Blotato Draft Builder",
            prompt_file="blotato.md",
            task=(
                "Prepare/reuse Instagram keyword automations only for registry records whose "
                "DM automation is explicitly enabled and campaign status is approved. "
                "Keep them draft/inactive. Do not activate production messaging."
                + context_block(data_model=data_model, content=content, website=website)
            ),
            schema=schema,
            model=model,
        )
        record_stage(report, "blotato_draft", blotato)

        release = await fork_agent(
            codex,
            master.id,
            name="Release Preparation",
            prompt_file="deploy.md",
            task=(
                "Prepare the repository changes for human review: create/update the dedicated "
                "branch and draft PR according to repo conventions. Never merge. Obtain the "
                "Vercel preview URL/deployment if available."
                + context_block(
                    data_model=data_model,
                    website=website,
                    content=content,
                    blotato_draft=blotato,
                )
            ),
            schema=schema,
            model=model,
        )
        record_stage(report, "release_prepare", release)

        preview_qa = await fork_agent(
            codex,
            master.id,
            name="Preview Funnel QA",
            prompt_file="qa.md",
            task=(
                "Run preview/integration QA using FUNNEL_TEST_EMAIL. Verify the new v2 "
                "capture path reaches GHL and does not call the retired guide endpoint. "
                "Do not activate production DMs."
                + context_block(ghl=ghl, website=website, release_prepare=release)
            ),
            schema=schema,
            sandbox=Sandbox.read_only,
            model=model,
        )
        record_stage(report, "preview_qa", preview_qa)

    report["status"] = "ready_for_human_review"
    report["next_action"] = (
        "Review the draft PR produced by release_prepare. Merge it manually only after "
        "preview QA passes, then run `python orchestrator.py launch --pr <number>`."
    )
    return report


async def launch(pr_number: int, model: str | None) -> dict[str, Any]:
    require_test_email()
    schema = load_schema()
    report: dict[str, Any] = {
        "mode": "launch",
        "pr": pr_number,
        "status": "running",
        "stages": {},
    }

    async with AsyncCodex() as codex:
        master = await start_master(codex, model)

        production = await fork_agent(
            codex,
            master.id,
            name="Production Verification",
            prompt_file="deploy.md",
            task=(
                f"Verify PR #{pr_number} was merged by a human into the production branch. "
                "Do not merge it yourself. Verify the corresponding Vercel production "
                "deployment is READY and record the production URL/commit/deployment."
            ),
            schema=schema,
            sandbox=Sandbox.read_only,
            model=model,
        )
        record_stage(report, "production_verify", production)

        production_qa = await fork_agent(
            codex,
            master.id,
            name="Production Funnel QA",
            prompt_file="qa.md",
            task=(
                "Run production guide -> v2 capture -> GHL -> delivery QA with the designated "
                "test contact. Confirm the legacy guide endpoint is not used. "
                "Do not activate Blotato yet."
                + context_block(production_verify=production)
            ),
            schema=schema,
            sandbox=Sandbox.read_only,
            model=model,
        )
        record_stage(report, "production_qa", production_qa)

        activation = await fork_agent(
            codex,
            master.id,
            name="Blotato Activation",
            prompt_file="blotato.md",
            task=(
                "Production QA passed. Re-verify and activate only registry campaigns with "
                "dmAutomationEnabled=true and campaignStatus=approved. Test one authorized "
                "interaction before activating any additional approved automation."
                + context_block(production_qa=production_qa)
            ),
            schema=schema,
            model=model,
        )
        record_stage(report, "blotato_activation", activation)

        active_count = int(
            activation.get("handoff", {}).get("active_automation_count", 0) or 0
        )
        if active_count == 0:
            report["status"] = "capture_live_dm_pending"
            report["next_action"] = (
                "The website -> GHL capture is live and verified, but no DM campaign is "
                "approved for activation. Run the campaign command for the first approved "
                "Instagram/Blotato campaign, then launch that campaign PR."
            )
            return report

        e2e = await fork_agent(
            codex,
            master.id,
            name="Instagram End-to-End QA",
            prompt_file="qa.md",
            task=(
                "Run the final authorized Instagram -> Blotato -> tracked production guide -> "
                "new v2 email capture -> GHL -> guide delivery -> nurture enrollment test."
                + context_block(
                    production_qa=production_qa,
                    blotato_activation=activation,
                )
            ),
            schema=schema,
            sandbox=Sandbox.read_only,
            model=model,
        )
        record_stage(report, "e2e", e2e)

    report["status"] = "done"
    return report


async def run_campaign(brief_path: Path, model: str | None) -> dict[str, Any]:
    require_test_email()
    schema = load_schema()
    brief = brief_path.read_text(encoding="utf-8")
    report: dict[str, Any] = {
        "mode": "campaign",
        "brief": str(brief_path),
        "status": "running",
        "stages": {},
    }

    async with AsyncCodex() as codex:
        master = await start_master(codex, model)

        audit = await audit_only(codex, master, schema, model)
        record_stage(report, "audit", audit)

        campaign = await fork_agent(
            codex,
            master.id,
            name="New Lead Magnet Campaign",
            prompt_file="new-campaign.md",
            task=(
                "Create/update only the approved campaign plan, guide/content assets and "
                "registry metadata for this brief. Do not configure external SaaS, deploy, "
                "merge, publish, or activate messaging in this stage.\n\nBRIEF:\n"
                f"{brief}"
                + context_block(audit=audit)
            ),
            schema=schema,
            model=model,
        )
        record_stage(report, "campaign", campaign)

        ghl = await fork_agent(
            codex,
            master.id,
            name="GHL Campaign Verification",
            prompt_file="ghl.md",
            task=(
                "Verify the v2 GHL master architecture accepts the newly registered campaign. "
                "Create only genuinely missing guide-specific metadata. Do not reuse the "
                "legacy n8n/formspree-lead guide capture."
                + context_block(campaign=campaign)
            ),
            schema=schema,
            model=model,
        )
        record_stage(report, "ghl", ghl)

        website = await fork_agent(
            codex,
            master.id,
            name="Website Campaign Verification",
            prompt_file="website.md",
            task=(
                "Verify the reusable v2 guide capture recognizes the new campaign and make "
                "only required repository changes. Do not deploy or push."
                + context_block(campaign=campaign, ghl=ghl)
            ),
            schema=schema,
            model=model,
        )
        record_stage(report, "website", website)

        blotato = await fork_agent(
            codex,
            master.id,
            name="Blotato Campaign Draft",
            prompt_file="blotato.md",
            task=(
                "Prepare/reuse this campaign's keyword automation in draft/inactive state "
                "only, and only if the registry explicitly enables it."
                + context_block(campaign=campaign, website=website)
            ),
            schema=schema,
            model=model,
        )
        record_stage(report, "blotato_draft", blotato)

        release = await fork_agent(
            codex,
            master.id,
            name="Campaign Release Preparation",
            prompt_file="deploy.md",
            task=(
                "Create/update a dedicated branch and draft PR for the campaign. Never merge. "
                "Obtain the Vercel preview URL/deployment if available."
                + context_block(
                    campaign=campaign,
                    website=website,
                    blotato_draft=blotato,
                )
            ),
            schema=schema,
            model=model,
        )
        record_stage(report, "release_prepare", release)

        preview_qa = await fork_agent(
            codex,
            master.id,
            name="Campaign Preview QA",
            prompt_file="qa.md",
            task=(
                "Run preview QA for the campaign with the designated test contact. "
                "Do not activate Blotato."
                + context_block(
                    campaign=campaign,
                    ghl=ghl,
                    release_prepare=release,
                )
            ),
            schema=schema,
            sandbox=Sandbox.read_only,
            model=model,
        )
        record_stage(report, "preview_qa", preview_qa)

    report["status"] = "ready_for_human_review"
    report["next_action"] = (
        "Review and manually merge the draft PR after QA, then run "
        "`python orchestrator.py launch --pr <number>`."
    )
    return report


async def run_repair(incident_path: Path, model: str | None) -> dict[str, Any]:
    require_test_email()
    schema = load_schema()
    incident = incident_path.read_text(encoding="utf-8")
    report: dict[str, Any] = {
        "mode": "repair",
        "incident": str(incident_path),
        "status": "running",
        "stages": {},
    }

    async with AsyncCodex() as codex:
        master = await start_master(codex, model)
        repair = await fork_agent(
            codex,
            master.id,
            name="Funnel Repair",
            prompt_file="repair.md",
            task=(
                "Diagnose and repair this incident using the smallest responsible change. "
                "Treat the n8n/formspree-lead guide capture as legacy, not the target system.\n\n"
                f"INCIDENT:\n{incident}"
            ),
            schema=schema,
            model=model,
        )
        record_stage(report, "repair", repair)

        qa = await fork_agent(
            codex,
            master.id,
            name="Repair Regression QA",
            prompt_file="qa.md",
            task=(
                "Re-run the affected test and then the complete v2 funnel smoke test."
                + context_block(repair=repair)
            ),
            schema=schema,
            sandbox=Sandbox.read_only,
            model=model,
        )
        record_stage(report, "qa", qa)

    report["status"] = "done"
    return report


async def main() -> None:
    parser = argparse.ArgumentParser(
        description="Shift & Lead Codex lead-funnel orchestrator"
    )
    sub = parser.add_subparsers(dest="command", required=True)
    sub.add_parser("audit")
    sub.add_parser("bootstrap")

    launch_cmd = sub.add_parser("launch")
    launch_cmd.add_argument("--pr", required=True, type=int)

    campaign = sub.add_parser("campaign")
    campaign.add_argument("--brief", required=True, type=Path)

    repair = sub.add_parser("repair")
    repair.add_argument("--incident", required=True, type=Path)

    args = parser.parse_args()
    model = os.getenv("CODEX_MODEL") or None

    report: dict[str, Any] | None = None
    try:
        if args.command == "audit":
            schema = load_schema()
            async with AsyncCodex() as codex:
                master = await start_master(codex, model)
                audit = await audit_only(codex, master, schema, model)
                report = {"mode": "audit", "status": "running", "stages": {}}
                record_stage(report, "audit", audit)
                report["status"] = "done"
        elif args.command == "bootstrap":
            report = await prepare_funnel(model)
        elif args.command == "launch":
            report = await launch(args.pr, model)
        elif args.command == "campaign":
            report = await run_campaign(args.brief, model)
        else:
            report = await run_repair(args.incident, model)

        path = save_run(report)
        print(json.dumps(report, indent=2))
        print(f"\nSaved run report: {path}")
    except Exception as exc:
        if report is not None:
            report["status"] = "failed"
            report["error"] = str(exc)
            save_checkpoint(report)
        raise


if __name__ == "__main__":
    asyncio.run(main())
