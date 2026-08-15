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


def prompt(name: str) -> str:
    return (PROMPTS / name).read_text(encoding="utf-8")


def schema() -> dict[str, Any]:
    return json.loads(SCHEMA_PATH.read_text(encoding="utf-8"))


def parse_result(result: Any) -> dict[str, Any]:
    raw = getattr(result, "final_response", None)
    if not raw:
        raise RuntimeError("Codex turn completed without a final structured response")
    try:
        return json.loads(raw)
    except json.JSONDecodeError as exc:
        raise RuntimeError(f"Agent returned invalid JSON: {raw[:500]}") from exc


def require_pass(stage: str, result: dict[str, Any]) -> None:
    if result.get("status") != "done" or not result.get("tests_passed", False):
        blockers = "; ".join(result.get("blockers", [])) or "unspecified blocker"
        raise RuntimeError(f"{stage} did not pass: {blockers}")


def require_test_email() -> None:
    if not os.getenv("FUNNEL_TEST_EMAIL", "").strip():
        raise RuntimeError(
            "FUNNEL_TEST_EMAIL is required. Set it in automation/lead-funnel/.env "
            "or export it in the shell."
        )


def with_context(task: str, **prior: dict[str, Any]) -> str:
    if not prior:
        return task
    return task + "\n\nPRIOR VERIFIED STAGE OUTPUTS:\n" + json.dumps(prior, indent=2)


def checkpoint(report: dict[str, Any]) -> None:
    STATE_DIR.mkdir(parents=True, exist_ok=True)
    (STATE_DIR / "latest.json").write_text(
        json.dumps(report, indent=2), encoding="utf-8"
    )


def save_final(report: dict[str, Any]) -> Path:
    STATE_DIR.mkdir(parents=True, exist_ok=True)
    stamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    path = STATE_DIR / f"run-{stamp}.json"
    path.write_text(json.dumps(report, indent=2), encoding="utf-8")
    checkpoint(report)
    return path


async def start_master(codex: AsyncCodex, model: str | None) -> Any:
    master = await codex.thread_start(
        cwd=str(REPO_ROOT),
        developer_instructions=prompt("master.md"),
        sandbox=Sandbox.workspace_write,
        model=model,
    )
    await master.set_name("Shift & Lead Funnel Orchestrator")
    return master


async def run_stage(
    codex: AsyncCodex,
    master_id: str,
    report: dict[str, Any],
    *,
    stage: str,
    agent_name: str,
    prompt_file: str,
    task: str,
    model: str | None,
    sandbox: Sandbox = Sandbox.workspace_write,
) -> dict[str, Any]:
    # Re-attach permanent rules explicitly; do not depend on fork config inheritance.
    instructions = (
        prompt("master.md")
        + "\n\n--- SPECIALIST INSTRUCTIONS ---\n\n"
        + prompt(prompt_file)
    )
    thread = await codex.thread_fork(
        master_id,
        cwd=str(REPO_ROOT),
        developer_instructions=instructions,
        sandbox=sandbox,
        model=model,
    )
    await thread.set_name(agent_name)
    turn = await thread.run(
        task,
        output_schema=schema(),
        sandbox=sandbox,
        model=model,
    )
    result = parse_result(turn)
    report.setdefault("stages", {})[stage] = result
    checkpoint(report)
    require_pass(stage, result)
    return result


async def audit_stage(
    codex: AsyncCodex,
    master_id: str,
    report: dict[str, Any],
    model: str | None,
) -> dict[str, Any]:
    return await run_stage(
        codex,
        master_id,
        report,
        stage="audit",
        agent_name="Funnel Audit",
        prompt_file="audit.md",
        task=(
            "Execute the complete non-mutating audit. Confirm the legacy guide capture "
            "is not reused for v2. Return only the required structured result."
        ),
        model=model,
        sandbox=Sandbox.read_only,
    )


