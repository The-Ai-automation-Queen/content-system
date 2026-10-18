import Link from "next/link";

const links = [
  ["Free guides", "/guides/"],
  ["Workbooks", "/workbooks.html"],
  ["Community", "/#community"],
  ["About", "/about.html"],
] as const;

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="wordmark" href="/" aria-label="Shift and Lead home">Shift <span>&amp;</span> Lead</Link>
        <nav aria-label="Main navigation">
          {links.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}
        </nav>
        <Link className="site-header__cta" href="/work-with-fatiha/">Work with me</Link>
        <details className="site-header__mobile">
          <summary>MENU <span aria-hidden="true">☰</span></summary>
          <div>{[...links.slice(0, 3), ["Work with me", "/work-with-fatiha/"] as const, links[3]].map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}</div>
        </details>
      </div>
    </header>
  );
}
