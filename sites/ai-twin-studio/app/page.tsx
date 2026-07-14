const twinCapabilities = [
  ["Think in your voice", "A trained brand brain that understands your ideas, offers, stories, and point of view."],
  ["Show up on camera", "A visual avatar and cloned voice for short-form video, lessons, explainers, and launches."],
  ["Keep content moving", "A repeatable engine that turns one strong idea into platform-ready content—without the blank page."],
];

const twinLayers = [
  ["01", "The brain", "Your positioning, voice, proof, offers, opinions, and boundaries—structured so AI can use them well."],
  ["02", "The face", "A natural digital avatar, voice model, visual direction, and the rules that keep it recognisably you."],
  ["03", "The engine", "Workflows that research, draft, repurpose, approve, and publish while you stay in creative control."],
];

const paths = [
  {
    number: "01",
    label: "Start here",
    title: "Twin Blueprint",
    text: "For founders who want the strategy and structure before they build.",
    items: ["AI twin opportunity map", "Voice + positioning blueprint", "Tool and workflow plan", "90-minute strategy session"],
    action: "Build it yourself",
  },
  {
    number: "02",
    label: "Most complete",
    title: "Build With Me",
    text: "For entrepreneurs who want their AI twin built properly—with them, not hidden from them.",
    items: ["Brand brain configuration", "Avatar + voice setup", "Content engine build", "Launch content + handover"],
    action: "Build it together",
    featured: true,
  },
  {
    number: "03",
    label: "By application",
    title: "Twin Studio",
    text: "A bespoke intensive for an established founder, creator, or small leadership team.",
    items: ["Multi-format twin system", "Advanced automations", "Team operating playbook", "30-day launch support"],
    action: "Quoted engagement",
  },
];

