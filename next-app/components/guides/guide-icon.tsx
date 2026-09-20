export function cleanLabel(text: string) {
  return text.replace(/[\p{Extended_Pictographic}\uFE0F\u20E3]/gu, "").replace(/^#\s*/, "").trim();
}
export function GuideIcon({ name = "book" }: { name?: "book" | "check" | "search" | "route" | "prompt" | "alert" | "image" | "settings" }) {
  const paths = {
    book: "M4 4h6a3 3 0 0 1 3 3v14a4 4 0 0 0-4-2H4z M13 7a3 3 0 0 1 3-3h5v15h-4a4 4 0 0 0-4 2",
    check: "m5 12 4 4L19 6", search: "M15 15l6 6 M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0",
    route: "M5 4v12a4 4 0 0 0 4 4h10 M5 9h10a4 4 0 0 0 4-4 M16 17l3 3-3 3 M16 2l3 3-3 3",
    prompt: "m4 6 6 6-6 6 M13 18h7", alert: "m12 3 10 18H2z M12 9v5 M12 17v1",
    image: "M3 3h18v18H3z M3 17l6-6 4 4 3-3 5 5 M7 7h1", settings: "M4 6h16 M4 12h16 M4 18h16 M8 3v6 M16 9v6 M10 15v6",
  };
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{flexShrink:0,verticalAlign:"middle"}}><path d={paths[name]} /></svg>;
}
