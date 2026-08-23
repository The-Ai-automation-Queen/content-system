import Image from "next/image";
import Link from "next/link";
import type { Guide } from "@/content/guides";

export function GuideCard({ guide, featured = false }: { guide: Guide; featured?: boolean }) {
  return (
    <Link className={`guide-card${featured ? " guide-card--featured" : ""}`} href={`/guides/${guide.slug}.html`}>
      <div className="guide-card__art">
        <Image
          src={guide.cover}
          alt=""
          fill
          sizes={featured ? "(max-width: 760px) 100vw, 62vw" : "(max-width: 760px) 100vw, 33vw"}
          className="guide-card__image"
          priority={featured}
        />
      </div>
      <div className="guide-card__body">
        <h2>{guide.title}</h2>
        {guide.summary && <p>{guide.summary}</p>}
        <span className="guide-card__link">Start the guide <span aria-hidden="true">→</span></span>
      </div>
    </Link>
  );
}