export default function Home() {
  return (
    <main>
      <header className="topbar frame">
        <a className="wordmark" href="#top" aria-label="Shift and Lead home">Shift <em>&amp;</em> Lead</a>
        <nav aria-label="Primary navigation">
          <a href="#what">What it is</a><a href="#system">The system</a><a href="#paths">Ways to build</a>
        </nav>
        <a className="navAction" href="#contact">Build your twin <span>↗</span></a>
      </header>

      <section className="hero frame" id="top">
        <div className="heroMain">
          <p className="kicker"><span>AI Twin Studio</span><b>01 / 08</b></p>
          <h1>Build once.<br />Show up <em>everywhere.</em></h1>
          <p className="heroLead">Your AI twin turns what you know, how you speak, and how you show up into a system that keeps working—even when you’re not online.</p>
          <div className="heroButtons"><a className="button primary" href="#contact">Explore your twin <span>↗</span></a><a className="quietLink" href="#what">See how it works <span>↓</span></a></div>
        </div>
        <div className="heroArt" aria-label="Abstract illustration of an AI twin">
          <div className="blueField"><span className="giantAmp">&amp;</span></div>
          <div className="twin twinOne"><span>YOU</span></div>
          <div className="twin twinTwo"><span>YOU²</span></div>
          <p>One brain.<br />One voice.<br />More freedom.</p>
        </div>
        <div className="heroMeta"><span>Shift &amp; Lead / Dubai</span><span>Stop doing everything by hand.</span></div>
      </section>

      <section className="statement darkSlide" id="what">
        <div className="frame slideInner">
          <p className="kicker light"><span>The real problem</span><b>02 / 08</b></p>
          <div className="statementGrid">
            <h2>You became the<br /><em>bottleneck</em> in the<br />business you built.</h2>
            <div className="statementCopy"><p>Every post needs your words. Every video needs your face. Every idea waits for a free hour you don’t have.</p><p className="pullQuote">“The business works.<br />It just works too much <em>because of you.</em>”</p></div>
          </div>
          <div className="problemStrip"><span>Always starting from zero</span><span>Content stops when you stop</span><span>Your best ideas stay in your head</span></div>
        </div>
      </section>

      <section className="overview frame">
        <p className="kicker"><span>What an AI twin actually is</span><b>03 / 08</b></p>
        <div className="overviewTitle"><h2>Not a gimmick.<br />A <em>second you</em><br />with a system.</h2><p>An AI twin is the connected version of your brand brain, your voice, your digital presence, and the workflows that put them to work.</p></div>
        <div className="capabilityGrid">
          {twinCapabilities.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="architecture creamSlide" id="system">
        <div className="frame">
          <p className="kicker"><span>The twin architecture</span><b>04 / 08</b></p>
          <div className="architectureHead"><h2>Three layers.<br />One <em>recognisable you.</em></h2><p>The technology matters. But the order matters more. We build from the inside out—so your twin sounds like you before it ever looks like you.</p></div>
          <div className="layers">
            {twinLayers.map(([num,title,text]) => <article key={title}><span>{num}</span><div><h3>{title}</h3><p>{text}</p></div><b aria-hidden="true">↗</b></article>)}
          </div>
        </div>
      </section>

      <section className="useCases frame">
        <p className="kicker"><span>Where your twin works</span><b>05 / 08</b></p>
        <div className="useCaseLayout">
          <div className="useCaseArt"><div className="portraitCard"><span>YOUR<br />IDEAS</span><b>× 10</b></div><p>One source.<br />Many expressions.</p></div>
          <div className="useCaseCopy"><h2>Turn presence<br />into <em>leverage.</em></h2><div className="useList"><p><span>01</span>Short-form videos that sound like you</p><p><span>02</span>Course lessons without another shoot day</p><p><span>03</span>Thought leadership from one weekly idea</p><p><span>04</span>Personalised welcomes and nurture</p><p><span>05</span>Multilingual content for a wider audience</p></div></div>
        </div>
      </section>

      <section className="roadmap darkSlide">
        <div className="frame">
          <p className="kicker light"><span>Build sequence</span><b>06 / 08</b></p>
          <h2 className="roadmapTitle">From your head<br />to a working twin<br />in <em>four moves.</em></h2>
          <div className="roadmapGrid">
            <article><span>Week 01</span><h3>Extract</h3><p>We pull out the voice, offers, stories, expertise, and decisions that make you you.</p></article>
            <article><span>Week 02</span><h3>Train</h3><p>We configure your brand brain, voice model, visual twin, and non-negotiable boundaries.</p></article>
            <article><span>Week 03</span><h3>Connect</h3><p>We build the workflows that turn your raw ideas into useful, ready-to-review outputs.</p></article>
            <article><span>Week 04</span><h3>Launch</h3><p>We test with real content, refine what feels off, and hand you a system you understand.</p></article>
          </div>
        </div>
      </section>

      <section className="paths frame" id="paths">
        <p className="kicker"><span>Ways to build</span><b>07 / 08</b></p>
        <div className="pathsHead"><h2>Choose how much<br />support you <em>want.</em></h2><p>No black box. No endless retainer. Start with the clarity you need and build from there.</p></div>
        <div className="pathGrid">
          {paths.map((path) => <article key={path.title} className={path.featured ? "featured" : ""}>
            <div className="pathTop"><span>{path.number}</span><b>{path.label}</b></div><h3>{path.title}</h3><p>{path.text}</p><ul>{path.items.map(item=><li key={item}>↗ {item}</li>)}</ul><div className="pathBottom"><span>{path.action}</span><a href="#contact">Explore <b>↗</b></a></div>
          </article>)}
        </div>
      </section>

      <section className="contactSlide" id="contact">
        <div className="frame">
          <p className="kicker"><span>Your next move</span><b>08 / 08</b></p>
          <div className="contactGrid"><div><h2>Your business<br />doesn’t need<br /><em>more of you.</em></h2><p>It needs more of what only you know—captured once, built properly, and put to work.</p></div><div className="contactAction"><span className="contactAmp">&amp;</span><a className="button darkButton" href="mailto:hello@shiftandlead.com?subject=I%20want%20to%20build%20my%20AI%20twin">Start the conversation <span>↗</span></a><small>One focused conversation. No jargon. We’ll map the version of your twin that would genuinely save you time.</small></div></div>
        </div>
      </section>

      <footer className="footer frame"><a className="wordmark" href="#top">Shift <em>&amp;</em> Lead</a><p>AI and automation for more freedom.</p><p>Dubai, UAE · © 2026</p></footer>
    </main>
  );
}
