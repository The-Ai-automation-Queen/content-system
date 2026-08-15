from __future__ import annotations

import argparse
import asyncio
import json
import os
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from openai_codex import AsyncCodex, Sandbox

HERE = Path(__file__).resolve().parent
REPO_ROOT = HERE.parents[1]
PROMPTS = HERE / "prompts"
SCHEMA_PATH = HERE / "schemas" / "agent-result.schema.json"
STATE_DIR = HERE / "state"


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


def save_run(report: dict[str, Any]) -> Path:
    STATE_DIR.mkdir(parents=True, exist_ok=True)
    stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    path = STATE_DIR / f"run-{stamp}.json"
    path.write_text(json.dumps(report, indent=2), encoding="utf-8")
    return path


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


async def audit_only(codex: AsyncCodex, master: Any, schema: dict[str, Any], model: str | None) -> dict[str, Any]:
    return await fork_agent(
        codex,
        master.id,
        name="Funnel Audit",
        prompt_file="audit.md",
        task="Execute the complete non-mutating audit now. Return only the required structured result.",
        schema=schema,
        sandbox=Sandbox.read_only,
        model=model,
    )


async def bootstrap(model: str | None) -> dict[str, Any]:
    schema = load_schema()
    report: dict[str, Any] = {"mode": "bootstrap", "stages": {}}

    async with AsyncCodex() as codex:
        master = await start_master(codex, model)

        audit = await audit_only(codex, master, schema, model)
        report["stages"]["audit"] = audit
        require_pass("audit", audit)

        data_model = await fork_agent(
            codex,
            master.id,
            name="Lead Magnet Data Model",
            prompt_file="data-model.md",
            task="Validate the canonical registry against the current repository and make only evidence-based registry corrections.",
            schema=schema,
            model=model,
        )
        report["stages"]["data_model"] = data_model
        require_pass("data_model", data_model)

        ghl = await fork_agent(
            codex,
            master.id,
            name="GHL Architect",
            prompt_file="ghl.md",
            task="Configure or verify the reusable GoHighLevel lead-magnet CRM architecture. Do not message existing contacts.",
            schema=schema,
            model=model,
        )
        report["stages"]["ghl"] = ghl
        require_pass("ghl", ghl)

        website_task = fork_agent(
            codex,
            master.id,
            name="Website Funnel Builder",
            prompt_file="website.md",
            task="Implement the reusable inline guide capture wired to the verified GHL integration. Do not deploy production.",
            schema=schema,
            model=model,
        )
        content_task = fork_agent(
            codex,
            master.id,
            name="Content Campaign Builder",
            prompt_file="content.md",
            task="Prepare repository-based campaign assets for current live lead magnets without publishing them.",
            schema=schema,
            model=model,
        )
        website, content = await asyncio.gather(website_task, content_task)
        report["stages"]["website"] = website
        report["stages"]["content"] = content
        require_pass("website", website)
        require_pass("content", content)

        blotato = await fork_agent(
            codex,
            master.id,
            name="Blotato Draft Builder",
            prompt_file="blotato.md",
            task="Prepare/reuse the registry-driven Instagram keyword automations in draft/inactive state only. Do not activate production messaging.",
            schema=schema,
            model=model,
        )
        report["stages"]["blotato_draft"] = blotato
        require_pass("blotato_draft", blotato)

        preview_qa = await fork_agent(
            codex,
            master.id,
            name="Preview Funnel QA",
            prompt_file="qa.md",
            task="Run preview/integration QA using the designated test email. Do not activate production DMs.",
            schema=schema,
            sandbox=Sandbox.read_only,
            model=model,
        )
        report["stages"]["preview_qa"] = preview_qa
        require_pass("preview_qa", preview_qa)

        deploy = await fork_agent(
            codex,
            master.id,
            name="Production Deployment",
            prompt_file="deploy.md",
            task="Deploy the QA-approved funnel changes through the repository's established GitHub/Vercel production process and record identifiers.",
            schema=schema,
            model=model,
        )
        report["stages"]["deploy"] = deploy
        require_pass("deploy", deploy)

        production_qa = await fork_agent(
            codex,
            master.id,
            name="Production Funnel QA",
            prompt_file="qa.md",
            task="Run production capture-to-GHL-delivery QA with one designated test contact. Do not activate Blotato yet.",
            schema=schema,
            sandbox=Sandbox.read_only,
            model=model,
        )
        report["stages"]["production_qa"] = production_qa
        require_pass("production_qa", production_qa)

        activation = await fork_agent(
            codex,
            master.id,
            name="Blotato Activation",
            prompt_file="blotato.md",
            task="Production QA passed. Re-verify and activate only the approved lead-magnet automations, testing one authorized interaction before the rest.",
            schema=schema,
            model=model,
        )
        report["stages"]["blotato_activation"] = activation
        require_pass("blotato_activation", activation)

        e2e = await fork_agent(
            codex,
            master.id,
            name="Instagram End-to-End QA",
            prompt_file="qa.md",
            task="Run the final authorized Instagram -> Blotato -> tracked production guide -> capture -> GHL -> delivery -> nurture-enrollment test.",
            schema=schema,
            sandbox=Sandbox.read_only,
            model=model,
        )
        report["stages"]["e2e"] = e2e
        require_pass("e2e", e2e)

    report["status"] = "done"
    return report


