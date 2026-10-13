"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import type { GuidePage } from "@/content/guide-page";
import { brandBrainPrompts, brandBrainRequests, brandDnaRows } from "@/content/brand-brain-guide";
import { cleanLabel } from "./guide-icon";
import { GuideAccessBoundary } from "./guide-access-boundary";
import { GuideRelatedLink } from "./guide-related-link";
import styles from "./brand-brain-page.module.css";

function Prompt({ text, label }: { text: string; label: string }) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
      window.setTimeout(() => setState("idle"), 2000);
    } catch {
      setState("error");
    }
  }
  return <div className={styles.prompt}>
    <button type="button" onClick={copy} aria-label={`Copy the prompt: ${label}`}>{state === "copied" ? "Copied" : "Copy prompt"}</button>
    <pre>{text}</pre>
    {state === "error" && <p role="alert" className={styles.copyError}>Copy failed. Select the text above instead.</p>}
  </div>;
}

function Step({ num, id, title, accent, children }: { num: string; id: string; title: string; accent: string; children: ReactNode }) {
  return <section className={styles.card} aria-labelledby={id}>
    <div className={styles.sh}>
      <span className={styles.tile} aria-hidden="true">{num}</span>
      <h2 id={id}>{title} <em>{accent}</em></h2>
    </div>
    {children}
  </section>;
}

