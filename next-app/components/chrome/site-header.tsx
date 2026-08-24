import Link from "next/link";

const links = [
  ["Guides", "/guides/"],
  ["Workbooks", "/workbooks.html"],
  ["About", "/about.html"],
  ["Contact", "/contact.html"],
] as const;

const action = ["How I can help", "/how-i-can-help.html"] as const;

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="wordmark" href="/" aria-label="Shift and Lead home">Shift &amp; Lead</Link>
        <nav aria-label="Main navigation">
          {links.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}
          <Link className="nav-action" href={action[1]}>{action[0]}</Link>
        </nav>
        <details className="site-header__mobile">
          <summary>Menu</summary>
          <div>{links.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}<Link className="nav-action" href={action[1]}>{action[0]}</Link></div>
        </details>
      </div>
    </header>
  );
}
