#!/usr/bin/env bash
# One-off branch clean-up approved by Fatiha on 28/09/2026.
# Run from a clone of content-system on your own computer: bash scripts/branch-cleanup-2026-09-28.sh
# Each branch tip is first saved as an archive/<branch> tag, so nothing is lost.
# Kept: main, claude/elegant-thompson-9h1hlf and the branches of PRs still open
# (#188, #150, #149, #48, #47, #18, #1).
set -euo pipefail
git fetch origin --prune
BRANCHES=(
  agent/add-lead-funnel-orchestrator
  agent/ai-twin-studio-site
  agent/direct-ghl-guide-capture
  agent/guide-article-template
  agent/open-briefing-no-email
  agent/optimize-guide-images
  agent/research-digest-2026-08-21
  agent/research-digest-2026-09-18
  agent/research-digest-2026-09-25
  agent/restore-guide-cover-fidelity
  agent/restore-homepage-with-guides
  audit/vault-2026-09-13
  automation-bootstrap
  chore/archive-outdated-ai-jargon-copy
  claude/add-claude-documentation-9z79n
  claude/add-research-bot
  claude/ai-expert-brand-strategy-42b4n9
  claude/ai-marketing-bootcamp-analysis-t97ey7
  claude/ai-tools-prioritization-ghv1rm
  claude/awesome-ux-skills-review-xwpc1z
  claude/blotato-media-upload-guide-uk7cjb
  claude/blotato-skills-marketplace-77vgj4
  claude/blotato-skills-marketplace-uxppmj
  claude/brief-cache-and-voice-fix
  claude/client-onboarding-playbook
  claude/confident-maxwell-dvgrbz
  claude/consultant-services-email-56j5og
  claude/content-ops-brief
  claude/copy-craft-and-lessons
  claude/course-strategy-content-audit-x4sogf
  claude/fervent-ramanujan-kl95cz
  claude/gifted-keller-h5pf2m
  claude/hermes-agent-setup-1q90jt
  claude/html-plugin-system-9uohC
  claude/install-cofounder-skills-djiim0
  claude/pensive-wright-14kzz6
  claude/pensive-wright-1y7ov0
  claude/pensive-wright-3gzd4v
  claude/pensive-wright-64vjic
  claude/pensive-wright-acaz3w
  claude/pensive-wright-dz15yt
  claude/pensive-wright-el1q6i
  claude/pensive-wright-j0q2nf
  claude/pensive-wright-m74enz
  claude/pensive-wright-umy5mk
  claude/pensive-wright-worf1o
  claude/pensive-wright-xvq6wg
  claude/podcast-transcription-media-kit-pqcts0
  claude/positioning-v3-evolution
  claude/presentation-slide-design-tgpgl2
  claude/research-inbox-triage-workflow-laf7f9
  claude/scroll-reveal-counter-fixes-u1c28k
  claude/session-u2v36j
  claude/session-u2v36j-day1-setup
  claude/shift-lead-consolidation-wdp5bm
  claude/shiftandlead-website-audit-hksko5
  claude/site-section-review-x4ghtr
  claude/video-implementation-xtjvu3
  claude/video-transcription-concepts-jaxopk
  claude/video-transcription-highlights-L2i4U
  claude/video-transcription-stack-0jpubh
  claude/video-transcription-tllflm
  claude/voice-file-skill
  codex/about-authority-2026-09-27
  codex/about-logo-padding-0928
  codex/about-logo-spacing-0928
  codex/about-logos-as-headline-0928
  codex/about-nike-proof-0928
  codex/about-small-logos-0928
  codex/about-speaking-proof-0928
  codex/add-guide-home-link
  codex/approved-guide-update-2026-09-25
  codex/approved-guides-inline-2026-09-27
  codex/approved-guides-release-2026-09-25
  codex/clean-vercel-source
  codex/complete-shift-lead-journey
  codex/finish-homepage
  codex/fix-lelabplus-inauguration-0928
  codex/full-page-styling-2026-09-27
  codex/gitignore-hardening
  codex/grok-bot-boundaries-2026-09-25
  codex/grok-bot-guide-publish
  codex/guide-email-copy-2026-09-25
  codex/guide-library-rebuild-2026-09-23
  codex/guide-review-integration-2026-09-27
  codex/hide-where-ai-fits-0928
  codex/homepage-clarity
  codex/publish-validated-pages-0928
  codex/publish-workbook-titles-2026-09-27
  codex/reconcile-official-source-20260824
  codex/remove-early-access-lumail-note
  codex/remove-editorial-library-copy-2026-09-27
  codex/research-context-repair
  codex/research-digest-2026-08-28
  codex/review-ai-browser-2026-09-27
  codex/review-ai-skills-2026-09-27
  codex/review-chatgpt-projects-2026-09-27
  codex/review-claude-2026-09-27
  codex/review-claude-workflow-2026-09-27
  codex/review-copilot-inbox-2026-09-27
  codex/review-customer-research-2026-09-27
  codex/review-deepseek-documents-2026-09-27
  codex/review-deepseek-recovery-2026-09-27
  codex/review-deepseek-writing-2026-09-27
  codex/review-gemini-2026-09-27
  codex/review-meta-muse-2026-09-27
  codex/review-mistral-research-2026-09-27
  codex/review-screen-skills-2026-09-27
  codex/review-tool-chooser-2026-09-27
  codex/rework-chatgpt-project-guide-2026-09-25
  codex/site-style-alignment-2026-09-27
  codex/work-with-me-accent-size-0928
  codex/work-with-me-contrast-0928
  codex/work-with-me-hero-cleanup-0928
  codex/work-with-me-rebuild-0928
  codex/work-with-me-visual-reset-0928
  feat/find-your-zone-of-genius-beta
  fix/live-sitemap-alignment-20260902
  html-freeze-final
  local-drafts-2026-06-30
  nextjs-rebuild
  ops/vault-audit-2026-09-20
  research-digest-2026-07-27
  research/digest-2026-08-14
  research/research-to-content-workflow
  site-repair-and-architecture-2026-08-10
  vault-audit-2026-07-26
)
for b in "${BRANCHES[@]}"; do
  if git rev-parse --verify --quiet "origin/$b" >/dev/null; then
    git tag -f "archive/$b" "origin/$b" >/dev/null
  fi
done
git push origin "refs/tags/archive/*:refs/tags/archive/*"
for b in "${BRANCHES[@]}"; do
  git push origin --delete "$b" || echo "skipped $b"
done
echo "Done. Restore any branch with: git push origin archive/<branch>:refs/heads/<branch>"
