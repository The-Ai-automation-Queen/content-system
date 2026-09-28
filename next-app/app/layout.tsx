import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteHeader } from "@/components/chrome/site-header";
import { SiteFooter } from "@/components/chrome/site-footer";
import Script from "next/script";
import "./globals.css";

const display = localFont({ src: [
  { path: "../public/fonts/playfair-display-latin.woff2", weight: "400 900", style: "normal" },
  { path: "../public/fonts/playfair-display-italic-latin.woff2", weight: "400 900", style: "italic" },
], variable: "--font-display", display: "swap" });
const body = localFont({ src: "../public/fonts/source-serif-4-latin.woff2", weight: "200 900", variable: "--font-body", display: "swap" });
const ui = localFont({ src: "../public/fonts/inter-latin.woff2", weight: "100 900", variable: "--font-ui", display: "swap" });
const mono = localFont({ src: [
  { path: "../public/fonts/space-mono-regular-latin.woff2", weight: "400" },
  { path: "../public/fonts/space-mono-bold-latin.woff2", weight: "700" },
], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.shiftandlead.com"),
  title: { default: "Shift & Lead", template: "%s · Shift & Lead" },
  description: "Practical AI guidance for ambitious professionals.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${ui.variable} ${mono.variable}`}>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        <Script src="/assets/events.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
