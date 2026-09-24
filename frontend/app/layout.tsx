import type { Metadata, Viewport } from "next";
import { Funnel_Display, Funnel_Sans } from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
import { siteConfig } from "@/content/site";
import { createEventJsonLd, createSiteMetadata } from "@/lib/seo";
import "./globals.css";

const funnelDisplay = Funnel_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-funnel-display",
  display: "swap",
});

const funnelSans = Funnel_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-funnel-sans",
  display: "swap",
});

export const metadata: Metadata = createSiteMetadata();

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = createEventJsonLd();

  return (
    <html lang={siteConfig.language} className={`${funnelDisplay.variable} ${funnelSans.variable}`}>
      <body className="font-sans antialiased">
        <SmoothScroll />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
