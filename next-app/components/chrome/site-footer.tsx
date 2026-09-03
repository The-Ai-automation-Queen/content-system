import Link from "next/link";

const columns = [
  { title: "Explore", links: [["Guides", "/guides/"], ["Workbooks", "/workbooks.html"]] },
  { title: "About", links: [["About Fatiha", "/about.html"]] },
  { title: "Legal", links: [["Privacy", "/privacy.html"], ["Terms", "/terms.html"], ["Refunds", "/refund-policy.html"], ["Licensing", "/licensing.html"]] },
] as const;

export function SiteFooter() {
  return <footer className="site-footer"><div className="site-footer__grid">{columns.map((column) => <section key={column.title}><h2>{column.title}</h2><ul>{column.links.map(([label, href]) => <li key={label}><Link href={href}>{label}</Link></li>)}</ul></section>)}</div><p>© 2026 Shift &amp; Lead. All rights reserved.</p></footer>;
}
