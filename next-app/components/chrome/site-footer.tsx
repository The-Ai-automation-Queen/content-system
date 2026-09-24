import Link from "next/link";

const columns = [
  { title: "Explore", links: [["Guides", "/guides/"], ["Workbooks", "https://www.shiftandlead.com/workbooks.html"], ["Where AI Fits", "https://www.shiftandlead.com/ai-opportunity-map.html"]] },
  { title: "About", links: [["About Fatiha", "https://www.shiftandlead.com/about.html"]] },
  { title: "Legal", links: [["Privacy", "https://www.shiftandlead.com/privacy.html"], ["Terms", "https://www.shiftandlead.com/terms.html"], ["Refunds", "https://www.shiftandlead.com/refund-policy.html"], ["Licensing", "https://www.shiftandlead.com/licensing.html"]] },
] as const;

export function SiteFooter() {
  return <footer className="site-footer"><div className="site-footer__grid">{columns.map((column) => <section key={column.title}><h2>{column.title}</h2><ul>{column.links.map(([label, href]) => <li key={label}><Link href={href}>{label}</Link></li>)}</ul></section>)}</div><p>© 2026 Shift &amp; Lead. All rights reserved.</p></footer>;
}