async def prepare_funnel(model: str | None) -> dict[str, Any]:
    require_test_email()
    report: dict[str, Any] = {"mode": "bootstrap", "status": "running", "stages": {}}

    async with AsyncCodex() as codex:
        master = await start_master(codex, model)
        audit = await audit_stage(codex, master.id, report, model)

        data_model = await run_stage(
            codex,
            master.id,
            report,
            stage="data_model",
            agent_name="Guide Funnel Data Model",
            prompt_file="data-model.md",
            task=with_context(
                "Validate guide-funnels.json against live guides, companion strategy and "
                "actual built resource routes. Keep guide publication, capture and DM "
                "activation states separate.",
                audit=audit,
            ),
            model=model,
        )

        ghl = await run_stage(
            codex,
            master.id,
            report,
            stage="ghl",
            agent_name="GHL v2 Architect",
            prompt_file="ghl.md",
            task=with_context(
                "Configure/verify the reusable GHL v2 architecture. The old "
                "n8n/formspree-lead guide capture is invalid for this request. Return the "
                "website integration contract in handoff. Never message existing contacts.",
                audit=audit,
                data_model=data_model,
            ),
            model=model,
        )

        # Repository-writing agents run sequentially in one working tree to avoid races.
        website = await run_stage(
            codex,
            master.id,
            report,
            stage="website",
            agent_name="Website v2 Funnel Builder",
            prompt_file="website.md",
            task=with_context(
                "Implement the reusable v2 guide capture using the verified GHL contract. "
                "Preserve useful existing companion assets, migrate their old submission "
                "mechanism, and use guide-email capture where no companion exists. "
                "Do not push, deploy or merge.",
                audit=audit,
                data_model=data_model,
                ghl=ghl,
            ),
            model=model,
        )

        content = await run_stage(
            codex,
            master.id,
            report,
            stage="content",
            agent_name="Content Campaign Builder",
            prompt_file="content.md",
            task=with_context(
                "Prepare repository campaign assets only for explicitly approved campaigns. "
                "Do not publish, push or activate external messaging.",
                data_model=data_model,
                website=website,
            ),
            model=model,
        )

        blotato = await run_stage(
            codex,
            master.id,
            report,
            stage="blotato_draft",
            agent_name="Blotato Draft Builder",
            prompt_file="blotato.md",
            task=with_context(
                "Prepare/reuse keyword automations only where dmAutomationEnabled=true and "
                "campaignStatus=approved. Keep them inactive. If none qualify, return a "
                "successful no-op with active_automation_count=0.",
                data_model=data_model,
                content=content,
                website=website,
            ),
            model=model,
        )

        release = await run_stage(
            codex,
            master.id,
            report,
            stage="release_prepare",
            agent_name="Release Preparation",
            prompt_file="deploy.md",
            task=with_context(
                "Create/update the dedicated branch and draft PR for human review. Never "
                "merge. Obtain/verify the Vercel preview URL when available.",
                website=website,
                content=content,
                blotato_draft=blotato,
            ),
            model=model,
        )

        await run_stage(
            codex,
            master.id,
            report,
            stage="preview_qa",
            agent_name="Preview Funnel QA",
            prompt_file="qa.md",
            task=with_context(
                "Run preview guide -> v2 capture -> GHL -> delivery QA with "
                "FUNNEL_TEST_EMAIL. Confirm no new guide submission calls the retired "
                "formspree-lead endpoint. Do not activate production DMs.",
                ghl=ghl,
                website=website,
                release_prepare=release,
            ),
            model=model,
            sandbox=Sandbox.read_only,
        )

    report["status"] = "ready_for_human_review"
    report["next_action"] = (
        "Review and manually merge the draft PR only after preview QA passes. Then run "
        "`python orchestrator.py launch --pr <number>`."
    )
    return report


async def launch(pr_number: int, model: str | None) -> dict[str, Any]:
    require_test_email()
    report: dict[str, Any] = {
        "mode": "launch",
        "pr": pr_number,
        "status": "running",
        "stages": {},
    }

    async with AsyncCodex() as codex:
        master = await start_master(codex, model)

        production = await run_stage(
            codex,
            master.id,
            report,
            stage="production_verify",
            agent_name="Production Verification",
            prompt_file="deploy.md",
            task=(
                f"Verify PR #{pr_number} was merged by a human into the production branch. "
                "Do not merge it yourself. Verify the matching Vercel production deployment "
                "is READY and record production commit/deployment/URL."
            ),
            model=model,
            sandbox=Sandbox.read_only,
        )

        production_qa = await run_stage(
            codex,
            master.id,
            report,
            stage="production_qa",
            agent_name="Production Funnel QA",
            prompt_file="qa.md",
            task=with_context(
                "Run production guide -> v2 capture -> GHL -> configured delivery URL QA "
                "with the designated test contact. Confirm the legacy guide endpoint is not "
                "used. Do not activate Blotato yet.",
                production_verify=production,
            ),
            model=model,
            sandbox=Sandbox.read_only,
        )

        activation = await run_stage(
            codex,
            master.id,
            report,
            stage="blotato_activation",
            agent_name="Blotato Activation",
            prompt_file="blotato.md",
            task=with_context(
                "Production QA passed. Activate only campaigns still marked "
                "dmAutomationEnabled=true and campaignStatus=approved. Test one authorized "
                "interaction before any additional activation.",
                production_qa=production_qa,
            ),
            model=model,
        )

        active_count = int(
            activation.get("handoff", {}).get("active_automation_count", 0) or 0
        )
        if active_count == 0:
            report["status"] = "capture_live_dm_pending"
            report["next_action"] = (
                "Website -> GHL capture is live and verified. No DM campaign is approved. "
                "Run the campaign command for the first approved Instagram campaign."
            )
            return report

        await run_stage(
            codex,
            master.id,
            report,
            stage="e2e",
            agent_name="Instagram End-to-End QA",
            prompt_file="qa.md",
            task=with_context(
                "Run the final authorized Instagram -> Blotato -> tracked production guide "
                "-> v2 capture -> GHL -> configured delivery -> nurture enrollment test.",
                production_qa=production_qa,
                blotato_activation=activation,
            ),
            model=model,
            sandbox=Sandbox.read_only,
        )

    report["status"] = "done"
    return report


