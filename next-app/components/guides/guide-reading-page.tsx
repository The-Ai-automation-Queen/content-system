import { ClaudeSeriesExperience, SeriesGuideLink } from "./claude-series-experience";
import Image from "next/image";
import { GuideLearningExperience } from "./guide-learning-experience";
import { guideFormats } from "@/content/guide-formats";
import { cleanLabel } from "./guide-icon";
import { InteractiveWalkthrough } from "./interactive-walkthrough";
import Link from "next/link";
import { GuideAccessBoundary } from "./guide-access-boundary";
import { CopyPrompt } from "./copy-prompt";
import { ScreenRecordingExperience } from "./screen-recording-experience";
import type { GuidePage, GuideSection } from "@/content/guide-page";
import styles from "./guide-reading-page.module.css";

function RichText({ children }: { children: string }) {
  return children.split("**").map((part, index) => (
    index % 2 === 1 ? <strong key={`${index}-${part}`}>{part}</strong> : part
  ));
}

function Section({ section }: { section: GuideSection }) {
  if (section.kind === "walkthrough") {
    return (
      <section className={`${styles.section} ${styles.walkthrough}`}>
        <h2>{section.heading}</h2>
        <p className={styles.sectionIntro}>{section.introduction}</p>
        {section.blocks.map((block, index) => {
          if (block.kind === "heading") return <h3 key={index}>{block.text}</h3>;
          if (block.kind === "paragraph") return <p key={index}>{block.text}</p>;
          if (block.kind === "code") return <CopyPrompt key={index} label={block.label} prompt={block.text} />;
          if (block.kind === "note") return <aside className={styles.sourceNote} key={index}><span aria-hidden="true">{block.icon}</span><p>{block.text}</p></aside>;
          if (block.kind === "list") return <ol className={styles.sourceSteps} key={index}>{block.items.map((item) => <li key={item}>{item}</li>)}</ol>;
          if (block.kind === "table") return <table className={styles.sourceTable} key={index}><thead><tr>{block.rows[0]?.map((heading) => <th scope="col" key={heading}>{heading}</th>)}</tr></thead><tbody>{block.rows.slice(1).map((row) => <tr key={row[0]}>{row.map((cell, cellIndex) => cellIndex === 0 ? <th scope="row" key={cellIndex}>{cell}</th> : <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table>;
          return null;
        })}
      </section>
    );
  }

  if (section.kind === "tutorial") {
    return (
      <section className={styles.section}>
        <h2>{section.heading}</h2>
        <p className={styles.sectionIntro}><RichText>{section.introduction}</RichText></p>
        <ol className={styles.steps}>
          {section.steps.map((step) => (
            <li key={step.title}>
              <h3>{step.title}</h3>
              <p><RichText>{step.body}</RichText></p>
              {step.links && <div className={styles.stepLinks}>{step.links.map((link) => (
                <a href={link.href} key={link.href} rel="noreferrer" target="_blank">{link.label} ↗</a>
              ))}</div>}
            </li>
          ))}
        </ol>
        {section.prompt && <CopyPrompt prompt={section.prompt} />}
        <p className={styles.promptCheck}><strong>Check before continuing: </strong><RichText>{section.check}</RichText></p>
      </section>
    );
  }

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
              <h3>{cleanLabel(item.title)}</h3>
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

  if (section.kind === "diagram") {
    return <section className={styles.section}>
      <h2>{section.heading}</h2>
      <ol className={styles.steps}>{section.nodes.map(node => <li key={node.title}><h3>{node.title}</h3><p>{node.body}</p></li>)}</ol>
    </section>;
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
  const RelatedLink = guide.series ? SeriesGuideLink : Link;
  const learningFormat = guide.series ? undefined : guideFormats[guide.slug];
  const screenRecording = guide.slug === "chatgpt-screen-recording-to-process-guide";
  const interactive = guide.tutorial?.every((section) => section.kind === "walkthrough");
  const conclusion = (<section className={styles.conclusion}>
              <h2>{cleanLabel(guide.conclusion.heading)}</h2>
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
              {guide.conclusion.finishLine && <p className={styles.conclusionLine}><RichText>{guide.conclusion.finishLine}</RichText></p>}
              {guide.conclusion.extensions && <div className={styles.conclusionQuestions}><h3>Want to take it further?</h3><ul>{guide.conclusion.extensions.map((item) => <li key={item}>{item}</li>)}</ul></div>}
            </section>);
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
            {learningFormat ? <Section section={guide.sections[0]} /> : (screenRecording ? guide.sections.filter((section) => section.kind === "cards") : guide.sections).map((section) => <Section section={section} key={section.heading} />)}
          </div>

          <GuideAccessBoundary
            guideSlug={guide.slug}
            guideTitle={guide.title}
          >
            {guide.series && <ClaudeSeriesExperience series={guide.series} />}
            {screenRecording && <ScreenRecordingExperience guide={guide} />}
            {learningFormat && <GuideLearningExperience guide={guide} format={learningFormat} conclusion={conclusion} skipFirstSection />}
            {guide.tutorial?.every((section) => section.kind === "walkthrough") ? <InteractiveWalkthrough sections={guide.tutorial} slug={guide.slug} conclusion={conclusion} /> : guide.tutorial?.map((section) => <Section section={section} key={section.heading} />)}
            {!screenRecording && !learningFormat && guide.tryNow && <section className={styles.tryNow}>
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
            </section>}
            {!interactive && !learningFormat && conclusion}
            {guide.workshopInvitation && <aside className={`${styles.paidNextStep} ${styles.workshopInvitation}`}><h2>{guide.workshopInvitation.title}</h2><p>{guide.workshopInvitation.body}</p>{guide.workshopInvitation.href && guide.workshopInvitation.label && <a className={styles.workshopLink} href={guide.workshopInvitation.href}>{guide.workshopInvitation.label}</a>}</aside>}
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
                  <div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Coming next</span></div>
                </article>
              ) : (
                <RelatedLink href={`/guides/${item.slug}.html`} className={styles.relatedCard} key={item.slug}>
                  <figure><Image src={item.cover} alt="" aria-hidden="true" fill sizes="(max-width: 760px) 100vw, 33vw" /></figure>
                  <div><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p><span>Start the guide →</span></div>
                </RelatedLink>
              ))}
            </div>
          </div>
      </section>
    </main>
  );
}
