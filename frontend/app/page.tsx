import Image from "next/image";
import { CtaSection } from "@/components/cta";
import { FaqSection } from "@/components/faq";
import { NotifySignup } from "@/components/notify-signup";
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
      <section className="grid min-h-screen grid-cols-1 lg:grid-cols-[minmax(440px,1.1fr)_1fr]">
        <div className="flex flex-col gap-8 px-8 pb-14 pt-9 sm:px-14">
          <div className="flex flex-1 flex-col items-center justify-center gap-10 text-center">
            <Image
              src="/images/logo/png/hack-the-path-02.png"
              alt="Hack The Path"
              width={3128}
              height={637}
              priority
              className="h-auto w-[min(560px,100%)]"
            />
            <p className="m-0 text-[clamp(17px,1.5vw,22px)] font-medium leading-relaxed">
              20–21 de fevereiro de 2027
              <br />
              <span className="font-bold text-htp-blue">João Pessoa · PB</span>
            </p>
            <NotifySignup variant="hero" />
          </div>
        </div>

        <div className="relative min-h-[60vh] overflow-hidden">
          <div className="absolute -left-[60px] top-0 bottom-0 right-0">
            <Image
              src="/images/hero/hero-sunburst.png"
              alt=""
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-left"
            />
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
