import type { Metadata } from "next";
import { Inter, Playfair_Display, Source_Serif_4, Space_Mono } from "next/font/google";
import { SiteHeader } from "@/components/chrome/site-header";
import "./globals.css";

const display = Playfair_Display({ subsets: ["latin"], variable: "--font-display" });
const body = Source_Serif_4({ subsets: ["latin"], variable: "--font-body" });
const ui = Inter({ subsets: ["latin"], variable: "--font-ui" });
const mono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-mono" });

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
      </body>
    </html>
  );
}
