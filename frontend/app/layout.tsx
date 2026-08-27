import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { siteConfig } from "@/content/site";
import { createEventJsonLd, createSiteMetadata } from "@/lib/seo";
import "./globals.css";

const googleSansFlex = localFont({
  src: "./fonts/google-sans-flex/GoogleSansFlex-Latin-wght.woff2",
  variable: "--font-google-sans-flex",
  display: "swap",
  // Declaring the variable font's weight range is what lets the browser drive
  // the wght axis. Without it the @font-face defaults to 400 and the browser
  // synthesises bold for the heavy headings instead of using the real weights.
  weight: "1 1000",
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
    <html lang={siteConfig.language} className={googleSansFlex.variable}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