async def run_campaign(brief_path: Path, model: str | None) -> dict[str, Any]:
    schema = load_schema()
    brief = brief_path.read_text(encoding="utf-8")
    report: dict[str, Any] = {"mode": "campaign", "brief": str(brief_path), "stages": {}}

    async with AsyncCodex() as codex:
        master = await start_master(codex, model)

        campaign = await fork_agent(
            codex,
            master.id,
            name="New Lead Magnet Campaign",
            prompt_file="new-campaign.md",
            task=f"Create/update the campaign plan and repository assets for this brief. Do not activate external messaging yet.\n\nBRIEF:\n{brief}",
            schema=schema,
            model=model,
        )
        report["stages"]["campaign"] = campaign
        require_pass("campaign", campaign)

        # Reuse the same gated implementation path instead of rebuilding infrastructure blindly.
        for stage, prompt, task, sandbox in [
            ("ghl", "ghl.md", "Verify the existing master GHL architecture accepts the newly registered lead magnet; create only genuinely missing guide-specific objects.", Sandbox.workspace_write),
            ("website", "website.md", "Verify the reusable capture automatically recognizes the new lead magnet and make only required repository changes.", Sandbox.workspace_write),
            ("blotato_draft", "blotato.md", "Prepare/reuse the new keyword automation in draft/inactive state only.", Sandbox.workspace_write),
            ("preview_qa", "qa.md", "Run preview QA for the new campaign with the designated test contact.", Sandbox.read_only),
            ("deploy", "deploy.md", "Deploy the QA-approved new campaign through the established production process.", Sandbox.workspace_write),
            ("production_qa", "qa.md", "Run production QA for the new campaign. Do not activate Blotato yet.", Sandbox.read_only),
            ("blotato_activation", "blotato.md", "Production QA passed. Activate only this approved campaign automation and test one authorized trigger.", Sandbox.workspace_write),
            ("e2e", "qa.md", "Run final Instagram-to-GHL end-to-end QA for this campaign.", Sandbox.read_only),
        ]:
            result = await fork_agent(codex, master.id, name=stage, prompt_file=prompt, task=task, schema=schema, sandbox=sandbox, model=model)
            report["stages"][stage] = result
            require_pass(stage, result)

    report["status"] = "done"
    return report


async def run_repair(incident_path: Path, model: str | None) -> dict[str, Any]:
    schema = load_schema()
    incident = incident_path.read_text(encoding="utf-8")
    report: dict[str, Any] = {"mode": "repair", "incident": str(incident_path), "stages": {}}

    async with AsyncCodex() as codex:
        master = await start_master(codex, model)
        repair = await fork_agent(
            codex,
            master.id,
            name="Funnel Repair",
            prompt_file="repair.md",
            task=f"Diagnose and repair this incident using the smallest responsible change.\n\nINCIDENT:\n{incident}",
            schema=schema,
            model=model,
        )
        report["stages"]["repair"] = repair
        require_pass("repair", repair)

        qa = await fork_agent(
            codex,
            master.id,
            name="Repair Regression QA",
            prompt_file="qa.md",
            task="Re-run the affected test and then the complete funnel smoke test after the repair.",
            schema=schema,
            sandbox=Sandbox.read_only,
            model=model,
        )
        report["stages"]["qa"] = qa
        require_pass("qa", qa)

    report["status"] = "done"
    return report


async def main() -> None:
    parser = argparse.ArgumentParser(description="Shift & Lead Codex lead-funnel orchestrator")
    sub = parser.add_subparsers(dest="command", required=True)
    sub.add_parser("audit")
    sub.add_parser("bootstrap")

    campaign = sub.add_parser("campaign")
    campaign.add_argument("--brief", required=True, type=Path)

    repair = sub.add_parser("repair")
    repair.add_argument("--incident", required=True, type=Path)

    args = parser.parse_args()
    model = os.getenv("CODEX_MODEL") or None

    if args.command == "audit":
        schema = load_schema()
        async with AsyncCodex() as codex:
            master = await start_master(codex, model)
            report = {"mode": "audit", "stages": {"audit": await audit_only(codex, master, schema, model)}}
            require_pass("audit", report["stages"]["audit"])
            report["status"] = "done"
    elif args.command == "bootstrap":
        report = await bootstrap(model)
    elif args.command == "campaign":
        report = await run_campaign(args.brief, model)
    else:
        report = await run_repair(args.incident, model)

    path = save_run(report)
    print(json.dumps(report, indent=2))
    print(f"\nSaved run report: {path}")


if __name__ == "__main__":
    asyncio.run(main())
