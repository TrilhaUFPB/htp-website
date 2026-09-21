import Image from "next/image";
import { Aperture } from "@/components/aperture";
import { BrandLens } from "@/components/brand-lens";
import { CtaSection } from "@/components/cta";
import { FaqSection } from "@/components/faq";
import { NotifySignup } from "@/components/notify-signup";
import { ScrollHero } from "@/components/scroll-hero";
import { Sponsors } from "@/components/sponsors";
import { createFaqJsonLd } from "@/lib/seo";

const MARQUEE_ITEMS = [
  "Hack Your Path",
  "Seek Your Future",
  "Build your trail",
  "We are Path Seekers",
] as const;

const MARQUEE_UNITS = Array.from({ length: 4 }, () => MARQUEE_ITEMS).flat();

export default function Home() {
  const faqJsonLd = createFaqJsonLd();

  return (
    <div className="flex min-h-screen flex-col bg-white text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* HERO */}
      <ScrollHero>
        <div className="hero-frame">
          <div className="hero-art">
            <Aperture />
          </div>

          <div className="hero-copy">
            <BrandLens className="hero-mark" />
            <h1 id="hero-title">
              <Image
                src="/images/logo/svg/hack-the-path-01.svg"
                alt="Hack The Path"
                width={1564}
                height={318}
                priority
              />
            </h1>
            <p className="hero-meta">
              20–21 de fevereiro de 2027
              <br />
              <strong>João Pessoa · PB</strong>
            </p>
            <NotifySignup variant="hero" />
          </div>

          <p className="hero-scroll-cue" aria-hidden="true">
            Role para entrar <span>↓</span>
          </p>
        </div>
      </ScrollHero>

      {/* MARQUEE */}
      <div className="overflow-hidden bg-black py-4 text-white">
        <div className="flex w-max animate-[htp-marquee_40s_linear_infinite] will-change-transform">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1}
              className="flex shrink-0 items-center gap-[1.75rem]"
            >
              {MARQUEE_UNITS.map((unit, index) => (
                <span
                  key={`${copy}-${index}`}
                  className="whitespace-nowrap text-sm font-semibold uppercase tracking-[0.28em]"
                >
                  {unit} ·
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section className="flex justify-center bg-white px-8 py-[130px] sm:px-14">
        <div className="flex w-full max-w-[1040px] flex-col gap-14">
          <div className="flex flex-col gap-6">
            <p className="m-0 text-[13px] font-semibold uppercase tracking-[0.2em] text-htp-blue">
              O evento
            </p>
            <h2 className="m-0 max-w-[820px] text-[clamp(34px,4.4vw,60px)] font-extrabold leading-[1.05] tracking-[-0.02em]">
              Hack The Path.
            </h2>
            <p className="m-0 max-w-[640px] text-[clamp(16px,1.4vw,20px)] font-normal leading-relaxed text-[#444]">
              Dois dias de evento presencial. Hackathon, palestras, talks e conversas com empresas,
              o ambiente ideal para hackear sua própria trajetória até lugares que antes pareciam impossíveis.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Competição",
                text: "Projeto real, do zero ao pitch final, exposto a mais de 150 países.",
              },
              {
                title: "Conexão",
                text: "Mentores, jurados e empresas presentes durante todo o evento.",
              },
              {
                title: "Experiência",
                text: "Um evento pensado para mudar a forma como você pensa.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="flex cursor-default flex-col gap-2.5 rounded-[24px] border-[1.5px] border-black p-8 transition-colors duration-200 hover:border-htp-blue"
              >
                <h3 className="m-0 text-xl font-extrabold uppercase tracking-[0.04em]">
                  {card.title}
                </h3>
                <p className="m-0 text-[15px] leading-[1.55] text-[#444]">
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCAL & DATA */}
      <section className="flex justify-center bg-htp-blue px-8 py-[130px] sm:px-14">
        <div className="grid w-full max-w-[1040px] grid-cols-1 items-start gap-12 sm:grid-cols-2">
          <div className="flex flex-col gap-5">
            <p className="m-0 text-[13px] font-semibold uppercase tracking-[0.2em] text-white">
              Quando
            </p>
            <h2 className="m-0 text-[clamp(40px,4.6vw,64px)] font-black leading-none tracking-[-0.02em]">
              20–21
              <br />
              fev 2027
            </h2>
          </div>
          <div className="flex flex-col gap-5">
            <p className="m-0 text-[13px] font-semibold uppercase tracking-[0.2em] text-white">
              Onde
            </p>
            <h2 className="m-0 text-[clamp(40px,4.6vw,64px)] font-black leading-none tracking-[-0.02em]">
              Palazzo
              <br />
              Cristal
            </h2>
            <p className="m-0 text-base font-medium leading-[1.55] text-[#1a1a1a]">
              R. Quatrocentos e Noventa e Dois, 2-114 - Lot. Progresso, Cabedelo - PB
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection />

      {/* CTA */}
      <CtaSection />

      {/* SPONSORS + FOOTER */}
      <section className="flex flex-col items-center bg-black px-8 pt-[150px] text-white sm:px-14">
        <Sponsors />

        <footer className="flex w-full max-w-[1040px] flex-wrap items-center justify-between gap-4 border-t border-[#2a2a2a] px-0 pb-9 pt-7 text-[13px] font-medium tracking-[0.06em]">
          <Image
            src="/images/logo/png/hack-the-path-03.png"
            alt="Hack The Path"
            width={3128}
            height={1171}
            className="h-[30px] w-auto"
          />
          <a
            href="https://www.hackthepath.com.br"
            target="_blank"
            rel="noopener noreferrer"
          >
            hackthepath.com.br
          </a>
          <a
            href="https://www.instagram.com/hackthepath/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#777]"
          >
            @hackthepath
          </a>
        </footer>
      </section>
    </div>
  );
}