export function BrandBrainPage({ guide }: { guide: GuidePage }) {
  const p = brandBrainPrompts;
  return <main className={styles.page}>
    <div className={styles.column}>
      <Link className={styles.back} href="/guides/">← All guides</Link>

      <div className={styles.author}>
        <img src="/fatiha-hero-portrait.webp" alt="" width={46} height={46} />
        <div>
          <div className={styles.name}>Fatiha Chikh <span className={styles.badge}>Free guide</span></div>
          <div className={styles.meta}>Shift &amp; Lead</div>
        </div>
      </div>

      <p className={styles.eyebrow}><span aria-hidden="true">✦</span>Free guide · Claude · 30 minutes</p>
      <h1>The Brand Brain Guide: build yours <em>in Claude in 5 steps.</em></h1>

      <section className={`${styles.card} ${styles.intro}`} aria-labelledby="bb-intro">
        <h2 id="bb-intro">One project that knows your brand</h2>
        <p className={styles.lead}>{guide.answer.paragraphs[0]}</p>
        <h3>What you end up with</h3>
        <ul className={styles.list}>
          <li>One Claude project called <strong>Brand Brain</strong></li>
          <li>A <strong>brand kit</strong>: logo, colours and fonts, either your own or a design system Claude builds for you</li>
          <li><strong>Voice rules</strong>: how you sound, the words you use and the words you never say</li>
          <li>A one-page <strong>Brand DNA</strong> doc: who you help, the problem you solve and why you are different</li>
          <li>A place to ask for ads, landing pages, posts and emails that come back on brand the first time</li>
        </ul>
        <p className={styles.tip}>You need a Claude plan that includes Projects. Every prompt below can be copied and pasted as it is; replace the parts in [square brackets].</p>
      </section>

      <Step num="01" id="bb-step-1" title="Create the project" accent="The container.">
        <p>The project is the container: anything you add to it is read by every chat you start inside it.</p>
        <ol className={styles.list}>
          <li>Open <a href="https://claude.ai/" target="_blank" rel="noopener noreferrer">Claude ↗</a> and click <strong>Projects</strong> in the left sidebar.</li>
          <li>Click <strong>New project</strong>.</li>
          <li>Name it <strong>Brand Brain</strong>.</li>
          <li>In the description, write one line about your business, for example: &ldquo;Everything about [business name]: brand kit, voice and customer.&rdquo;</li>
        </ol>
        <p className={styles.tip}>Keep the project open. The next three steps each add one file to it.</p>
      </Step>

      <div className={styles.gateStage}>
        <div className={styles.preview} aria-hidden="true">
          <section className={styles.card}>
            <div className={styles.sh}><span className={styles.tile}>02</span><h2>Build your brand kit <em>What you look like.</em></h2></div>
            <p>Your brand kit tells Claude what your business looks like: logo, colours and fonts.</p>
            <div className={styles.prompt}><pre>{p.designSystem}</pre></div>
          </section>
        </div>

        <GuideAccessBoundary
          guideSlug={guide.slug}
          guideTitle={guide.title}
          heading="Get the"
          headingAccent="Brand Brain Guide."
          guidePromise="Enter your name and email. The rest of the guide opens straight away, and I'll email you the link so you can come back to it later."
          actionLabel="Open the rest of the guide"
          showWorkBridge={false}
        >
          <Step num="02" id="bb-step-2" title="Build your brand kit" accent="What you look like.">
            <p>Your brand kit tells Claude what your business looks like: logo, colours and fonts.</p>
            <p><strong>If you already have a brand:</strong> upload your logo files, your colour codes and your font names to the project&apos;s files. A brand guidelines PDF works too. Then skip to Step 3.</p>
            <p><strong>If you do not have one yet:</strong> start a chat inside the project and paste this prompt.</p>
            <Prompt text={p.designSystem} label="Build a design system" />
            <p>Answer the five questions, then push back on anything that does not feel like you. When you are happy, ask:</p>
            <Prompt text={p.brandKit} label="Turn it into a Brand Kit" />
            <p>Save that document to the project&apos;s files.</p>
          </Step>

          <Step num="03" id="bb-step-3" title="Build your brand voice" accent="How you sound.">
            <p>Voice rules are what stop Claude sounding like a generic AI and make it sound like you.</p>
            <ol className={styles.list}>
              <li>Upload anything your business has ever written to the project: website pages, emails, newsletters, social captions, sales pages. Five to ten pieces is enough; more is better.</li>
              <li>Pick writing you are proud of. Claude copies what you give it, so leave out anything that does not sound like you.</li>
              <li>Start a chat inside the project and paste this prompt.</li>
            </ol>
            <Prompt text={p.voiceRules} label="Write my Voice Rules" />
            <p>Read what comes back and correct it. The &ldquo;never say&rdquo; list is the most useful part, so add every word that makes you cringe. Save the final version to the project&apos;s files as <strong>Voice Rules</strong>.</p>
            <p className={styles.tip}><strong>No writing yet?</strong> Record yourself explaining your business for two minutes, paste the transcript in, and run the same prompt.</p>
          </Step>

          <Step num="04" id="bb-step-4" title="Write your Brand DNA doc" accent="The step that matters most.">
            <p>The Brand DNA doc is one page that tells Claude who you sell to, what problem you solve and why you are different. Fill in the brackets and save it to the project as <strong>Brand DNA</strong>.</p>
            <div className={styles.tableWrap}>
              <table>
                <thead><tr><th scope="col">#</th><th scope="col">Section</th><th scope="col">Fill in</th></tr></thead>
                <tbody>{brandDnaRows.map(([section, fill], index) => <tr key={section}><td>{index + 1}</td><td>{section}</td><td>{fill}</td></tr>)}</tbody>
              </table>
            </div>
            <h3>Tips for filling it in</h3>
            <ul className={styles.list}>
              <li>Be specific about the customer. &ldquo;Busy cafe owners with one location&rdquo; beats &ldquo;small businesses&rdquo;.</li>
              <li>Write the problem in your customer&apos;s words, the way they would say it to a friend.</li>
              <li>For proof, real numbers and real quotes only. Leave it short if you are new.</li>
            </ul>
            <p><strong>Stuck?</strong> Paste this prompt into a chat inside the project and let Claude interview you.</p>
            <Prompt text={p.dnaInterview} label="Interview me for my Brand DNA" />
          </Step>

          <Step num="05" id="bb-step-5" title="Start creating" accent="Ask for what you need.">
            <p>Open a new chat inside the Brand Brain project and ask for what you need; Claude reads your three files before it answers. Start with requests like these.</p>
            <ul className={styles.requests}>
              {brandBrainRequests.map((request) => <li key={request.want}><strong>{request.want}</strong><Prompt text={request.prompt} label={request.want} /></li>)}
            </ul>
            <p className={styles.honest}><strong>When something comes back off brand,</strong> say what is wrong (&ldquo;too formal&rdquo;, &ldquo;we never say &lsquo;unlock&rsquo;&rdquo;) and ask Claude to update the Voice Rules file with that note. The Brand Brain gets better each time you correct it.</p>
          </Step>

          <Step num="06" id="bb-step-6" title="Project instructions" accent="Paste once.">
            <p>Project instructions make Claude check your files every time without being asked. Open the project, find <strong>Instructions</strong>, and paste this.</p>
            <Prompt text={p.instructions} label="Project instructions" />
          </Step>

          <Step num="07" id="bb-step-7" title="Keep it sharp" accent="Small habits.">
            <ul className={styles.list}>
              <li><strong>When something changes</strong> (new offer, new price, new customer): update Brand DNA the same day.</li>
              <li><strong>Once a month:</strong> add your best new writing to the project and ask Claude to refresh the Voice Rules.</li>
              <li><strong>When Claude gets it wrong twice:</strong> the fix belongs in a file, not in the chat. Add the rule to Voice Rules or Brand Kit.</li>
              <li><strong>Keep the files short.</strong> One to two pages each works better than a 40-page brand book.</li>
            </ul>
          </Step>

          <Step num="✓" id="bb-checklist" title="Checklist" accent="Six boxes.">
            <ul className={styles.checklist}>
              {["Project created and named Brand Brain", "Brand Kit saved to the project", "Voice Rules saved to the project", "Brand DNA saved to the project", "Project instructions pasted in", "First ad, page or post made"].map((item) =>
                <li key={item}><label><input type="checkbox" /> {item}</label></li>)}
            </ul>
          </Step>
        </GuideAccessBoundary>
      </div>

      <section className={styles.cta} aria-labelledby="bb-next">
        <p className={styles.ctaEyebrow}><span aria-hidden="true">✦</span>Free AI guides</p>
        <h2 id="bb-next">Your Brand Brain is set up. <em>Pick the next job.</em></h2>
        <p>The free guides library has more step-by-step guides like this one, each built around one job you can finish in a sitting.</p>
        <Link className={styles.btn} href="/guides/">Browse the free guides →</Link>
      </section>
    </div>

    {guide.related.length > 0 && <section className={styles.related} aria-labelledby="bb-related">
      <h2 id="bb-related">Keep reading. <em>One job at a time.</em></h2>
      <div className={styles.relatedGrid}>{guide.related.map((item) => <GuideRelatedLink key={item.slug} slug={item.slug}><figure><Image src={item.cover} alt="" fill sizes="(max-width: 760px) 100vw, 380px" /></figure><h3>{cleanLabel(item.title)}</h3><p>{item.reason}</p></GuideRelatedLink>)}</div>
    </section>}
  </main>;
}
