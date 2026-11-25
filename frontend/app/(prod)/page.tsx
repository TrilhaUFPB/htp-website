import Image from "next/image";
import Link from "next/link";

import { Aperture } from "@/components/aperture";
import { HomeFaq } from "@/components/home/faq";
import { Story } from "@/components/home/story";
import { DarkReveal } from "@/components/home/dark-reveal";
import { HomeSponsors } from "@/components/home/sponsors";
import styles from "@/components/home/home.module.css";
import { LanguageSwitch } from "@/components/language-switch";
import { NotifySignup } from "@/components/notify-signup";
import { ScrollEffects } from "@/components/scroll-effects";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ScrollHeader } from "@/components/scroll-header";
import { ScrollHero } from "@/components/scroll-hero";
import { SectionTracker } from "@/components/section-tracker";
import { copy } from "@/content/copy";
import { getCopy } from "@/lib/i18n/server";
import { createFaqJsonLd } from "@/lib/seo";

const G = "/images/brand/grafismos";

// Competição climbs, Conexão is many H's together, Experiência is the sphere.
const FEATURE_ICONS = [`${G}/seta-preto-azul.svg`, `${G}/trama-azul-preto.svg`, `${G}/esfera-preto-azul.svg`];
const STAT_TONES = ["blue", "white", "grey", "white"] as const;

function CalendarIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
      <path d="M3 2h2V1h1v1h4V1h1v1h2v12H3V2Zm1 4v7h8V6H4Z" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
      <path d="M5 2h6v6H5V2Zm-2 8h10v4H3v-4Z" />
    </svg>
  );
}

// February 2027 starts on a Monday; the event is Saturday 20 and Sunday 21.
const FEB_2027 = Array.from({ length: 28 }, (_, i) => i + 1);
const EVENT_DAYS = new Set([20, 21]);

function SectionHead({ index, label }: { index: string; label: string }) {
  return (
    <p className={styles.sectionHead}>
      <span className={styles.chip}>{index}</span>
      {label}
    </p>
  );
}

