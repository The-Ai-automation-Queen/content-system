import type { Metadata } from "next";
import { Inter, Playfair_Display, Source_Serif_4, Space_Mono } from "next/font/google";
import "./globals.css";

const display = Playfair_Display({ variable: "--font-display", subsets: ["latin"], weight: ["400", "700"], style: ["normal", "italic"] });
const body = Source_Serif_4({ variable: "--font-body", subsets: ["latin"] });
const ui = Inter({ variable: "--font-ui", subsets: ["latin"] });
const mono = Space_Mono({ variable: "--font-mono", subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "AI Twin Studio | Shift & Lead",
  description: "Build an AI twin that turns your voice, expertise, and presence into a system—so your business keeps moving without more hours from you.",
  icons: { icon: [{ url: "/favicon.ico", sizes: "32x32" }, { url: "/favicon-32.png", type: "image/png", sizes: "32x32" }], apple: "/apple-touch-icon.png" },
  openGraph: { title: "AI Twin Studio | Shift & Lead", description: "Build once. Show up everywhere.", images: [{ url: "/og-v2.png", width: 1200, height: 630, alt: "Shift & Lead AI Twin Studio" }] },
  twitter: { card: "summary_large_image", title: "AI Twin Studio | Shift & Lead", description: "Build once. Show up everywhere.", images: ["/og-v2.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${display.variable} ${body.variable} ${ui.variable} ${mono.variable}`}>{children}</body></html>;
}
