/** Guide links use the public clean URL in development, previews and production. */
export function guideHref(slug: string, review = false): string {
  const path = `/guides/${slug}/`;
  return review ? `${path}?review=1` : path;
}