export default async function Home() {
  const { locale, t } = await getCopy();
  const faqJsonLd = createFaqJsonLd(locale);
  const weekdays =
    locale === "pt" ? ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"] : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const month = locale === "pt" ? "Fevereiro" : "February";

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
              <a href="#patrocinadores">{t.nav.sponsors}</a>
              <a href="#evento">{t.nav.about}</a>
              <a href="#programacao">{t.nav.schedule}</a>
              <a href="#quando">{t.nav.when}</a>
              <a href="#faq">{t.nav.faq}</a>
            </nav>
            <LanguageSwitch />
          </div>
        </div>
      </ScrollHeader>

      <main id="conteudo" className="flex flex-col">
        <ScrollEffects />
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

        {/* A HISTÓRIA — one system of squares told by scroll */}
        <Story locale={locale} tone="light" />

        <DarkReveal>
          {/* PATROCÍNIO */}
          <section id="patrocinadores" className={`${styles.section} ${styles.sponsorsSection}`}>
            <div className={styles.wrap}>
              <HomeSponsors />
              <a
                href="https://www.instagram.com/hackthepath/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.textLink}
                data-fill
              >
                {t.sponsors.cta.replace(/\s*→$/, "")}
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </section>

          {/* The mosaic from the manual's graphics page, read as one object. */}
            <div className={styles.mosaic} aria-hidden="true">
              <div className={styles.tile} style={{ background: "#7a94fd" }}>
                <Image width={300} height={300} src={`${G}/esfera-preto-azul.svg`} alt="" />
              </div>
              <div className={`${styles.tile} ${styles.tileGrey}`}>
                <svg viewBox="0 0 300 300">
                  <polygon points="104.11 68.67 67.35 68.67 67.35 231.33 104.11 231.33 104.11 182.94 150 182.94 150 150 104.11 150 104.11 68.67" />
                  <polygon points="195.89 68.67 195.89 117.06 150 117.06 150 150 195.89 150 195.89 231.33 232.65 231.33 232.65 68.67 195.89 68.67" />
                </svg>
              </div>
              <div className={styles.tile}>
                <Image width={300} height={300} src={`${G}/seta-azul-branco.svg`} alt="" />
              </div>
              <div className={`${styles.tile} ${styles.tileGrey1}`}>
                <Image width={1567} height={602}
                  className={styles.htpChip}
                  src="/images/logo/svg/htp-bloco-azul-preto.svg"
                  alt=""
                />
              </div>
              <div className={`${styles.tile} ${styles.tileWide}`}>
                <Image width={300} height={300} src={`${G}/estrela-preto-branco.svg`} alt="" />
              </div>
            </div>

          {/* SOBRE */}
          <section id="evento" className={styles.section}>
            <div className={styles.wrap}>
              <SectionHead index="01" label={t.nav.about} />
              <div className={styles.split}>
                <h2 data-reveal className={styles.display}>
                  Hack The Path
                </h2>
                <p data-reveal={100} className={styles.lede}>
                  {t.about.paragraph}
                </p>
              </div>
            </div>

              <div className={styles.wrap}>
              <ol className={styles.features}>
                {t.about.features.map((feature, index) => (
                  <li key={index} data-reveal={index * 80}>
                    <Image width={300} height={300} className={styles.featureIcon} src={FEATURE_ICONS[index]} alt="" aria-hidden="true" />
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* PROGRAMAÇÃO — the ticket banner from the manual's applications page */}
          <section id="programacao" className={styles.section}>
            <div className={styles.wrap}>
              <SectionHead index="02" label={t.schedule.eyebrow} />
              <h2 data-reveal className={styles.heading}>
                {t.schedule.headingLine1}
                <br />
                <span className={styles.muted}>{t.schedule.headingLine2}</span>
              </h2>

              <div className={styles.days}>
                {t.schedule.days.map((day, index) => (
                  <article
                    key={day.number}
                    data-reveal
                    className={styles.day}
                    data-scheme={index === 0 ? "light" : "blue"}
                  >
                    <div className={styles.dayCopy}>
                      <div className={styles.dayTop}>
                        <span className={styles.dayKicker}>{locale === "pt" ? "Dia" : "Day"}</span>
                        <span className={styles.dayNumber}>{day.number}</span>
                      </div>
                      <h3 className={styles.dayTitle}>{day.title}</h3>
                      <p className={styles.dayBody}>{day.description}</p>
                      <ul className={styles.facts}>
                        <li>
                          <span className={styles.factIcon} aria-hidden="true">
                            <CalendarIcon />
                          </span>
                          <span className={styles.factText}>{day.date} 2027</span>
                        </li>
                        <li>
                          <span className={styles.factIcon} aria-hidden="true">
                            <PersonIcon />
                          </span>
                          <span className={styles.factText}>
                            {day.access} ·{" "}
                            {day.count > 0 ? (
                              <>
                                <span data-count={day.count}>0</span> {day.participants}
                              </>
                            ) : (
                              day.participants
                            )}
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className={styles.dayArt} aria-hidden="true">
                      <Image width={300} height={300} src={index === 0 ? `${G}/caleidoscopio-branco-azul.svg` : `${G}/caleidoscopio-azul-preto.svg`} alt="" />
                      <Image width={1567} height={602}
                        className={styles.dayLockup}
                        src={
                          index === 0
                            ? "/images/logo/svg/htp-bloco-azul-preto.svg"
                            : "/images/logo/svg/htp-bloco-azul-preto.svg"
                        }
                        alt=""
                      />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* NÚMEROS — the mosaic again, carrying numbers */}
          <section id="numeros" aria-label={locale === "pt" ? "Números" : "Numbers"}>
            <dl className={styles.statTiles}>
              {t.stats.map((stat, index) => (
                <div key={index} className={styles.statTile} data-tone={STAT_TONES[index]}>
                  <dd>
                    <span data-count={stat.count} data-prefix={stat.prefix} data-suffix={stat.suffix}>
                      0
                    </span>
                  </dd>
                  <dt>{stat.label}</dt>
                </div>
              ))}
              <div className={`${styles.statTile} ${styles.statArt}`} aria-hidden="true">
                <Image width={300} height={300} src={`${G}/colunas-azul-preto.svg`} alt="" />
              </div>
              <div className={`${styles.statTile} ${styles.statArt}`} aria-hidden="true">
                <Image width={300} height={300} src={`${G}/escada-azul-preto.svg`} alt="" />
              </div>
            </dl>
          </section>

          {/* QUANDO E ONDE */}
          <section id="quando" className={styles.section}>
            <div className={styles.wrap}>
              <SectionHead index="03" label={t.nav.when} />
              <div className={styles.whenGrid}>
                <div data-reveal className={styles.whenPanel} data-tone="blue">
                  <p className={styles.panelLabel}>{t.when.eyebrow}</p>
                  <p className={styles.whenDate}>
                    {t.when.dateLine1} {t.when.dateLine2}
                    <br />
                    2027
                  </p>
                  <div className={styles.calendar}>
                    <p className={styles.calendarMonth}>
                      {month} <span>2027</span>
                    </p>
                    <div className={styles.calendarGrid}>
                      {weekdays.map((d) => (
                        <span key={d} className={styles.weekday}>
                          {d}
                        </span>
                      ))}
                      {FEB_2027.map((d) => (
                        <span key={d} className={EVENT_DAYS.has(d) ? styles.eventDay : undefined}>
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div data-reveal={120} className={styles.whenPanel} data-tone="grey">
                  <p className={styles.panelLabel}>{t.when.where}</p>
                  <p className={styles.whenDate}>{t.meta.locationName}</p>
                  <p className={styles.whenNote}>{t.when.venuePending}</p>
                  <dl className={styles.coords}>
                    <div>
                      <dt>{locale === "pt" ? "Cidade" : "City"}</dt>
                      <dd>João Pessoa · PB</dd>
                    </div>
                    <div>
                      <dt>{locale === "pt" ? "Coordenadas" : "Coordinates"}</dt>
                      <dd>7°07′S 34°52′W</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className={styles.section}>
            <div className={`${styles.wrap} ${styles.faqGrid}`}>
              <div className={styles.faqSide}>
                <SectionHead index="04" label={t.faq.eyebrow} />
                <h2 className={styles.heading}>
                  {t.faq.headingLine1}
                  <br />
                  {t.faq.headingLine2}
                </h2>
              </div>
              <HomeFaq canonicalQuestions={copy.pt.faq.items.map((item) => item.question)} />
            </div>
          </section>

          {/* CTA — the manual's cover: copy on black, the leque bleeding off the edge */}
          <section id="inscricao" className={styles.cta}>
            <div className={styles.ctaCopy}>
              <p data-reveal className={styles.panelLabel}>
                {t.cta.eyebrow}
              </p>
              <h2 data-reveal={80} className={styles.ctaHeading}>
                {t.cta.heading}
              </h2>
              <p data-reveal={160} className={styles.ctaBody}>
                {t.cta.body}
              </p>
              <div data-reveal={240}>
                <NotifySignup variant="cta" />
              </div>
            </div>
            <div className={styles.ctaArt} aria-hidden="true">
              <Image width={300} height={300} src={`${G}/leque-azul-preto.svg`} alt="" />
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
        </DarkReveal>
      </main>
    </div>
  );
}
