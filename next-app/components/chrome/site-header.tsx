import Link from "next/link";

const links = [
  ["Guides", "/guides/"],
  ["Kits", "/#kits"],
  ["Workbooks", "/workbooks.html"],
  ["Work with me", "/work-with-fatiha/"],
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
        <a className="site-header__cta" href="/#signup">Get the free guides</a>
        <details className="site-header__mobile">
          <summary>Menu</summary>
          <div>{links.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}</div>
        </details>
      </div>
    </header>
  );
}
