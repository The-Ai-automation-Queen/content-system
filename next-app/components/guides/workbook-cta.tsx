import styles from "./workbook-cta.module.css";

// End-of-guide box that points readers to the workbook that fits the guide's topic.
const WORKBOOKS = {
  strengths: { slug: "find-your-zone-of-genius", title: "Find the Strengths You Overlook", line: "Not sure what you are good at? Answer easy questions and see it clearly.", cover: "/images/workbooks/inside/strengths-cover.webp" },
  experience: { slug: "your-human-evidence", title: "Put Your Experience Into Words", line: "Make AI sound like you. Write down your best moments in your own words.", cover: "/images/workbooks/inside/experience-cover.webp" },
  sell: { slug: "use-what-is-unique-about-you", title: "Find What You Can Sell", line: "Pick one thing you know and turn it into something to sell.", cover: "/images/workbooks/inside/sell-cover.webp" },
} as const;

const SELL = ["test-business-idea-with-ai", "launch-your-product-in-30-days", "marketing-emails-that-sell", "chatgpt-customer-research-with-evidence", "start-using-ai-in-your-business", "money-plan-with-ai"];
const EXPERIENCE = ["brand-brain-guide", "show-up-in-ai-search", "stop-ai-agreeing-with-you", "instagram-content-dashboard", "get-better-professional-writing-from-grok", "edit-long-writing-with-deepseek", "teach-claude-a-repeatable-workflow"];

export function WorkbookCta({ slug }: { slug: string }) {
  const book = WORKBOOKS[SELL.includes(slug) ? "sell" : EXPERIENCE.includes(slug) ? "experience" : "strengths"];
  const href = `/workbooks/${book.slug}.html?utm_source=guide&utm_campaign=${slug}`;
  return (
    <aside className={styles.box} aria-labelledby="workbook-cta-title">
      <img className={styles.cover} src={book.cover} alt="" width={909} height={1287} loading="lazy" />
      <div>
        <h2 id="workbook-cta-title" className={styles.title}>{book.title}</h2>
        <p className={styles.line}>Want to go further? {book.line}</p>
        <p className={styles.facts}>$27 &#183; PDF to print &#183; download right away</p>
        <a className={styles.button} href={href}>See the workbook &#8594;</a>
      </div>
    </aside>
  );
}
