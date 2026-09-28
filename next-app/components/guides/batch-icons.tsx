export type BatchIconName =
  | "notes" | "doc" | "mail" | "check" | "lock" | "chat" | "folder" | "shield" | "key" | "plug"
  | "eye" | "compress" | "sparkle" | "alert" | "compass" | "upload" | "bolt" | "power" | "question"
  | "target" | "settings" | "gift" | "list" | "clock" | "user";

const paths: Record<BatchIconName, string> = {
  notes: "M6 3h9l4 4v14H6z M15 3v4h4 M9 11h7 M9 15h7 M9 19h4",
  doc: "M6 3h9l4 4v14H6z M15 3v4h4 M9 12h7 M9 16h5",
  mail: "M3 6h18v12H3z M3 7l9 6 9-6",
  check: "M4 12.5 9.5 18 20 6",
  lock: "M6 11h12v10H6z M8.5 11V8a3.5 3.5 0 0 1 7 0v3 M12 15v2",
  chat: "M4 5h16v11H9l-5 4z M8 10h8 M8 13h5",
  folder: "M3 6h7l2 2h9v11H3z M3 11h18",
  shield: "M12 3 20 6v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z M8.5 12l2.5 2.5 4.5-5",
  key: "M14.5 9.5a4.5 4.5 0 1 1-1.3-3.2 M13 11l8 8 M18 16l2-2 M16 14l2-2",
  plug: "M9 3v5 M15 3v5 M6 8h12v3a6 6 0 0 1-12 0z M12 17v4",
  eye: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  compress: "M4 9h16 M4 15h16 M12 3v4 M9.5 5 12 7.5 14.5 5 M12 21v-4 M9.5 19l2.5-2.5 2.5 2.5",
  sparkle: "M12 3l2 5.5L19.5 10 14 12l-2 5.5L10 12 4.5 10 10 8.5z M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z",
  alert: "M12 3 22 20H2z M12 9v5 M12 17v.5",
  compass: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M15.5 8.5l-2 5-5 2 2-5z",
  upload: "M12 16V4 M7 9l5-5 5 5 M4 16v4h16v-4",
  bolt: "M13 2 4 14h7l-1 8 9-12h-7z",
  power: "M12 3v8 M7.5 6.5a7 7 0 1 0 9 0",
  question: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6 M12 17v.5",
  target: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M12 12.5v-1",
  settings: "M4 6h16 M4 12h16 M4 18h16 M8 3v6 M16 9v6 M10 15v6",
  gift: "M4 10h16v11H4z M3 7h18v3H3z M12 7v14 M12 7C10 3 6 4 7.5 7 M12 7c2-4 6-3 4.5 0",
  list: "M9 6h11 M9 12h11 M9 18h11 M4 6h1 M4 12h1 M4 18h1",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M12 7v5l3 2",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4 21a8 8 0 0 1 16 0",
};

export function BatchIcon({ name, size = 22 }: { name: BatchIconName; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d={paths[name]} /></svg>;
}
