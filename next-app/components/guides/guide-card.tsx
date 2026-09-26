import Image from "next/image";
import type { Guide } from "@/content/guides";
import { guideHref } from "@/content/guide-url";

export function GuideCard({ guide, featured = false, reviewMode = false }: { guide: Guide; featured?: boolean; reviewMode?: boolean }) {
  const underReview = guide.slug === "instagram-content-dashboard";
  return (
    <a
      className={`guide-card${featured ? " guide-card--featured" : ""}`}
      href={guideHref(guide.slug, reviewMode)}
      aria-label={`${underReview ? "Read technical update for" : "Open guide:"} ${guide.title}`}
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
        <span className="guide-card__level">{underReview ? "Under review" : guide.level}</span>
      </div>
      <div className="guide-card__body">
        <h2>{guide.title}</h2>
        <p>{underReview ? "The former Meta API setup has been retired. Read the technical update and try a safe first decision while the walkthrough is rebuilt." : guide.summary}</p>
        <span className="guide-card__link">{underReview ? "Read update" : "Open guide"} <span aria-hidden="true">→</span></span>
      </div>
    </a>
  );
}
