"use client";

import { useMemo, useState } from "react";
import { aiJargonGuide, jargonEntries, jargonQuiz, type JargonCategory } from "@/content/ai-jargon-guide";

const categories: Array<"All" | JargonCategory> = ["All", "Basics", "How it works", "Building", "Risk"];

export function JargonLab({ example }: { example: string }) {
  const [sentence, setSentence] = useState(example);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [openTerm, setOpenTerm] = useState<string>(jargonEntries[0].term);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  const matches = useMemo(() => {
    const lower = sentence.toLowerCase();
    return jargonEntries.filter((entry) =>
      [entry.term, ...(entry.aliases ?? [])].some((candidate) => lower.includes(candidate.toLowerCase())),
    );
  }, [sentence]);

  const filtered = jargonEntries.filter((entry) => {
    const haystack = `${entry.term} ${entry.plain} ${entry.meeting} ${entry.aliases?.join(" ") ?? ""}`.toLowerCase();
    return (category === "All" || entry.category === category) && haystack.includes(query.toLowerCase());
  });

  const quiz = jargonQuiz[quizIndex];

  return (
    <>
      <section className="translator" aria-labelledby="translator-title">
        <div className="translator__input">
          <label htmlFor="jargon-sentence">Paste the sentence</label>
          <textarea id="jargon-sentence" value={sentence} onChange={(event) => setSentence(event.target.value)} rows={5} />
          <button type="button" onClick={() => setSentence("")}>Clear</button>
        </div>
        <div className="translator__result" aria-live="polite">
          <p className="tool-label">Plain-English decoder</p>
          {matches.length ? (
            <>
              <p className="translator__summary">This sentence uses {matches.length} term{matches.length === 1 ? "" : "s"} worth unpacking.</p>
              <div className="translator__matches">
                {matches.map((entry) => (
                  <article key={entry.term}>
                    <h3>{entry.term}</h3>
                    <p>{entry.plain}</p>
                    <strong>Ask: {entry.meeting}</strong>
                  </article>
                ))}
              </div>
            </>
          ) : (
            <p className="translator__empty">Paste a sentence containing a term from the guide. Try “RAG”, “agent”, “MCP” or “context window”.</p>
          )}
        </div>
      </section>

      <section className="jargon-section-head">
        <p className="article-label">Reference, not revision</p>
        <h2 id="glossary-heading">{aiJargonGuide.glossaryTitle}</h2>
        <p>{aiJargonGuide.glossaryIntro}</p>
      </section>

      <section className="jargon-explorer" aria-labelledby="glossary-heading">
        <div className="jargon-controls">
          <label className="jargon-search">
            <span>Find a word or problem</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try ‘cost’, ‘approval’ or ‘RAG’" />
          </label>
          <div className="jargon-filters" aria-label="Filter terms by category">
            {categories.map((item) => (
              <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>
            ))}
          </div>
          <p className="jargon-count">Showing {filtered.length} of {jargonEntries.length} terms</p>
        </div>
        <div className="jargon-list">
          {filtered.map((entry, index) => {
            const isOpen = openTerm === entry.term;
            return (
              <article className="jargon-row" key={entry.term}>
                <button type="button" aria-expanded={isOpen} onClick={() => setOpenTerm(isOpen ? "" : entry.term)}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{entry.term}</strong>
                  <small>{entry.category}</small>
                  <b aria-hidden="true">{isOpen ? "−" : "+"}</b>
                </button>
                {isOpen && (
                  <div className="jargon-row__body">
                    <div><span>Plain English</span><p>{entry.plain}</p></div>
                    <div><span>In the room</span><p>{entry.example}</p></div>
                    <aside><span>Your next question</span><p>{entry.meeting}</p></aside>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section className="jargon-quiz-head">
        <p className="article-label">Pressure test</p>
        <h2 id="quiz-heading">{aiJargonGuide.quizTitle}</h2>
        <p>{aiJargonGuide.quizIntro}</p>
      </section>

      <section className="jargon-quiz" aria-labelledby="quiz-heading">
        <div className="quiz-progress"><span>Scenario {quizIndex + 1} of {jargonQuiz.length}</span><progress value={quizIndex + 1} max={jargonQuiz.length} /></div>
        <h3>{quiz.question}</h3>
        <div className="quiz-choices">
          {quiz.choices.map((choice, index) => (
            <button
              type="button"
              key={choice}
              className={selected === null ? "" : index === quiz.answer ? "is-correct" : selected === index ? "is-wrong" : ""}
              disabled={selected !== null}
              onClick={() => setSelected(index)}
            >
              <span>{String.fromCharCode(65 + index)}</span>{choice}
            </button>
          ))}
        </div>
        {selected !== null && (
          <div className="quiz-feedback" aria-live="polite">
            <strong>{selected === quiz.answer ? "That’s the useful question." : "Look for the decision risk first."}</strong>
            <p>{quiz.explanation}</p>
            <button type="button" onClick={() => { setQuizIndex((quizIndex + 1) % jargonQuiz.length); setSelected(null); }}>
              {quizIndex === jargonQuiz.length - 1 ? "Start again" : "Next scenario"} →
            </button>
          </div>
        )}
      </section>
    </>
  );
}

export function CopyMeetingCard({ questions }: { questions: readonly string[] }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(`AI meeting card\n\n${questions.map((question, index) => `${index + 1}. ${question}`).join("\n")}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return <button type="button" className="meeting-card__copy" onClick={copy}>{copied ? "Copied" : "Copy the five questions"}</button>;
}
