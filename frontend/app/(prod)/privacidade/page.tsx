import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { privacyConfig } from "@/content/privacy";
import { siteConfig } from "@/content/site";
import { getCopy } from "@/lib/i18n/server";

const fill = (text: string, values: Record<string, string | number>) =>
  text.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getCopy();

  return {
    title: t.meta.privacyTitle,
    description: fill(t.meta.privacyDescription, { name: siteConfig.name }),
    alternates: {
      canonical: "/privacidade",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function PrivacyPage() {
  const { t } = await getCopy();
  const p = t.privacy;
  const values = {
    name: siteConfig.name,
    controller: privacyConfig.controllerName,
    months: privacyConfig.dataRetentionMonthsAfterEvent,
  };

  return (
    <div className="flex min-h-screen flex-col bg-white text-black">
      <main className="mx-auto flex w-full max-w-[720px] flex-1 flex-col px-8 py-16 sm:px-14">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#666] transition-colors hover:text-black"
        >
          {p.back}
        </Link>

        <h1 className="m-0 text-[clamp(36px,5vw,48px)] font-extrabold leading-[1.05] tracking-[-0.02em]">
          {p.title}
        </h1>
        <p className="m-0 mt-4 text-base leading-relaxed text-[#444]">
          {fill(p.intro, values)}
        </p>

        <div className="mt-10 flex flex-col gap-8 text-base leading-relaxed text-[#333]">
          <section className="flex flex-col gap-3">
            <h2 className="m-0 text-xl font-bold text-black">{p.sections.controller.title}</h2>
            <p className="m-0">
              {fill(p.sections.controller.body, values)}{" "}
              <a
                href={`mailto:${privacyConfig.controllerEmail}`}
                className="font-semibold text-black underline decoration-htp-blue underline-offset-4"
              >
                {privacyConfig.controllerEmail}
              </a>
              .
            </p>
          </section>

          {(["purpose", "legalBasis", "data", "metrics", "retention", "rights", "language"] as const).map(
            (key) => (
              <section key={key} className="flex flex-col gap-3">
                <h2 className="m-0 text-xl font-bold text-black">{p.sections[key].title}</h2>
                <p className="m-0">{fill(p.sections[key].body, values)}</p>
              </section>
            ),
          )}
        </div>
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
  );
}
