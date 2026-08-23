import Link from "next/link";

const links = [
  ["Guides", "/guides/"],
  ["Workbooks", "/workbooks.html"],
  ["How I can help", "/how-i-can-help.html"],
  ["About", "/about.html"],
] as const;

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="wordmark" href="/" aria-label="Shift and Lead home">Shift &amp; Lead</Link>
        <nav aria-label="Main navigation">
          {links.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}
          <Link className="nav-action" href="/build-sprint.html">Build with me</Link>
        </nav>
        <details className="site-header__mobile">
          <summary>Menu</summary>
          <div>{links.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}<Link className="nav-action" href="/build-sprint.html">Build with me</Link></div>
        </details>
      </div>
    </header>
  );
}
