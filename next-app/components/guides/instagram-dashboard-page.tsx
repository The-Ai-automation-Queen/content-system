import Image from "next/image";
import Link from "next/link";
import type { GuidePage, GuideSection } from "@/content/guide-page";
import { GuideAccessBoundary } from "./guide-access-boundary";
import { GuideIcon, cleanLabel } from "./guide-icon";
import { InteractiveWalkthrough } from "./interactive-walkthrough";
import styles from "./instagram-dashboard-page.module.css";

const featureIcons = ["settings", "image", "route", "check", "search", "book"] as const;

export function InstagramDashboardPage({ guide }: { guide: GuidePage }) {
  const features = guide.sections.find((section) => section.kind === "cards");
  const needs = guide.sections.find((section) => section.kind === "prose");
  const steps = guide.tutorial?.filter((section): section is Extract<GuideSection, { kind: "walkthrough" }> => section.kind === "walkthrough") ?? [];
  const conclusion = <section key="instagram-conclusion" className={styles.conclusion}>
    <h2>{cleanLabel(guide.conclusion.heading)}</h2>
    {guide.conclusion.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
    {guide.conclusion.extensions && <div className={styles.extensions}><h3>Want to take it further?</h3><ul>{guide.conclusion.extensions.map((item) => <li key={item}>{item}</li>)}</ul></div>}
  </section>;

  return <main className={styles.page}>
    <div className={styles.shell}>
      <Link className={styles.back} href="/guides/">← All guides</Link>
      <header className={styles.hero}>
        <div className={styles.heroCopy}>
          <h1>Build Your Own <span>Instagram Dashboard</span></h1>
          <p>{guide.promise}</p>
        </div>
        <figure className={styles.heroImage}><Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 720px) 100vw, 380px" /></figure>
      </header>

      {features?.kind === "cards" && <div className={styles.features} aria-label="What you will build">
        {features.items.map((item, index) => <article key={item.title}>
          <GuideIcon name={featureIcons[index] ?? "book"} />
          <div><h2>{cleanLabel(item.title)}</h2><p>{item.body}</p></div>
        </article>)}
      </div>}
      <aside className={styles.prerequisite}><GuideIcon name="alert" /><p>{guide.answer.paragraphs[0]}</p></aside>
      {needs?.kind === "prose" && <p className={styles.needs}>{needs.paragraphs[0]}</p>}

      <InteractiveWalkthrough sections={steps} slug={guide.slug} conclusion={conclusion} variant="instagram"
        afterSteps={<div key="instagram-save-form"><GuideAccessBoundary guideSlug={guide.slug} guideTitle={guide.title} variant="save">{null}</GuideAccessBoundary></div>} />
    </div>
    <section className={styles.related} aria-labelledby="instagram-next-title">
      <div className={styles.relatedInner}>
        <h2 id="instagram-next-title">What do you want to do next?</h2>
        <div>{guide.related.map((item) => item.status === "coming-next"
          ? <article key={item.slug}><div className={styles.relatedArt}><Image src={item.cover} alt="" fill sizes="(max-width: 720px) 100vw, 250px" /></div><div className={styles.relatedCopy}><strong>{cleanLabel(item.title)}</strong><p>{item.reason}</p><span>Coming next</span></div></article>
          : <Link key={item.slug} href={`/guides/${item.slug}.html`}><div className={styles.relatedArt}><Image src={item.cover} alt="" fill sizes="(max-width: 720px) 100vw, 250px" /></div><div className={styles.relatedCopy}><strong>{cleanLabel(item.title)}</strong><p>{item.reason}</p><span>Start the guide →</span></div></Link>)}</div>
      </div>
    </section>
  </main>;
}
