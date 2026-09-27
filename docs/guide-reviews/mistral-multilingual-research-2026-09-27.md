# Mistral bilingual research — editorial review

Status: held for review. The publication registry remains unchanged.

- Intended reader: a professional comparing public information in two languages. Level: Intermediate. Result: a source-linked table that keeps original wording, translation and uncertainty together.
- Replaced the duplicate English/French European Commission pages in the worked example with two independent official publishers: the Commission's European Digital Innovation Hubs and France Num's Bpifrance self-assessment. The example now shows two different kinds of help, while explaining why a translation of the Commission page is still one source.
- Updated the Mistral opening step for the September 2026 phased Vibe interface migration. A separate Work mode is mentioned only for accounts that still show it. The Web search control follows Mistral's current instructions.
- The date fields now start with the previous year through today, rather than a fixed date that would become stale. The prompt prefers recently published or updated sources but labels an older or undated official overview when it is still current. A missing date is shown as “Not shown”; English extracts are not needlessly translated back into English.
- The inline Lumail form follows a worked example and the reader's question, before the complete copyable request. The prompt is hidden before access and visible without collapsing in local review mode. No production notes appear in the rendered copy or prompt. Existing cover reused; related cards link only to approved guides.

Sources checked: [Mistral Web search](https://docs.mistral.ai/vibe/work/web-search-open-url), [Mistral September 2026 release notes](https://docs.mistral.ai/resources/release-notes), [European Commission hubs](https://digital-strategy.ec.europa.eu/en/policies/edihs), [France Num Autodiag IA](https://www.francenum.gouv.fr/guides-et-conseils/strategie-numerique/diagnostic-numerique/autodiag-ia-evaluez-la-capacite-de).

Verification: Next.js static build passed. Desktop, 768px tablet, 390px and 320px phone views had no horizontal overflow. The question field updates the full prompt; Reset restores the worked example; Copy returned the current request. Selecting a research step at 320px now scrolls and focuses its explanation so the changed text is visible. Live Lumail delivery and the production return link remain untested for this held guide.
