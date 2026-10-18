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
        <a className="wordmark" href="/" aria-label="Shift and Lead home">Shift <span>&amp;</span> Lead</a>
        <nav aria-label="Main navigation">
          {links.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
        </nav>
        <a className="site-header__cta" href="/work-with-fatiha/">Work with me</a>
        <details className="site-header__mobile">
          <summary>MENU <span aria-hidden="true">☰</span></summary>
          <div>{[...links.slice(0, 3), ["Work with me", "/work-with-fatiha/"] as const, links[3]].map(([label, href]) => <a key={label} href={href}>{label}</a>)}</div>
        </details>
      </div>
    </header>
  );
}
