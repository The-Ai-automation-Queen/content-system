import Link from "next/link";

export default function GuidesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="aq-guides">
    <div className="aq-guides__imprint" aria-label="AI Automation Queen guide collection">
      <Link href="/guides/" className="aq-guides__brand">AI <span>Automation</span> Queen<span className="aq-guides__dot">.</span></Link>
      <span>Practical AI guides for work</span>
    </div>
    {children}
  </div>;
}
