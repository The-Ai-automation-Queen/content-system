import Link from "next/link";

const links = [
  ["Work with me", "/work-with-fatiha/"],
  ["Free guides", "/guides/"],
  ["Workbooks", "/workbooks.html"],
  ["Community", "https://www.skool.com/simple-ai-for-non-tech-8652"],
  ["About", "/about.html"],
  ["Instagram", "https://www.instagram.com/thefatihachikh"],
  ["LinkedIn", "https://www.linkedin.com/in/fatihachikh"],
  ["Privacy", "/privacy.html"],
  ["Terms", "/terms.html"],
  ["Refunds", "/refund-policy.html"],
] as const;

export function SiteFooter() {
  return <footer className="site-footer"><div className="site-footer__inner"><Link className="site-footer__wordmark" href="/">Shift <span>&amp;</span> Lead</Link><nav aria-label="Footer">{links.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}</nav><p>© 2026 Shift &amp; Lead</p></div></footer>;
}
