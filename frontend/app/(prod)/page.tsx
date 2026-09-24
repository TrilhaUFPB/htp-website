import Image from "next/image";
import Link from "next/link";
import { Aperture } from "@/components/aperture";
import { CtaSection } from "@/components/cta";
import { FaqSection } from "@/components/faq";
import { NotifySignup } from "@/components/notify-signup";
import { ScrollEffects } from "@/components/scroll-effects";
import { ScrollHeader } from "@/components/scroll-header";
import { ScrollHero } from "@/components/scroll-hero";
import { Sponsors } from "@/components/sponsors";
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
    <div className="flex min-h-screen flex-col bg-white text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>

      {/* HEADER */}
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

      <main id="conteudo" className="flex flex-col">
      <ScrollEffects />
      {/* HERO */}
      <ScrollHero>
        <div className="hero-frame">
          <div className="hero-art">
            <Aperture />
          </div>

          <div className="hero-copy">
            <h1 id="hero-title" className="hero-title">
              O maior hackathon
              <br />
              <strong>
                da história <span className="hero-title-break">do Nordeste</span>
              </strong>
            </h1>
            <NotifySignup variant="hero" />
          </div>
        </div>
      </ScrollHero>

      {/* SPONSORS */}
      <section
        id="patrocinadores"
        className="flex scroll-mt-14 justify-center bg-white px-5 pt-10 sm:px-14 sm:pt-[70px]"
      >
        <Sponsors />
      </section>

      {/* ABOUT */}
      <section
        id="evento"
        className="flex justify-center px-5 py-16 sm:px-14 sm:py-[clamp(96px,11vw,170px)]"
      >
        <div className="flex w-full max-w-[1040px] flex-col gap-10 sm:gap-24">
          <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-[auto_1fr] sm:gap-40">
            <h2 className="m-0 text-[clamp(48px,7vw,112px)] font-extrabold leading-[0.92] tracking-[-0.045em]">
              Hack
              <br />
              The
              <br />
              Path<span className="text-htp-blue">.</span>
            </h2>
            <p className="m-0 max-w-[440px] text-[clamp(17px,1.6vw,23px)] leading-[1.5] text-[#333]">
              Dois dias de evento presencial. Hackathon, palestras, talks e conversas com
              empresas, o ambiente ideal para hackear sua própria trajetória até lugares que
              antes pareciam impossíveis.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 border-t border-[#e5e5e5] pt-8 sm:grid-cols-3 sm:gap-12 sm:pt-10">
            {EVENT_FEATURES.map((feature) => (
              <div key={feature.title} className="flex flex-col gap-3">
                <h3 className="m-0 text-[22px] font-extrabold tracking-[-0.02em]">
                  {feature.title}
                </h3>
                <p className="m-0 text-base leading-[1.55] text-[#555]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMAÇÃO */}
      <section
        id="programacao"
        className="flex scroll-mt-14 justify-center px-5 pb-16 sm:px-14 sm:pb-[120px]"
      >
        <div className="w-full max-w-[1040px]">
          <div data-reveal className="flex flex-wrap items-end justify-between gap-6 pb-8 sm:pb-12">
            <div className="flex flex-col gap-5">
              <p className="m-0 text-[13px] font-bold uppercase tracking-[0.2em] text-htp-blue">
                Programação
              </p>
              <h2 className="m-0 text-[clamp(34px,4.4vw,60px)] font-extrabold leading-[1.02] tracking-[-0.03em]">
                Dois dias.
                <br />
                Duas portas.
              </h2>
            </div>
          </div>

          <div className="grid gap-4">
            {scheduleDays.map((day, index) => {
              const isDark = index === 1;
              return (
                <article
                  key={day.number}
                  className={`sticky box-border grid min-h-[min(560px,68vh)] grid-cols-[auto_minmax(0,1fr)] gap-6 rounded-[30px] p-6 sm:gap-16 sm:p-12 ${
                    index === 0 ? "top-[100px]" : "top-[116px]"
                  } ${
                    isDark
                      ? "bg-black text-white shadow-[0_-20px_60px_rgba(0,0,0,0.18)]"
                      : "border-[1.5px] border-black bg-white"
                  }`}
                >
                  <div
                    className={`text-[clamp(72px,11vw,168px)] font-black leading-[0.85] tracking-[-0.06em] ${
                      isDark ? "text-htp-blue" : ""
                    }`}
                  >
                    {day.number}
                  </div>
                  <div className="flex flex-col justify-between gap-8 sm:gap-10">
                    <div className="flex flex-wrap gap-2.5">
                      <span
                        className={`inline-flex items-center rounded-full px-3.5 py-2 text-[13px] font-bold tracking-[0.04em] ${
                          isDark ? "bg-htp-blue text-black" : "bg-black text-white"
                        }`}
                      >
                        {day.date}
                      </span>
                      <span
                        className={`inline-flex items-center rounded-full px-3.5 py-2 text-[13px] font-bold tracking-[0.04em] ${
                          isDark ? "border-[1.5px] border-white" : "border-[1.5px] border-black"
                        }`}
                      >
                        {day.access}
                      </span>
                    </div>
                    <div className="flex flex-col gap-4">
                      <h3 className="m-0 max-w-[620px] text-balance text-[clamp(26px,3.2vw,46px)] font-extrabold leading-[1.05] tracking-[-0.03em]">
                        {day.title}
                      </h3>
                      <p
                        className={`m-0 max-w-[520px] text-[17px] leading-[1.55] ${
                          isDark ? "text-[#aaa]" : "text-[#555]"
                        }`}
                      >
                        {day.description}
                      </p>
                    </div>
                    <p className="m-0 text-[14px] font-bold uppercase tracking-[0.2em] text-htp-blue">
                      {day.count ? (
                        <>
                          <span data-count={day.count}>0</span> {day.participants}
                        </>
                      ) : (
                        day.participants
                      )}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* NÚMEROS */}
      <section className="flex justify-center px-5 pb-16 sm:px-14 sm:pb-[120px]">
        <div className="grid w-full max-w-[1040px] grid-cols-2 border-y-[1.5px] border-black sm:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              data-reveal={index * 80}
              className={`flex flex-col gap-3 border-[#e5e5e5] px-4 py-8 sm:border-r sm:px-6 sm:py-10 sm:border-b-0 sm:last:border-r-0 ${
                index % 2 === 0 ? "border-r" : ""
              } ${index < 2 ? "border-b" : ""}`}
            >
              <span
                className={`text-[clamp(40px,6vw,88px)] font-black leading-[0.9] tracking-[-0.05em] ${
                  stat.accent ? "text-htp-blue" : ""
                }`}
              >
                <span data-count={stat.count} data-prefix={stat.prefix} data-suffix={stat.suffix}>
                  0
                </span>
              </span>
              <span className="text-[15px] font-semibold text-[#555]">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* LOCAL & DATA */}
      <section
        id="quando"
        className="flex scroll-mt-14 justify-center px-5 pb-16 sm:px-14 sm:pb-[140px]"
      >
        <div className="grid w-full max-w-[1040px] grid-cols-1 items-center gap-8 sm:grid-cols-[1.2fr_0.8fr] sm:gap-16">
          <div className="flex flex-col gap-8 sm:gap-10">
            <div data-reveal className="flex flex-col gap-5">
              <p className="m-0 text-[13px] font-bold uppercase tracking-[0.2em] text-htp-blue">
                Quando
              </p>
              <h2 className="m-0 text-[clamp(56px,9vw,140px)] font-black leading-[0.88] tracking-[-0.06em]">
                20–21
                <br />
                fev<span className="text-htp-blue">.</span>27
              </h2>
            </div>
            <div
              data-reveal={120}
              className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-5 border-t-[1.5px] border-black pt-6 sm:gap-6 sm:pt-7"
            >
              <p className="m-0 pt-1.5 text-[13px] font-bold uppercase tracking-[0.2em] text-htp-blue">
                Onde
              </p>
              <div className="flex flex-col gap-2.5">
                <h3 className="m-0 text-[clamp(26px,3vw,40px)] font-extrabold leading-none tracking-[-0.03em]">
                  Palazzo Cristal
                </h3>
                <p className="m-0 max-w-[380px] text-base leading-[1.55] text-[#555]">
                  R. Quatrocentos e Noventa e Dois, 2-114 – Lot. Progresso, Cabedelo – PB
                </p>
                <a
                  href="https://maps.google.com/?q=Palazzo+Cristal+Cabedelo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 self-start border-b-2 border-htp-blue text-sm font-bold text-black transition-colors duration-200 hover:text-htp-blue"
                >
                  Ver no mapa ↗
                </a>
              </div>
            </div>
          </div>
          <div data-reveal={200} className="flex justify-center">
            <Image
              src="/images/fan-mono.png"
              alt=""
              aria-hidden="true"
              data-parallax="0.08"
              width={600}
              height={600}
              className="aspect-square w-full max-w-[400px] rounded-[30px] object-cover will-change-transform"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection />

      {/* CTA + FOOTER */}
      <CtaSection />
      </main>
    </div>
  );
}
