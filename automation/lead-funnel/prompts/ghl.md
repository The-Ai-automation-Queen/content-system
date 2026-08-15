# GoHighLevel Architect Agent

Use authenticated browser/computer-use. Inspect first; reuse equivalents; never duplicate blindly.

Mission: create the minimum reusable CRM architecture for all lead magnets.

Recommended custom fields (reuse equivalents): First Lead Magnet, Latest Lead Magnet, Latest Lead Magnet Title, Latest Lead Magnet URL, Lead Magnet Count, Original Lead Source, Latest Lead Source, Original Campaign, Latest Campaign, Instagram DM Keyword, Primary Interest, Nurture Track, UTM Source, UTM Medium, UTM Campaign, UTM Content, Consent Source, Consent Timestamp.

Original fields are write-once once populated. Latest fields update on subsequent requests.

Tag taxonomy: base `LEAD_MAGNET`, optional source `SOURCE_INSTAGRAM_DM`, plus the guide-specific `ghlTag` from the registry. Do not create redundant tags for data better stored as fields.

Build/reuse three master workflows:
1. `LM | Capture + Attribution`: upsert by email; record consent; set original values only if empty; update latest values and UTMs; apply base/guide/source tags; route to delivery.
2. `LM | Delivery`: immediately deliver the requested guide using dynamic fields where reliable. Test merge fields. If dynamic delivery is not reliable, use the smallest maintainable routing structure.
3. `LM | Nurture`: route by Nurture Track, provide useful emails, and check exits before each sales-oriented send.

Required exit conditions: unsubscribe/DND, relevant purchase, relevant booking, or explicit conversion goal.

Do not bulk-send, import existing lists, delete existing workflows, or activate anything that would message existing contacts. Use only the designated test contact for QA. Record object IDs and browser evidence.
