import type { Guide } from "@/content/guides";
import { GuideCard } from "@/components/guides/guide-card";

type RelatedGuidesProps = {
  guides: Guide[];
  title?: string;
};

export function RelatedGuides({ guides, title = "Choose what to learn next." }: RelatedGuidesProps) {
  return (
    <section className="more-guides article-shell" aria-labelledby="related-guides-title">
      <header className="more-guides__header">
        <h2 id="related-guides-title">{title}</h2>
      </header>
      <div className="more-guides__grid">
        {guides.map((guide) => <GuideCard guide={guide} key={guide.slug} />)}
      </div>
    </section>
  );
}
