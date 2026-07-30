// Blotato connected accounts and API contract.
//
// Account ids come from the publish skill's reference and content-factory's
// config.py, which agree exactly. Both predate the 22/06/2026 rebrand, and the
// handles they recorded (@fati_chic_, @AIAutomati82400) did not match the ones
// inventory.md tracks — so the ids were treated as suspect until checked.
//
// Resolved 30/07/2026: the operator confirmed in the Blotato dashboard that
// LinkedIn, Instagram and X show the current post-rebrand handles. The accounts
// were renamed during the rebrand rather than replaced, so the ids never
// changed and only the handle labels here were stale.
//
// Threads and Facebook were NOT part of that check and stay unverified.
//
// `verified: null` blocks live sends in api/publish.js. Only set a date after
// seeing the handle in the Blotato dashboard yourself — publishing against a
// wrong id posts to the wrong audience, silently, with no undo.

export const ACCOUNTS = {
  linkedin: {
    accountId: '16438',
    platform: 'linkedin',
    handle: 'Fatiha Chikh (personal profile)',
    verified: '2026-07-30',
    // LeLabPlus company page instead: content.pageId = '73909738'
  },
  instagram: {
    accountId: '38092',
    platform: 'instagram',
    handle: 'thefatihachikh',
    verified: '2026-07-30',
    requiresMedia: true,   // text-only IG posts are not supported by this route
  },
  threads: {
    accountId: '5509',
    platform: 'threads',
    handle: 'unconfirmed — not checked 30/07',
    verified: null,
  },
  twitter: {
    accountId: '15654',
    platform: 'twitter',
    handle: 'aiautomatik',
    verified: '2026-07-30',
    maxChars: 280,
  },
  facebook: {
    accountId: '24785',
    platform: 'facebook',
    handle: 'Page: AI Automation Queen — not checked 30/07',
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
