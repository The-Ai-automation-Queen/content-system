import Image from "next/image";
import {
  GuideAccessCaptureButton,
  GuideAccessProvider,
  ProtectedGuideContent,
} from "@/components/guides/guide-access-gate";
import { CopyBlock } from "@/components/guides/copy-block";
import { GuideMotion } from "@/components/guides/guide-motion";
import { RelatedGuides } from "@/components/guides/related-guides";
import { isPublicGuide, type Guide } from "@/content/guides";
import {
  GUIDE_VISUAL_BRAND,
  type GuideArticleDefinition,
  type GuideFramework,
  type PracticalAsset,
} from "@/content/structured-guide";
import styles from "./structured-guide-article.module.css";

export type StructuredGuideArticleProps = {
  guide: GuideArticleDefinition;
  relatedGuides: readonly [Guide, Guide, Guide];
};

function NumberedList({ items }: { items: readonly string[] }) {
  return (
    <ol className={styles.numberedList}>
      {items.map((item, index) => (
        <li key={`${index}-${item}`}>
          <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <p>{item}</p>
        </li>
      ))}
    </ol>
  );
}

function BulletList({ items }: { items: readonly string[] }) {
  return <ul className={styles.bulletList}>{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}

function Framework({ framework }: { framework: GuideFramework }) {
  if (framework.kind === "glossary") {
    return (
      <section className={styles.section} aria-labelledby="guide-framework-title" data-guide-reveal>
        <header className={styles.sectionHeader}>
          <p className={styles.eyebrow}>The essential terms</p>
          <h2 id="guide-framework-title">{framework.heading}</h2>
          {framework.introduction && <p>{framework.introduction}</p>}
        </header>
        <div className={styles.glossaryGroups}>
          {framework.groups.map((group, groupIndex) => (
            <section className={styles.glossaryGroup} key={group.id} aria-labelledby={`group-${group.id}`}>
              <header className={styles.groupHeader}>
                <span>{String(groupIndex + 1).padStart(2, "0")}</span>
                <div>
                  <h3 id={`group-${group.id}`}>{group.title}</h3>
                  {group.introduction && <p>{group.introduction}</p>}
                </div>
                {group.illustration && (
                  <figure className={styles.groupImage} data-guide-image>
                    <Image
                      src={group.illustration.src}
                      alt={group.illustration.alt}
                      fill
                      sizes="(max-width: 760px) 38vw, 180px"
                      style={{ objectPosition: group.illustration.focalPoint }}
                    />
                  </figure>
                )}
              </header>
              <div className={styles.glossaryGrid}>
                {group.entries.map((entry) => (
                  <article className={styles.glossaryEntry} key={entry.term}>
                    <h4>{entry.term}</h4>
                    {entry.fullName && <p className={styles.fullName}>{entry.fullName}</p>}
                    <p className={styles.definition}>{entry.meaning}</p>
                    <p className={styles.example}>{entry.example}</p>
                    {entry.instruction && <p className={styles.instruction}>{entry.instruction}</p>}
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    );
  }

  if (framework.kind === "explainer") {
    return (
      <section className={styles.section} aria-labelledby="guide-framework-title" data-guide-reveal>
        <header className={styles.sectionHeader}>
          <p className={styles.eyebrow}>The explanation</p>
          <h2 id="guide-framework-title">{framework.heading}</h2>
          {framework.introduction && <p>{framework.introduction}</p>}
        </header>
        <div className={styles.pointGrid}>
          {framework.points.map((point, index) => (
            <article className={styles.point} key={point.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{point.title}</h3>
              <p>{point.explanation}</p>
              {point.example && <p className={styles.example}>{point.example}</p>}
              {point.instruction && <p className={styles.instruction}>{point.instruction}</p>}
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (framework.kind === "tutorial") {
    return (
      <section className={styles.section} aria-labelledby="guide-framework-title" data-guide-reveal>
        <header className={styles.sectionHeader}>
          <p className={styles.eyebrow}>The shortest reliable path</p>
          <h2 id="guide-framework-title">{framework.heading}</h2>
          <p>{framework.finishedResult}</p>
        </header>
        {framework.requirements && (
          <aside className={styles.inputPanel}>
            <h3>Prepare these first</h3>
            <BulletList items={framework.requirements} />
          </aside>
        )}
        <ol className={styles.steps}>
          {framework.steps.map((step, index) => (
            <li key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.instruction}</p>
                {step.whyItMatters && <p className={styles.supporting}>{step.whyItMatters}</p>}
                <p className={styles.completion}><strong>Done when:</strong> {step.completionCheck}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    );
  }

  if (framework.kind === "workflow") {
    return (
      <section className={styles.section} aria-labelledby="guide-framework-title" data-guide-reveal>
        <header className={styles.sectionHeader}>
          <p className={styles.eyebrow}>The workflow</p>
          <h2 id="guide-framework-title">{framework.heading}</h2>
          <p>{framework.outcome}</p>
        </header>
        <div className={styles.workflowSetup}>
          <div><strong>Starts when</strong><p>{framework.trigger}</p></div>
          <div><strong>Needs</strong><BulletList items={framework.requiredInputs} /></div>
        </div>
        <ol className={styles.workflowSteps}>
          {framework.steps.map((step, index) => (
            <li key={`${step.owner}-${step.title}`}>
              <div className={styles.workflowLabel}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step.owner}</strong>
              </div>
              <div>
                <h3>{step.title}</h3>
                <p>{step.action}</p>
                <p className={styles.completion}><strong>Output:</strong> {step.output}</p>
                {step.approvalRequired && <p className={styles.approval}>Human approval required</p>}
              </div>
            </li>
          ))}
        </ol>
        <p className={styles.finalOutput}><strong>Finished result:</strong> {framework.finalOutput}</p>
      </section>
    );
  }

  if (framework.kind === "decision") {
    return (
      <section className={styles.section} aria-labelledby="guide-framework-title" data-guide-reveal>
        <header className={styles.sectionHeader}>
          <p className={styles.eyebrow}>The decision</p>
          <h2 id="guide-framework-title">{framework.heading}</h2>
          <p>{framework.question}</p>
        </header>
        <p className={styles.recommendation}>{framework.recommendation}</p>
        <div className={styles.optionGrid}>
          {framework.options.map((option) => (
            <article key={option.name}>
              <h3>{option.name}</h3>
              <dl>
                <div><dt>Best when</dt><dd>{option.bestWhen}</dd></div>
                <div><dt>Tradeoff</dt><dd>{option.tradeoff}</dd></div>
                <div><dt>Choose it if</dt><dd>{option.decision}</dd></div>
              </dl>
              {option.href && (
                <a className={styles.optionAction} href={option.href}>
                  {option.actionLabel ?? "Open guide"} <span aria-hidden="true">→</span>
                </a>
              )}
            </article>
          ))}
        </div>
        <p className={styles.decisionRule}><strong>Decision rule:</strong> {framework.decisionRule}</p>
      </section>
    );
  }

  if (framework.kind === "learning-hub") {
    return (
      <section className={styles.section} aria-labelledby="guide-framework-title" data-guide-reveal>
        <header className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Choose your path</p>
          <h2 id="guide-framework-title">{framework.heading}</h2>
          <p>{framework.introduction}</p>
        </header>
        <div className={styles.pathwayGrid}>
          {framework.pathways.map((pathway, index) => (
            <article key={pathway.signal}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{pathway.signal}</h3>
              <p>{pathway.direction}</p>
              <a href={pathway.href}>{pathway.actionLabel} <span aria-hidden="true">→</span></a>
            </article>
          ))}
        </div>
        <div className={styles.hubSequence}>
          <h3>{framework.sequenceHeading}</h3>
          <ol className={styles.steps}>
            {framework.steps.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  {step.level && <p className={styles.stepLevel}>{step.level}</p>}
                  <h3>{step.title}</h3>
                  <p>{step.action}</p>
                  <p className={styles.completion}><strong>Ready to continue when:</strong> {step.finishLine}</p>
                  {step.href && step.actionLabel && (
                    <a className={styles.inlineAction} href={step.href}>{step.actionLabel} <span aria-hidden="true">→</span></a>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section} aria-labelledby="guide-framework-title" data-guide-reveal>
      <header className={styles.sectionHeader}>
        <p className={styles.eyebrow}>The verdict</p>
        <h2 id="guide-framework-title">{framework.heading}</h2>
        <p>{framework.verdict}</p>
      </header>
      <div className={styles.verdictGrid}>
        <div><h3>Best for</h3><BulletList items={framework.bestFor} /></div>
        <div><h3>Poor fit for</h3><BulletList items={framework.poorFitFor} /></div>
      </div>
      <div className={styles.useCases}>
        {framework.useCases.map((useCase) => (
          <article key={useCase.task}>
            <h3>{useCase.task}</h3>
            <p>{useCase.whyItWorks}</p>
            <p className={styles.instruction}>{useCase.firstMove}</p>
          </article>
        ))}
      </div>
      <p className={styles.recommendation}>{framework.recommendation}</p>
    </section>
  );
}

function PracticalAssetSection({ asset }: { asset: PracticalAsset }) {
  return (
    <section className={`${styles.section} ${styles.asset}`} aria-labelledby="practical-asset-title" data-guide-reveal>
      <header className={styles.sectionHeader}>
        <p className={styles.eyebrow}>Use it now</p>
        <h2 id="practical-asset-title">{asset.heading}</h2>
        <p>{asset.introduction}</p>
        {asset.instructions && <p>{asset.instructions}</p>}
      </header>

      {asset.workedExample && (
        <aside className={styles.workedExample}>
          <strong>{asset.workedExample.label}</strong>
          <p>{asset.workedExample.content}</p>
        </aside>
      )}

      {(asset.kind === "prompt" || asset.kind === "template") && (
        <>
          <CopyBlock content={asset.content} />
          <div className={styles.qualityBar}><h3>Check before you use it</h3><BulletList items={asset.qualityBar} /></div>
        </>
      )}

      {asset.kind === "checklist" && (
        <><NumberedList items={asset.items} /><p className={styles.completion}><strong>Complete when:</strong> {asset.completionRule}</p></>
      )}

      {asset.kind === "worksheet" && (
        <>
          <dl className={styles.worksheet}>
            {asset.fields.map((field) => <div key={field.label}><dt>{field.label}</dt><dd>{field.instruction}</dd></div>)}
          </dl>
          <p className={styles.completion}><strong>Complete when:</strong> {asset.completionRule}</p>
        </>
      )}

      {asset.kind === "decision-tool" && (
        <>
          <div className={styles.decisionQuestions}>
            {asset.questions.map((entry, index) => (
              <article key={entry.question}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{entry.question}</h3>
                <div className={styles.decisionAnswers}>
                  <p><strong>If yes:</strong> {entry.ifYes}</p>
                  <p><strong>If no:</strong> {entry.ifNo}</p>
                </div>
              </article>
            ))}
          </div>
          <p className={styles.decisionRule}><strong>Decision rule:</strong> {asset.decisionRule}</p>
        </>
      )}
    </section>
  );
}

export function StructuredGuideArticle({ guide, relatedGuides }: StructuredGuideArticleProps) {
  const actualRelatedSlugs = relatedGuides.map((item) => item.slug);
  if (
    new Set(actualRelatedSlugs).size !== 3 ||
    actualRelatedSlugs.includes(guide.slug) ||
    relatedGuides.some((item) => !isPublicGuide(item))
  ) {
    throw new Error(`Related guides for ${guide.slug} must be 3 different public guides.`);
  }

  const copyPosition = guide.hero.copyPosition ?? "left";

  return (
    <GuideAccessProvider guideSlug={guide.slug}>
    <main className={`${styles.page} article-page`} data-guide-article>
      <GuideMotion />
      <article>
        <div className={`${styles.topbar} article-shell`}>
          <a href="/guides/">← All guides</a>
        </div>

        <header className={`${styles.hero} ${styles[`heroCopy${copyPosition === "left" ? "Left" : "Right"}`]}`}>
          <div className={`${styles.heroInner} article-shell`} data-guide-hero>
            <figure className={styles.heroImage} data-guide-image>
              <Image
                src={guide.hero.illustration.src}
                alt={guide.hero.illustration.alt}
                fill
                priority
                sizes="100vw"
                style={{ objectPosition: guide.hero.illustration.focalPoint }}
              />
            </figure>
            <div className={styles.heroCopy} data-guide-hero-copy>
              <p className={styles.brand}>{GUIDE_VISUAL_BRAND}</p>
              <h1>{guide.hero.title}</h1>
              <p className={styles.promise}>{guide.hero.promise}</p>
              {guide.capture && (
                <div className={styles.capture}>
                  <GuideAccessCaptureButton
                    guideSlug={guide.capture.guideSlug}
                    buttonLabel={guide.capture.buttonLabel}
                    title={guide.capture.modalTitle}
                    description={guide.capture.description}
                  />
                </div>
              )}
            </div>
          </div>
        </header>

        {guide.capture ? (
          <ProtectedGuideContent>
        <div className={styles.body}>
          <section className={styles.answer} aria-labelledby="immediate-answer-title" data-guide-reveal>
            <p className={styles.eyebrow}>The direct answer</p>
            <h2 id="immediate-answer-title">{guide.answer.heading}</h2>
            {guide.answer.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {guide.answer.keyLine && <p className={styles.keyLine}>{guide.answer.keyLine}</p>}
          </section>

          <Framework framework={guide.framework} />

          {guide.example && <section className={`${styles.section} ${styles.shiftLeadExample}`} aria-labelledby="shift-lead-example-title" data-guide-reveal>
            <header className={styles.sectionHeader}>
              <p className={styles.eyebrow}>A Shift &amp; Lead example</p>
              <h2 id="shift-lead-example-title">{guide.example.heading}</h2>
              <p>{guide.example.situation}</p>
            </header>
            <dl className={styles.exampleFlow}>
              {guide.example.weakApproach && <div><dt>Weak approach</dt><dd>{guide.example.weakApproach}</dd></div>}
              <div><dt>Decision</dt><dd>{guide.example.decision}</dd></div>
              <div><dt>Action</dt><dd>{guide.example.action}</dd></div>
              <div><dt>Result</dt><dd>{guide.example.result}</dd></div>
            </dl>
            <p className={styles.lesson}>{guide.example.lesson}</p>
          </section>}

          <PracticalAssetSection asset={guide.practicalAsset} />

          {guide.resultCheck && <section className={`${styles.section} ${styles.resultCheck}`} aria-labelledby="result-check-title" data-guide-reveal>
            <header className={styles.sectionHeader}>
              <p className={styles.eyebrow}>Check the result</p>
              <h2 id="result-check-title">{guide.resultCheck.heading}</h2>
            </header>
            <div className={styles.resultGrid}>
              <div><h3>A useful result</h3><BulletList items={guide.resultCheck.successSignals} /></div>
              {guide.resultCheck.limitations && <div><h3>Limits</h3><BulletList items={guide.resultCheck.limitations} /></div>}
              {guide.resultCheck.stopConditions && <div><h3>Stop and review</h3><BulletList items={guide.resultCheck.stopConditions} /></div>}
            </div>
          </section>}

          {guide.ending?.kind === "commercial" ? (
            <aside className={styles.commercialAction} aria-labelledby="guide-commercial-title" data-guide-reveal>
              {guide.ending.eyebrow && <p className={styles.eyebrow}>{guide.ending.eyebrow}</p>}
              <h2 id="guide-commercial-title">{guide.ending.heading}</h2>
              <p>{guide.ending.body}</p>
              <a href={guide.ending.action.href}>{guide.ending.action.label} <span aria-hidden="true">→</span></a>
            </aside>
          ) : guide.ending?.kind === "clean" ? (
            <p className={styles.cleanEnding} data-guide-reveal>{guide.ending.statement}</p>
          ) : null}
        </div>
          </ProtectedGuideContent>
        ) : (
          <div className={styles.body}>
            <section className={styles.answer} aria-labelledby="immediate-answer-title" data-guide-reveal>
              <p className={styles.eyebrow}>The direct answer</p>
              <h2 id="immediate-answer-title">{guide.answer.heading}</h2>
              {guide.answer.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {guide.answer.keyLine && <p className={styles.keyLine}>{guide.answer.keyLine}</p>}
            </section>
            <Framework framework={guide.framework} />
            <PracticalAssetSection asset={guide.practicalAsset} />
          </div>
        )}
      </article>

      <RelatedGuides guides={Array.from(relatedGuides)} title={guide.relatedHeading} />
      <p className="article-credit article-shell">Created by The AI Automation Queen · Shift &amp; Lead</p>
    </main>
    </GuideAccessProvider>
  );
}
