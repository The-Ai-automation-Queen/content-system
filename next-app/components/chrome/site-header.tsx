import Link from "next/link";

const links = [
  ["Guides", "/guides"],
  ["The Brief", "https://brief.shiftandlead.com"],
  ["The 99", "/the-99.html"],
  ["About", "/about.html"],
] as const;

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="wordmark" href="/" aria-label="Shift and Lead home">Shift &amp; Lead</Link>
        <nav aria-label="Main navigation">
          {links.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}
          <Link className="nav-action" href="/build-sprint.html">Work with me</Link>
        </nav>
      </div>
    </header>
  );
}
