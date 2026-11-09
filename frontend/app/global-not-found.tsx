import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { getCopy } from "@/lib/i18n/server";
import "./(prod)/globals.css";

// With two root layouts (the live site and /harry) there is no single layout
// to compose a 404 from, so unmatched URLs render this page on its own: the
// production 404, with the production styles and font.
const googleSansFlex = localFont({
  src: "./fonts/google-sans-flex/GoogleSansFlex-Latin-wght.woff2",
  variable: "--font-google-sans-flex",
  display: "swap",
  weight: "1 1000",
});

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getCopy();
  return { title: t.meta.notFoundTitle };
}

export default async function GlobalNotFound() {
  const { t } = await getCopy();

  return (
    <html lang={t.htmlLang} className={googleSansFlex.variable}>
      <body className="font-sans antialiased">
        <div className="flex min-h-screen flex-col bg-white text-black">
          <main className="flex flex-1 flex-col items-center justify-center px-8 py-20 text-center sm:px-14">
            <p className="m-0 text-[13px] font-semibold uppercase tracking-[0.2em] text-htp-blue">
              {t.notFound.code}
            </p>
            <h1 className="m-0 mt-8 text-[clamp(72px,14vw,160px)] font-black leading-none tracking-[-0.04em]">
              404
            </h1>
            <h2 className="m-0 mt-8 max-w-[640px] text-[clamp(28px,3.5vw,44px)] font-extrabold leading-[1.08] tracking-[-0.02em]">
              {t.notFound.heading}
            </h2>
            <p className="m-0 mt-5 max-w-[420px] text-[clamp(16px,1.4vw,18px)] leading-relaxed text-[#444]">
              {t.notFound.body}
            </p>
            <Link
              href="/"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-black px-10 py-[18px] text-[17px] font-bold tracking-[0.02em] text-white transition-colors hover:bg-htp-blue hover:text-black hover:opacity-100"
            >
              {t.notFound.back} <span aria-hidden>→</span>
            </Link>
          </main>

          <footer className="flex w-full flex-wrap items-center justify-between gap-4 border-t border-[#eee] px-8 pb-9 pt-7 text-[13px] font-medium tracking-[0.06em] sm:px-14">
            <Image
              src="/images/logo/png/hack-the-path-01.png"
              alt="Hack The Path"
              width={3128}
              height={637}
              className="h-[22px] w-auto"
            />
            <Link href="/" className="text-[#666] hover:text-black">
              hackthepath.com.br
            </Link>
          </footer>
        </div>
      </body>
    </html>
  );
}
