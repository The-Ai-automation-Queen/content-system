import Image from "next/image";
import Link from "next/link";
import { GuideAccessBoundary } from "./guide-access-boundary";
import { CopyPrompt } from "./copy-prompt";
import type { GuidePage, GuideSection } from "@/content/guide-page";
import styles from "./guide-reading-page.module.css";

function RichText({ children }: { children: string }) {
  return children.split("**").map((part, index) => (
    index % 2 === 1 ? <strong key={`${index}-${part}`}>{part}</strong> : part
  ));
}

function Section({ section }: { section: GuideSection }) {
  if (section.kind === "accordion") {
    return (
      <section className={styles.section}>
        <h2>{section.heading}</h2>
        <p className={styles.sectionIntro}><RichText>{section.introduction}</RichText></p>
        <div className={styles.accordion}>
          {section.items.map((item) => (
            <details key={item.title}>
              <summary>
                <span>{item.title}</span>
                <span aria-hidden="true">+</span>
              </summary>
              <div className={styles.accordionBody}>
                <p><RichText>{item.body}</RichText></p>
                {item.links && (
                  <div className={styles.stepLinks}>
                    {item.links.map((link) => (
                      <a href={link.href} key={link.href} rel="noreferrer" target="_blank">{link.label} ↗</a>
                    ))}
                  </div>
                )}
              </div>
            </details>
          ))}
        </div>
      </section>
    );
  }

  if (section.kind === "cards") {
    return (
      <section className={styles.section}>
        <h2>{section.heading}</h2>
        {section.introduction && <p className={styles.sectionIntro}>{section.introduction}</p>}
        <div className={styles.cards}>
          {section.items.map((item, index) => (
            <article key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p><RichText>{item.body}</RichText></p>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (section.kind === "comparison") {
    return (
      <section className={styles.section}>
        <h2>{section.heading}</h2>
        {section.introduction && <p className={styles.sectionIntro}><RichText>{section.introduction}</RichText></p>}
        <div className={styles.comparison} role="table" aria-label={section.heading}>
          <div className={styles.comparisonHead} role="row">
            {section.columns.map((column) => <strong role="columnheader" key={column}>{column}</strong>)}
          </div>
          {section.rows.map((row, index) => (
            <div className={styles.comparisonRow} role="row" key={index}>
              <p role="cell"><RichText>{row[0]}</RichText></p>
              <p role="cell"><RichText>{row[1]}</RichText></p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (section.kind === "steps") {
    return (
      <section className={styles.section}>
        <h2>{section.heading}</h2>
        <p className={styles.sectionIntro}><RichText>{section.introduction}</RichText></p>
        <ol className={styles.steps}>
          {section.steps.map((step) => (
            <li key={step.title}>
              <h3>{step.title}</h3>
              <p><RichText>{step.body}</RichText></p>
              {step.links && (
                <div className={styles.stepLinks}>
                  {step.links.map((link) => (
                    <a href={link.href} key={link.href} rel="noreferrer" target="_blank">{link.label} ↗</a>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ol>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <h2>{section.heading}</h2>
      {section.paragraphs.map((paragraph) => <p key={paragraph}><RichText>{paragraph}</RichText></p>)}
      {section.keyLine && <blockquote><RichText>{section.keyLine}</RichText></blockquote>}
    </section>
  );
}

export function GuideReadingPage({ guide }: { guide: GuidePage }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.seoDescription,
    image: guide.cover,
    isAccessibleForFree: false,
    hasPart: {
      "@type": "WebPageElement",
      isAccessibleForFree: false,
      cssSelector: ".guide-gated-content",
    },
  };

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <article>
        <div className={styles.shell}>
          <Link className={styles.back} href="/guides/">← All guides</Link>
          <figure className={styles.cover}>
            <Image src={guide.cover} alt={guide.coverAlt} fill priority sizes="(max-width: 820px) 100vw, 1160px" />
          </figure>
        </div>

        <header className={styles.intro}>
          <h1>{guide.title}</h1>
          <p>{guide.promise}</p>
        </header>

        <div className={styles.readingColumn}>
          <div className={styles.previewContent} data-guide-preview>
            <section className={styles.answer}>
              {guide.answer.heading && <h2>{guide.answer.heading}</h2>}
              {guide.answer.paragraphs.map((paragraph) => <p key={paragraph}><RichText>{paragraph}</RichText></p>)}
            </section>
            {guide.sections.map((section) => <Section section={section} key={section.heading} />)}
          </div>

          <GuideAccessBoundary
            guideSlug={guide.slug}
            guideTitle={guide.title}
            teaser={(
              <>
                <h2>{guide.tryNow.heading}</h2>
                <p><RichText>{guide.tryNow.introduction}</RichText></p>
                <p>{guide.tryNow.prompt}</p>
              </>
            )}
          >
            <section className={styles.tryNow}>
              <h2>{guide.tryNow.heading}</h2>
              <p><RichText>{guide.tryNow.introduction}</RichText></p>
              <CopyPrompt prompt={guide.tryNow.prompt} />
              {guide.tryNow.instructions && (
                <ol className={`${styles.steps} ${styles.promptInstructions}`}>
                  {guide.tryNow.instructions.map((step) => (
                    <li key={step.title}>
                      <h3>{step.title}</h3>
                      <p><RichText>{step.body}</RichText></p>
                      {step.links && (
                        <div className={styles.stepLinks}>
                          {step.links.map((link) => (
                            <a href={link.href} key={link.href} rel="noreferrer" target="_blank">{link.label} ↗</a>
                          ))}
                        </div>
                      )}
                    </li>
                  ))}
                </ol>
              )}
              <p className={styles.promptCheck}><RichText>{guide.tryNow.check}</RichText></p>
            </section>
            <section className={styles.conclusion}>
              <h2>{guide.conclusion.heading}</h2>
              {guide.conclusion.paragraphs.map((paragraph) => (
                <p key={paragraph}><RichText>{paragraph}</RichText></p>
              ))}
              {guide.conclusion.questions && (
                <div className={styles.conclusionQuestions}>
                  <p>{guide.conclusion.questions.introduction}</p>
                  <ul>
                    {guide.conclusion.questions.items.map((question) => <li key={question}>{question}</li>)}
                  </ul>
                </div>
              )}
              <p className={styles.conclusionLine}><RichText>{guide.conclusion.finishLine}</RichText></p>
            </section>
            {guide.paidNextStep && (
              <aside className={styles.paidNextStep} aria-labelledby="paid-next-step-title">
                <span>{guide.paidNextStep.label}</span>
                <h2 id="paid-next-step-title">{guide.paidNextStep.title}</h2>
                <p>{guide.paidNextStep.body}</p>
                <strong>Coming soon</strong>
              </aside>
            )}
          </GuideAccessBoundary>
        </div>
      </article>

      <section className={styles.related} aria-labelledby="guide-next-title">
          <div className={styles.relatedInner}>
            <h2 id="guide-next-title">What do you want to do next?</h2>
            <div className={styles.relatedGrid}>
              {guide.related.map((item) => item.status === "coming-next" ? (
                <article className={`${styles.relatedCard} ${styles.relatedCardPending}`} key={item.slug}>
                  <figure><Image src={item.cover} alt="" aria-hidden="true" fill sizes="(max-width: 760px) 100vw, 33vw" /></figure>
                  <div><h3>{item.title}</h3><p>{item.reason}</p><span>Coming next</span></div>
                </article>
              ) : (
                <Link href={`/guides/${item.slug}.html`} className={styles.relatedCard} key={item.slug}>
                  <figure><Image src={item.cover} alt="" aria-hidden="true" fill sizes="(max-width: 760px) 100vw, 33vw" /></figure>
                  <div><h3>{item.title}</h3><p>{item.reason}</p><span>Start the guide →</span></div>
                </Link>
              ))}
            </div>
          </div>
      </section>
    </main>
  );
}
