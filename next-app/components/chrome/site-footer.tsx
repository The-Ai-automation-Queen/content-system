const links = [
  ["Instagram", "https://www.instagram.com/thefatihachikh"],
  ["LinkedIn", "https://www.linkedin.com/in/fatihachikh"],
  ["Privacy", "/privacy.html"],
  ["Terms", "/terms.html"],
  ["Refunds", "/refund-policy.html"],
] as const;

export function SiteFooter() {
  return <footer className="site-footer"><div className="site-footer__inner"><a className="site-footer__wordmark" href="/">Shift <span>&amp;</span> Lead</a><nav aria-label="Footer">{links.map(([label, href]) => <a key={label} href={href}>{label}</a>)}</nav><p>© 2026 Shift &amp; Lead</p></div></footer>;
}
