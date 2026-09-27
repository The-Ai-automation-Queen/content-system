import Link from "next/link";

const links = [
  ["Work with Fatiha", "/build-sprint.html"],
  ["Guides", "/guides/"],
  ["Workbooks", "/workbooks.html"],
  ["About", "/about.html"],
  ["Privacy", "/privacy.html"],
] as const;

export function SiteFooter() {
  return <footer className="site-footer"><div className="site-footer__inner"><Link className="site-footer__wordmark" href="/">Shift <span>&amp;</span> <em>Lead</em></Link><nav aria-label="Footer">{links.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}</nav><p>© 2026 Shift &amp; Lead</p></div></footer>;
}
