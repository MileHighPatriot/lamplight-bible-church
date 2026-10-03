import type { Metadata, Viewport } from "next";
import { Figtree, Newsreader } from "next/font/google";
import { ViewTransition } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import JsonLd from "@/components/JsonLd";
import MobileBar from "@/components/MobileBar";
import SnowBanner from "@/components/SnowBanner";
import { site } from "@/data/site";
import { asset } from "@/lib/asset";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  style: ["normal", "italic"],
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#141729",
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Greenwood Village, Colorado`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  icons: { icon: { url: asset("/icon.svg"), type: "image/svg+xml" } },
  openGraph: {
    title: site.name,
    description: site.description,
    locale: site.locale,
    type: "website",
    siteName: site.name,
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${newsreader.variable} ${figtree.variable} h-full antialiased`}>
      <body className="min-h-full bg-parchment font-sans text-ink">
        <JsonLd />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <aside aria-label="Concept project notice" className="border-b border-line bg-sage-soft text-ink">
          <p className="wrap py-2 text-sm leading-5 text-pretty">
            Concept project: a sample site built by 5280 Web Solutions. Lamplight Bible Church is not a real church.{" "}
            <a href="https://5280webs.com" className="font-semibold whitespace-nowrap text-night underline underline-offset-4 hover:text-ember">
              See more at 5280webs.com
            </a>
          </p>
        </aside>
        <SnowBanner />
        <Header />
        <ViewTransition>
          <main id="main">{children}</main>
        </ViewTransition>
        <Footer />
        <MobileBar />
      </body>
    </html>
  );
}
