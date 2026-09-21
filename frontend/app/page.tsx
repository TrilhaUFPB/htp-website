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
            <a href="#evento">O evento</a>
            <a href="#quando">Quando e onde</a>
            <a href="#faq">Dúvidas</a>
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
        className="flex scroll-mt-14 justify-center bg-white px-8 pt-[70px] sm:px-14"
      >
        <Sponsors />
      </section>

      {/* ABOUT */}
      <section
        id="evento"
        className="flex justify-center px-8 py-[clamp(96px,11vw,170px)] sm:px-14"
      >
        <div className="flex w-full max-w-[1040px] flex-col gap-14 sm:gap-24">
          <div className="grid grid-cols-1 items-center gap-8 sm:grid-cols-[auto_1fr] sm:gap-16">
            <h2 className="m-0 text-[clamp(48px,7vw,112px)] font-extrabold leading-[0.92] tracking-[-0.045em]">
              Hack
              <br />
              The
              <br />
              Path<span className="text-htp-blue">.</span>
            </h2>
            <p className="m-0 max-w-[440px] text-[clamp(18px,1.6vw,23px)] leading-[1.5] text-[#333]">
              Dois dias de evento presencial. Hackathon, palestras, talks e conversas com
              empresas, o ambiente ideal para hackear sua própria trajetória até lugares que
              antes pareciam impossíveis.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 border-t border-[#e5e5e5] pt-10 sm:grid-cols-3 sm:gap-12">
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

      {/* LOCAL & DATA */}
      <section id="quando" className="flex justify-center px-8 py-[80px] sm:px-14">
        <div className="grid w-full max-w-[1040px] grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex min-h-[360px] flex-col justify-between gap-16 rounded-[30px] bg-htp-blue p-12 text-black transition-colors duration-200 hover:bg-[#5f78f5]">
            <p className="m-0 text-[13px] font-bold uppercase tracking-[0.2em]">Quando</p>
            <h2 className="m-0 text-[clamp(44px,5.4vw,84px)] font-black leading-[0.95] tracking-[-0.04em]">
              20–21
              <br />
              fev 2027
            </h2>
          </div>
          <div className="flex min-h-[360px] flex-col justify-between gap-16 rounded-[30px] bg-black p-12 text-white transition-colors duration-200 hover:bg-[#161616]">
            <p className="m-0 text-[13px] font-bold uppercase tracking-[0.2em] text-htp-blue">
              Onde
            </p>
            <div className="flex flex-col gap-5">
              <h2 className="m-0 text-[clamp(44px,5.4vw,84px)] font-black leading-[0.95] tracking-[-0.04em]">
                Palazzo
                <br />
                Cristal
              </h2>
              <p className="m-0 max-w-[380px] text-[15px] font-medium leading-[1.55] text-[#aaa]">
                R. Quatrocentos e Noventa e Dois, 2-114 - Lot. Progresso, Cabedelo - PB
              </p>
            </div>
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
