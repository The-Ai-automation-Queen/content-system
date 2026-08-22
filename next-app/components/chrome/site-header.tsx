const links = [
  ["Guides", "/guides"],
  ["About", "/about.html"],
] as const;

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="wordmark" href="/" aria-label="Shift and Lead home">Shift &amp; Lead</a>
        <nav aria-label="Main navigation">
          {links.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
          <a className="nav-action" href="/build-sprint.html">Work with me</a>
        </nav>
      </div>
    </header>
  );
}
