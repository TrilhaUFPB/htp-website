import Image from "next/image";
import Link from "next/link";
import { Aperture } from "@/components/aperture";
import { DiaGlow } from "@/components/dia-glow";
import { FaqSection } from "@/components/faq";
import { NotifySignup } from "@/components/notify-signup";
import { ScrollEffects } from "@/components/scroll-effects";
import { ScrollHeader } from "@/components/scroll-header";
import { ScrollHero } from "@/components/scroll-hero";
import { SiteFooter } from "@/components/site-footer";
import { Sponsors } from "@/components/sponsors";
import { TiltCard } from "@/components/tilt-card";
import { scheduleDays } from "@/content/schedule";
import { stats } from "@/content/stats";
import { createFaqJsonLd } from "@/lib/seo";

const EVENT_FEATURES = [
  {
    title: "Competição",
    description: "Projeto real, do zero ao pitch final, exposto a mais de 150 países.",
  },
  {
    title: "Conexão",
    description: "Mentores, jurados e empresas presentes durante todo o evento.",
  },
  {
    title: "Experiência",
    description: "Um evento pensado para mudar a forma como você pensa.",
  },
] as const;

export default function Home() {
  const faqJsonLd = createFaqJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>

      <ScrollHeader>
        <div className="header-inner">
          <Link href="/" aria-label="Hack The Path — início" className="brand">
            <Image
              src="/images/logo/svg/hack-the-path-02.svg"
              alt="Hack The Path"
              width={1564}
              height={318}
              priority
            />
          </Link>
          <nav aria-label="Navegação principal">
            <a href="#patrocinadores">Patrocinadores</a>
            <a href="#evento">Sobre</a>
            <a href="#programacao">Programação</a>
            <a href="#quando">Quando e onde</a>
            <a href="#faq">Dúvidas</a>
          </nav>
        </div>
      </ScrollHeader>

      <main id="conteudo" className="page-sheet">
        <ScrollEffects />

        <ScrollHero>
          <div className="hero-frame">
            <div className="hero-art">
              <Aperture />
            </div>

            <div className="hero-copy">
              <h1 id="hero-title" className="hero-title">
                O maior hackathon da história do Nordeste
              </h1>
              <NotifySignup variant="hero" />
            </div>

          </div>
        </ScrollHero>

        <section id="patrocinadores" className="section pt-14 sm:pt-20">
          <Sponsors />
        </section>

        {/* SOBRE */}
        <section id="evento" className="section py-24 sm:py-[clamp(120px,14vw,200px)]">
          <div className="wrap flex flex-col gap-16 sm:gap-28">
            <h2 className="m-0 font-display text-[clamp(56px,9vw,136px)] font-medium leading-[0.9] tracking-[-0.055em]">
              Hack The Path<span className="text-htp-blue">.</span>
            </h2>

            <div className="grid gap-12 sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] sm:gap-16">
              <p className="m-0 max-w-[36ch] text-[19px] leading-[1.55] text-[#3d3d3d] sm:text-[21px]">
                Dois dias de evento presencial. Hackathon, palestras, talks e conversas com
                empresas, o ambiente ideal para hackear sua própria trajetória até lugares que
                antes pareciam impossíveis.
              </p>
              <dl className="m-0 grid gap-0">
                {EVENT_FEATURES.map((feature) => (
                  <div
                    key={feature.title}
                    className="grid gap-2 border-t border-black/10 py-6 first:border-t-black sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-8"
                  >
                    <dt className="font-display text-[20px] font-medium tracking-[-0.02em]">
                      {feature.title}
                    </dt>
                    <dd className="m-0 text-[16px] leading-[1.55] text-[#5c5c5c]">
                      {feature.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* PROGRAMAÇÃO */}
        <section id="programacao" className="section pb-24 sm:pb-[clamp(120px,12vw,180px)]">
          <div className="wrap flex flex-col gap-10 sm:gap-14">
            <div className="flex flex-col gap-4">
              <p className="section-label">Programação</p>
              <h2 className="section-title">
                Dois dias.
                <br />
                Duas portas.
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 md:gap-5">
              {scheduleDays.map((day, index) => {
                const isDark = index === 1;
                return (
                  <TiltCard
                    key={day.number}
                    className={`day-card flex min-h-[460px] flex-col justify-between gap-10 rounded-[28px] p-7 sm:min-h-[560px] sm:p-10 ${
                      isDark ? "day-card-dark bg-black text-white" : "bg-white shadow-[inset_0_0_0_1px_rgba(0,0,0,0.14)]"
                    }`}
                  >
                    <DiaGlow className="day-glow" />

                    <div className="flex items-start justify-between gap-4">
                      <p className="m-0 font-display text-[clamp(64px,8vw,112px)] font-medium leading-[0.85] tracking-[-0.055em]">
                        {day.date}
                      </p>
                      <p
                        className={`m-0 pt-1 font-display text-[17px] font-medium tracking-[-0.01em] ${
                          isDark ? "text-htp-blue" : "text-[#5c5c5c]"
                        }`}
                      >
                        {day.number}
                      </p>
                    </div>

                    <div className="flex flex-col gap-4">
                      <h3 className="m-0 max-w-[18ch] font-display text-[clamp(26px,2.6vw,36px)] font-medium leading-[1.05] tracking-[-0.03em] text-balance">
                        {day.title}
                      </h3>
                      <p
                        className={`m-0 max-w-[40ch] text-[17px] leading-[1.55] ${
                          isDark ? "text-[#a3a3a3]" : "text-[#5c5c5c]"
                        }`}
                      >
                        {day.description}
                      </p>
                    </div>

                    <div
                      className={`flex flex-wrap items-center justify-between gap-3 border-t pt-5 text-[15px] ${
                        isDark ? "border-white/15" : "border-black/10"
                      }`}
                    >
                      <span className={isDark ? "text-htp-blue" : ""}>{day.access}</span>
                      <span className={isDark ? "text-[#a3a3a3]" : "text-[#5c5c5c]"}>
                        {day.count ? (
                          <>
                            <span data-count={day.count}>{day.count}</span> {day.participants}
                          </>
                        ) : (
                          day.participants
                        )}
                      </span>
                    </div>
                  </TiltCard>
                );
              })}
            </div>

            <dl className="m-0 grid grid-cols-2 gap-y-10 border-t border-black pt-8 sm:grid-cols-4 sm:pt-10">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse gap-2 pr-4">
                  <dt className="text-[15px] leading-snug text-[#5c5c5c]">{stat.label}</dt>
                  <dd
                    className={`m-0 font-display text-[clamp(44px,5.4vw,80px)] font-medium leading-none tracking-[-0.05em] tabular-nums ${
                      stat.accent ? "text-htp-blue" : ""
                    }`}
                  >
                    <span data-count={stat.count} data-prefix={stat.prefix} data-suffix={stat.suffix}>
                      {`${stat.prefix ?? ""}${stat.count}${stat.suffix ?? ""}`}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* QUANDO E ONDE */}
        <section id="quando" className="section pb-24 sm:pb-[clamp(120px,12vw,180px)]">
          <div className="wrap">
            <div className="grid gap-14 rounded-[28px] bg-htp-blue p-7 text-black sm:p-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end lg:gap-10 lg:p-16">
              <div className="flex flex-col gap-4">
                <p className="section-label text-black">Quando</p>
                <h2 className="m-0 font-display text-[clamp(64px,11vw,168px)] font-medium leading-[0.86] tracking-[-0.06em]">
                  20–21
                  <br />
                  fev.27
                </h2>
              </div>
              <div className="flex flex-col gap-3">
                <p className="m-0 text-[15px]">Onde</p>
                <h3 className="m-0 font-display text-[clamp(28px,3vw,40px)] font-medium leading-none tracking-[-0.03em]">
                  Palazzo Cristal
                </h3>
                <p className="m-0 max-w-[34ch] text-[16px] leading-[1.55]">
                  R. Quatrocentos e Noventa e Dois, 2-114 – Lot. Progresso, Cabedelo – PB
                </p>
                <a
                  href="https://maps.google.com/?q=Palazzo+Cristal+Cabedelo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex self-start rounded-full bg-black px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-white hover:text-black hover:opacity-100"
                >
                  Ver no mapa ↗
                </a>
              </div>
            </div>
          </div>
        </section>

        <FaqSection />
      </main>

      <SiteFooter />
    </>
  );
}
