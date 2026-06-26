# Machine Operational Docs

Per-machine documentation so an AI agent (or a human operator) can understand
exactly how each machine works, what it needs, and how to validate its output.
Modeled on Romain Brunel's approach: document every machine well enough that an
AI can eventually take over the human validation step.

Each doc covers: purpose, inputs, outputs, validation criteria, common failures,
and the decision framework for approving output.

| Machine | Doc | Skill | Status |
|---|---|---|---|
| M00 Brain | [m00-brain-manager.md](m00-brain-manager.md) | `brain-manager` | Live |
| M01 Data | [m01-signal-scripts.md](m01-signal-scripts.md) | `signal-harvester` + `content-engine` | Live |
| M02 Visuals | [m02-visuals.md](m02-visuals.md) | `visual-engine` + `heygen` | Live |
| M03 Reels | [m03-reels.md](m03-reels.md) | `reels-factory` | Live |
| M04 Distribution | [m04-distribution.md](m04-distribution.md) | `distribution` | Live |
| M05 DM/Leads | [m05-dm-leads.md](m05-dm-leads.md) | `dm-responder` | Live |
| M06 Performance | [m06-performance.md](m06-performance.md) | `performance-tracker` | Live |
