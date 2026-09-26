export function relatedGuideHref(slug: string): string {
  return process.env.NODE_ENV === "development"
    ? `/guides/${slug}/?review=1`
    : `/guides/${slug}.html`;
}
