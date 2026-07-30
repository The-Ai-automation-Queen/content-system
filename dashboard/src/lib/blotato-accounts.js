// Blotato connected accounts and API contract.
//
// ⚠️ THESE IDS ARE UNVERIFIED SINCE THE 22/06/2026 REBRAND.
//
// They come from the publish skill's reference, marked "verified 26/04/2026" —
// two months before the rebrand — and the handles recorded there do not match
// the ones content-system tracks in inventory.md:
//
//     reference (Apr)        inventory.md (now)
//     @fati_chic_            thefatihachikh      (instagram, threads)
//     @AIAutomati82400       aiautomatik         (twitter)
//
// So at least three of these ids may point at pre-rebrand accounts. Publishing
// against a stale id posts to the wrong audience, silently and irreversibly.
// Re-confirm each one in the Blotato dashboard, set `verified` to the date you
// checked, and only then let it go live. `verified: null` is treated as unsafe
// and blocks live sends in api/publish.js.

export const ACCOUNTS = {
  linkedin: {
    accountId: '16438',
    platform: 'linkedin',
    handle: 'Fatiha Chikh (personal profile)',
    verified: null,
    // LeLabPlus company page instead: content.pageId = '73909738'
  },
  instagram: {
    accountId: '38092',
    platform: 'instagram',
    handle: '@fati_chic_  (inventory.md says thefatihachikh)',
    verified: null,
    requiresMedia: true,
  },
  threads: {
    accountId: '5509',
    platform: 'threads',
    handle: '@fati_chic_  (inventory.md says thefatihachikh)',
    verified: null,
  },
  twitter: {
    accountId: '15654',
    platform: 'twitter',
    handle: '@AIAutomati82400  (inventory.md says aiautomatik)',
    verified: null,
    maxChars: 280,
  },
  facebook: {
    accountId: '24785',
    platform: 'facebook',
    handle: 'Page: AI Automation Queen',
    pageId: '482165944989431',
    verified: null,
  },
};

// Vault platform strings → account keys above.
export function resolvePlatform(vaultPlatform = '') {
  const p = vaultPlatform.toLowerCase();
  if (p.includes('linkedin')) return 'linkedin';
  if (p.includes('instagram')) return 'instagram';
  if (p.includes('threads')) return 'threads';
  if (p.includes('x/twitter') || p.includes('twitter') || p === 'x') return 'twitter';
  if (p.includes('facebook')) return 'facebook';
  // Short-form video and carousels need media handling this route does not do yet.
  return null;
}

export const BLOTATO_BASE = 'https://backend.blotato.com/v2';
