import Image from "next/image";
import type { Guide } from "@/content/guides";

export function GuideCard({ guide, featured = false, reviewMode = false }: { guide: Guide; featured?: boolean; reviewMode?: boolean }) {
  return (
    <a
      className={`guide-card${featured ? " guide-card--featured" : ""}`}
      href={reviewMode ? `/guides/${guide.slug}/?review=1` : `/guides/${guide.slug}.html`}
      aria-label={`Open guide: ${guide.title}`}
    >
      <div className="guide-card__art">
        <Image
          src={guide.cover}
          alt=""
          fill
          sizes={featured ? "(max-width: 760px) 100vw, 54vw" : "(max-width: 760px) 100vw, (max-width: 980px) 50vw, 33vw"}
          className="guide-card__image"
          priority={featured}
        />
        <span className="guide-card__level">{guide.level}</span>
      </div>
      <div className="guide-card__body">
        <h2>{guide.title}</h2>
        <p>{guide.summary}</p>
        <span className="guide-card__link">Open guide <span aria-hidden="true">→</span></span>
      </div>
    </a>
  );
}
