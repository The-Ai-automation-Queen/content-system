import Link from "next/link";

const links = [
  ["Guides", "/guides/"],
  ["Workbooks", "https://www.shiftandlead.com/workbooks.html"],
  ["Where AI Fits", "https://www.shiftandlead.com/ai-opportunity-map.html"],
  ["About", "https://www.shiftandlead.com/about.html"],
] as const;

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="wordmark" href="/" aria-label="Shift and Lead home">Shift &amp; Lead</Link>
        <nav aria-label="Main navigation">
          {links.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}
        </nav>
        <details className="site-header__mobile">
          <summary>Menu</summary>
          <div>{links.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}</div>
        </details>
      </div>
    </header>
  );
}
