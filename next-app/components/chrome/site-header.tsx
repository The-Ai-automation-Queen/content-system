import Link from "next/link";

const links = [
  ["Home", "/"],
  ["Work with me", "/work-with-fatiha/"],
  ["Guides", "/guides/"],
  ["Workbooks", "/workbooks.html"],
  ["About", "/about.html"],
] as const;

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="wordmark" href="/" aria-label="Shift and Lead home">Shift <span>&amp;</span> <em>Lead</em></Link>
        <nav aria-label="Main navigation">
          {links.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}
        </nav>
        <details className="site-header__mobile">
          <summary>MENU <span aria-hidden="true">☰</span></summary>
          <div>{links.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}</div>
        </details>
      </div>
    </header>
  );
}
