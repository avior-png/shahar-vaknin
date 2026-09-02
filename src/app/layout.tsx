import type { Metadata } from "next";
import { Secular_One, Assistant, IBM_Plex_Mono, Noto_Serif_SC } from "next/font/google";
import { site } from "@/content/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RevealScript from "@/components/RevealScript";
import "./globals.css";

const secular = Secular_One({
  variable: "--font-secular",
  subsets: ["hebrew", "latin"],
  weight: "400",
  display: "swap",
});

const assistant = Assistant({
  variable: "--font-assistant",
  subsets: ["hebrew", "latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const plex = IBM_Plex_Mono({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

/** לכיתוב הסיני בהירו — הוכחה, לא קישוט. */
const zh = Noto_Serif_SC({
  variable: "--font-zh",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${secular.variable} ${assistant.variable} ${plex.variable} ${zh.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-ground text-txt">
        <RevealScript />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:right-3 focus:z-50 focus:bg-paper focus:px-4 focus:py-2 focus:font-bold focus:text-ink"
        >
          דילוג לתוכן הראשי
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
