import Image from "next/image";
import Link from "next/link";
import { Aperture } from "@/components/aperture";
import { CtaSection } from "@/components/cta";
import { FaqSection } from "@/components/faq";
import { NotifySignup } from "@/components/notify-signup";
import { ScrollHeader } from "@/components/scroll-header";
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
            <a href="#evento">O evento</a>
            <a href="#quando">Quando e onde</a>
            <a href="#faq">Dúvidas</a>
            <a href="#patrocinadores">Patrocinadores</a>
          </nav>
        </div>
      </ScrollHeader>

      <main id="conteudo" className="flex flex-col">
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
              <strong>da história do Nordeste</strong>
            </h1>
            <NotifySignup variant="hero" />
          </div>
        </div>
      </ScrollHero>

      {/* SPONSORS */}
      <section
        id="patrocinadores"
        className="flex scroll-mt-14 justify-center bg-white px-8 pt-[130px] sm:px-14"
      >
        <Sponsors />
      </section>

      {/* ABOUT */}
      <section id="evento" className="flex justify-center bg-white px-8 py-[130px] sm:px-14">
        <div className="grid w-full max-w-[1040px] grid-cols-1 items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
          <div className="flex flex-col gap-6">
            <p className="m-0 text-[13px] font-semibold uppercase tracking-[0.2em] text-htp-blue">
              01 / Abra seu caminho
            </p>
            <h2 className="m-0 max-w-[480px] text-[clamp(30px,3.6vw,46px)] font-normal leading-[1.18] tracking-[-0.02em]">
              Você já tem ideias.
              <br />
              <strong className="font-bold">
                Dê a elas um lugar
                <br />
                para acontecer.
              </strong>
            </h2>
            <p className="m-0 max-w-[440px] text-base leading-[1.8] text-[#5c5c5c]">
              Uma conversa que muda sua perspectiva. Uma equipe que compra sua ideia. Um projeto
              que sai da sua cabeça e ganha o mundo.
            </p>
            <p className="m-0 max-w-[440px] text-base leading-[1.8] text-[#5c5c5c]">
              O Hack The Path reúne estudantes, mentores e empresas para dois dias de troca e
              construção. Talento daqui. Possibilidades muito além.
            </p>
            <a
              href="#quando"
              className="mt-2 inline-flex w-fit items-center gap-3 border-b border-black pb-2 text-sm font-semibold"
            >
              Veja como vai acontecer <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.14em] text-[#777]">
              <span>Hack Your Path</span>
              <span>001</span>
            </div>
            <Image
              src="/images/brand/graphics/sphere.svg"
              alt=""
              width={360}
              height={360}
              className="w-full"
              aria-hidden="true"
            />
            <div className="flex items-center justify-between gap-4">
              <p className="m-0 text-base leading-[1.5]">
                Mesmas pessoas.
                <br />
                <strong className="font-bold">Novos caminhos.</strong>
              </p>
              <span aria-hidden="true" className="text-[32px] font-light leading-none">
                ↗
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* LOCAL & DATA */}
      <section id="quando" className="flex justify-center bg-htp-blue px-8 py-[130px] sm:px-14">
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

      {/* FAQ */}
      <FaqSection />

      {/* CTA */}
      <CtaSection />

      {/* FOOTER */}
      <section className="flex flex-col items-center bg-black px-8 pt-[70px] text-white sm:px-14">
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
      </main>
    </div>
  );
}
