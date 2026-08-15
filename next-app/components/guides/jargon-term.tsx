type JargonTermProps = {
  term: string;
  meaning: string;
  why: string;
};

export function JargonTerm({ term, meaning, why }: JargonTermProps) {
  return (
    <article className="term-card">
      <h3>{term}</h3>
      <div>
        <span>In plain English</span>
        <p>{meaning}</p>
      </div>
      <div>
        <span>Why it matters</span>
        <p>{why}</p>
      </div>
    </article>
  );
}
