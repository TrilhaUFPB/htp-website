import Image from "next/image";
import Link from "next/link";

import { Aperture } from "@/components/aperture";
import { HomeFaq } from "@/components/home/faq";
import { Story } from "@/components/home/story";
import { HomeSponsors } from "@/components/home/sponsors";
import styles from "@/components/home/home.module.css";
import { LanguageSwitch } from "@/components/language-switch";
import { NotifySignup } from "@/components/notify-signup";
import { ScrollEffects } from "@/components/scroll-effects";
import { HeroOpen } from "@/components/home/hero-open";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ScrollHeader } from "@/components/scroll-header";
import { ScrollHero } from "@/components/scroll-hero";
import { SectionTracker } from "@/components/section-tracker";
import { copy } from "@/content/copy";
import { getCopy } from "@/lib/i18n/server";
import { createFaqJsonLd } from "@/lib/seo";

const G = "/images/brand/grafismos";

export default async function Home() {
  const { locale, t } = await getCopy();
  const faqJsonLd = createFaqJsonLd(locale);

  return (
    <div className={`flex min-h-screen flex-col ${styles.page}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <a className="skip-link" href="#conteudo">
        {t.common.skipToContent}
      </a>

      <ScrollHeader>
        <div className="header-inner">
          <Link href="/" aria-label={t.common.homeAria} className="brand">
            <Image
              src="/images/logo/svg/hack-the-path-02.svg"
              alt="Hack The Path"
              width={1564}
              height={318}
              priority
            />
          </Link>
          <div className="header-end">
            <nav aria-label={t.common.navAria}>
              <a href="#evento">{t.nav.about}</a>
              <a href="#quando">{t.nav.when}</a>
              <a href="#patrocinadores">{t.nav.sponsors}</a>
              <a href="#faq">{t.nav.faq}</a>
            </nav>
            <LanguageSwitch />
          </div>
        </div>
      </ScrollHeader>

      <main id="conteudo" className="flex flex-col">
        <ScrollEffects />
        <HeroOpen />
        <SmoothScroll />
        <SectionTracker />

        <ScrollHero>
          <div className="hero-frame">
            <div className="hero-art">
              <Aperture />
            </div>
            <div className="hero-copy">
              <h1 id="hero-title" className="hero-title">
                {t.hero.lead}
                <br />
                <strong>
                  {t.hero.strong} <span className="hero-title-break">{t.hero.strongBreak}</span>
                </strong>
              </h1>
              <NotifySignup variant="hero" />
            </div>
          </div>
        </ScrollHero>

        {/* A HISTÓRIA — the whole event told by one system of squares */}
        <Story id="evento" locale={locale} />

        {/* QUANDO E ONDE — one line, like the stub of a ticket */}
        <section id="quando" className={styles.ticketSection}>
          <dl className={`${styles.wrap} ${styles.ticket}`}>
            <div>
              <dt>{t.when.eyebrow}</dt>
              <dd>
                {t.when.dateLine1} {t.when.dateLine2} 20{t.when.dateYear}
              </dd>
            </div>
            <div>
              <dt>{t.when.where}</dt>
              <dd>{t.meta.locationName}</dd>
              <dd className={styles.ticketNote}>{t.when.venuePending}</dd>
            </div>
            <div>
              <dt>{locale === "pt" ? "Participantes" : "Participants"}</dt>
              <dd>
                <span data-count={200} data-prefix="+">
                  +200
                </span>{" "}
                · 100
              </dd>
              <dd className={styles.ticketNote}>
                {locale === "pt" ? "Dia 01 · Dia 02" : "Day 01 · Day 02"}
              </dd>
            </div>
            <div>
              <dt>{locale === "pt" ? "Custo" : "Cost"}</dt>
              <dd className={styles.ticketBlue}>{t.stats[3].label}</dd>
            </div>
          </dl>
        </section>

        {/* QUEM ORGANIZA — told in four quadrants, read left to right: Hack
            The Path, the path climbing, Trilha, the next step. One line under. */}
        <section id="organizacao" className={styles.section} aria-label={t.organizer.a11y}>
          <div className={styles.wrap}>
            <ol className={styles.quads} aria-hidden="true">
              <li data-reveal className={styles.quad} data-tone="blue">
                <Image src="/images/logo/svg/hack-the-path-03.svg" alt="" width={1564} height={585} className={styles.quadWordmark} />
              </li>
              <li data-reveal={140} className={styles.quad}>
                <Image src={`${G}/escada-azul-preto.svg`} alt="" width={300} height={300} className={styles.quadArt} />
              </li>
              <li data-reveal={280} className={styles.quad} data-tone="white">
                <Image src="/images/logo/trilha.svg" alt="" width={190} height={133} className={styles.quadTrilha} />
              </li>
              <li data-reveal={420} className={styles.quad}>
                <Image src={`${G}/seta-preto-azul.svg`} alt="" width={300} height={300} className={styles.quadArt} />
              </li>
            </ol>
            <div className={styles.quadsCaption}>
              <p>
                {t.organizer.captionLead} <strong>Trilha</strong>, {t.organizer.captionRest}
              </p>
              <a href="https://www.otrilha.com" target="_blank" rel="noopener noreferrer" className={styles.textLink}>
                {t.organizer.link}
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        {/* PATROCÍNIO */}
        <section id="patrocinadores" className={`${styles.section} ${styles.sponsorsSection}`}>
          <div className={styles.wrap}>
            <HomeSponsors />
            <a
              href="https://www.instagram.com/hackthepath/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.textLink}
              data-reveal
            >
              {t.sponsors.cta.replace(/\s*→$/, "")}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className={styles.section}>
          <div className={`${styles.wrap} ${styles.faqGrid}`}>
            <h2 className={`${styles.gesture} ${styles.faqTitle}`}>
              <span>{t.faq.headingLine1}</span> <strong>{t.faq.headingLine2}</strong>
            </h2>
            <HomeFaq canonicalQuestions={copy.pt.faq.items.map((item) => item.question)} />
          </div>
        </section>

        {/* CTA — copy on black beside one quadrant: the arrow, the brand's sign for "next step" */}
        <section id="inscricao" className={styles.section}>
          <div className={`${styles.wrap} ${styles.cta}`}>
            <div className={styles.ctaCopy}>
              <p data-reveal className={styles.boxLabel}>
                {t.cta.eyebrow}
              </p>
              <h2 data-reveal={80} className={`${styles.gesture} ${styles.ctaHeading}`}>
                <span>{t.cta.heading.split(" ").slice(0, -1).join(" ")}</span>{" "}
                <strong>{t.cta.heading.split(" ").slice(-1)}</strong>
              </h2>
              <p data-reveal={160} className={styles.ctaBody}>
                {t.cta.body}
              </p>
              <div data-reveal={240}>
                <NotifySignup variant="cta" />
              </div>
            </div>
            <div data-reveal={120} className={styles.ctaTile} aria-hidden="true">
              <Image width={300} height={300} src={`${G}/seta-preto-azul.svg`} alt="" />
            </div>
          </div>
        </section>

        <footer className={styles.footer}>
          <div className={`${styles.wrap} ${styles.footerRow}`}>
            <Image width={1564} height={318} src="/images/logo/svg/hack-the-path-01.svg" alt="Hack The Path" className={styles.footerLogo} />
            <nav className={styles.footerLinks} aria-label="Hack The Path">
              <a href="https://www.instagram.com/hackthepath/" target="_blank" rel="noopener noreferrer">
                {t.footer.instagram}
              </a>
              <Link href="/privacidade">{t.meta.privacyTitle}</Link>
            </nav>
          </div>
        </footer>
      </main>
    </div>
  );
}
