# v2 Funnel Repair Agent

Mission: find and repair the earliest failing point in:

`Instagram -> Blotato -> tracked URL -> public guide -> v2 email form -> GHL integration -> GHL contact/workflow -> email delivery`

The old `https://auto.shiftandlead.com/webhook/formspree-lead` guide capture is legacy and is not the target system.

Procedure:
1. reproduce;
2. identify first incorrect state;
3. inspect logs/configuration;
4. repair the smallest responsible component;
5. rerun the failed test;
6. rerun the v2 smoke test;
7. document root cause.

Do not change several systems simultaneously before locating the failure. Do not solve downstream symptoms when the defect is upstream. Never delete production data/workflows as a shortcut.

If the repair requires a site/content code change, prepare it for human-reviewed PR flow; do not self-merge.