async def run_campaign(brief_path: Path, model: str | None) -> dict[str, Any]:
    require_test_email()
    brief = brief_path.read_text(encoding="utf-8")
    report: dict[str, Any] = {
        "mode": "campaign",
        "brief": str(brief_path),
        "status": "running",
        "stages": {},
    }

    async with AsyncCodex() as codex:
        master = await start_master(codex, model)
        audit = await audit_stage(codex, master.id, report, model)

        campaign = await run_stage(
            codex,
            master.id,
            report,
            stage="campaign",
            agent_name="New Funnel Campaign",
            prompt_file="new-campaign.md",
            task=with_context(
                "Create/update only the approved campaign plan, guide/content assets and "
                "guide-funnel routing record. Do not configure external SaaS, push, deploy, "
                "merge, publish or activate messaging in this stage.\n\nBRIEF:\n" + brief,
                audit=audit,
            ),
            model=model,
        )

        ghl = await run_stage(
            codex,
            master.id,
            report,
            stage="ghl",
            agent_name="GHL Campaign Verification",
            prompt_file="ghl.md",
            task=with_context(
                "Verify the existing GHL v2 master architecture accepts this funnel record. "
                "Create only genuinely missing guide-specific metadata.",
                campaign=campaign,
            ),
            model=model,
        )

        website = await run_stage(
            codex,
            master.id,
            report,
            stage="website",
            agent_name="Website Campaign Verification",
            prompt_file="website.md",
            task=with_context(
                "Verify the reusable v2 capture recognizes this funnel record and make only "
                "required repository changes. Preserve any built companion asset. Do not push.",
                campaign=campaign,
                ghl=ghl,
            ),
            model=model,
        )

        blotato = await run_stage(
            codex,
            master.id,
            report,
            stage="blotato_draft",
            agent_name="Blotato Campaign Draft",
            prompt_file="blotato.md",
            task=with_context(
                "Prepare/reuse this campaign's automation inactive, only if the funnel record "
                "explicitly enables and approves it.",
                campaign=campaign,
                website=website,
            ),
            model=model,
        )

        release = await run_stage(
            codex,
            master.id,
            report,
            stage="release_prepare",
            agent_name="Campaign Release Preparation",
            prompt_file="deploy.md",
            task=with_context(
                "Create/update a dedicated branch and draft PR. Never merge. Obtain the "
                "Vercel preview when available.",
                campaign=campaign,
                website=website,
                blotato_draft=blotato,
            ),
            model=model,
        )

        await run_stage(
            codex,
            master.id,
            report,
            stage="preview_qa",
            agent_name="Campaign Preview QA",
            prompt_file="qa.md",
            task=with_context(
                "Run preview QA for this campaign with the designated test contact. "
                "Do not activate Blotato.",
                campaign=campaign,
                ghl=ghl,
                release_prepare=release,
            ),
            model=model,
            sandbox=Sandbox.read_only,
        )

    report["status"] = "ready_for_human_review"
    report["next_action"] = (
        "Review and manually merge the campaign PR after QA, then run "
        "`python orchestrator.py launch --pr <number>`."
    )
    return report


async def run_repair(incident_path: Path, model: str | None) -> dict[str, Any]:
    require_test_email()
    incident = incident_path.read_text(encoding="utf-8")
    report: dict[str, Any] = {
        "mode": "repair",
        "incident": str(incident_path),
        "status": "running",
        "stages": {},
    }

    async with AsyncCodex() as codex:
        master = await start_master(codex, model)
        repair = await run_stage(
            codex,
            master.id,
            report,
            stage="repair",
            agent_name="Funnel Repair",
            prompt_file="repair.md",
            task=(
                "Diagnose and repair the smallest responsible v2 component. Treat the old "
                "formspree-lead guide capture as legacy.\n\nINCIDENT:\n" + incident
            ),
            model=model,
        )
        await run_stage(
            codex,
            master.id,
            report,
            stage="qa",
            agent_name="Repair Regression QA",
            prompt_file="qa.md",
            task=with_context(
                "Re-run the affected test and the complete v2 funnel smoke test.",
                repair=repair,
            ),
            model=model,
            sandbox=Sandbox.read_only,
        )

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

    if args.command == "audit":
        report: dict[str, Any] = {"mode": "audit", "status": "running", "stages": {}}
        async with AsyncCodex() as codex:
            master = await start_master(codex, model)
            await audit_stage(codex, master.id, report, model)
        report["status"] = "done"
    elif args.command == "bootstrap":
        report = await prepare_funnel(model)
    elif args.command == "launch":
        report = await launch(args.pr, model)
    elif args.command == "campaign":
        report = await run_campaign(args.brief, model)
    else:
        report = await run_repair(args.incident, model)

    path = save_final(report)
    print(json.dumps(report, indent=2))
    print(f"\nSaved run report: {path}")


if __name__ == "__main__":
    asyncio.run(main())
