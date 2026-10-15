import Image from "next/image";
import Link from "next/link";
import { Aperture } from "@/components/aperture";
import { CtaSection } from "@/components/cta";
import { FaqSection } from "@/components/faq";
import { NotifySignup } from "@/components/notify-signup";
import { ScrollEffects } from "@/components/scroll-effects";
import { ScrollHeader } from "@/components/scroll-header";
import { ScrollHero } from "@/components/scroll-hero";
import { SectionTracker } from "@/components/section-tracker";
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

const JOAO_PESSOA_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Jo%C3%A3o+Pessoa%2C+Para%C3%ADba%2C+Brasil";

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
      <SectionTracker />
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
      <section id="numeros" className="flex justify-center px-5 pb-16 sm:px-14 sm:pb-20">
        <div className="grid w-full max-w-[960px] grid-cols-2 border-y-[1.5px] border-black sm:grid-cols-4">
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
        <div className="w-full max-w-[960px]">
          <div className="grid items-center gap-8 py-10 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:gap-12 lg:gap-20">
            <div data-reveal className="flex flex-col items-start">
              <h2 className="m-0 text-[13px] font-bold uppercase tracking-[0.2em] text-htp-blue">
                Quando
              </h2>
              <p className="m-0 mt-6 text-[clamp(76px,8.5vw,120px)] font-black leading-[0.85] tracking-[-0.07em]">
                20 – 21
              </p>
              <p className="m-0 mt-3 text-[clamp(22px,2.8vw,36px)] font-extrabold leading-none tracking-[-0.04em]">
                fevereiro de 2027<span className="text-htp-blue">.</span>
              </p>
            </div>
            <Image
              data-reveal={120}
              src="/images/calendar-feb-2027.png"
              alt=""
              aria-hidden="true"
              width={1920}
              height={1920}
              sizes="(max-width: 767px) 100vw, 340px"
              className="w-full max-w-[340px] justify-self-center rounded-[28px]"
            />
          </div>
          <div className="grid items-center gap-4 border-t border-[#dedede] pt-10 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:gap-12 md:pt-14 lg:gap-20">
            <div data-reveal className="flex flex-col items-start">
              <h2 className="m-0 text-[13px] font-bold uppercase tracking-[0.2em] text-htp-blue">
                Onde
              </h2>
              <h3 className="m-0 mt-6 text-[clamp(44px,5vw,68px)] font-extrabold leading-[0.95] tracking-[-0.055em]">
                Grande<br />João Pessoa<span className="text-htp-blue">.</span>
              </h3>
              <p className="m-0 mt-5 max-w-[340px] text-base leading-[1.5] text-[#555]">
                O endereço do evento será divulgado em breve.
              </p>
            </div>
            <div data-reveal={120} className="relative aspect-[3/2] w-full max-w-[600px]">
              <a
                href={JOAO_PESSOA_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ver João Pessoa no Google Maps (abre em nova aba)"
                className="group absolute inset-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                <Image
                  src="/images/paraiba-map-3d.png"
                  alt=""
                  fill
                  sizes="(max-width: 767px) 100vw, 600px"
                  className="object-cover"
                />
                <span className="absolute left-[87%] top-[55%] flex h-16 w-12 -translate-x-1/2 -translate-y-full items-end justify-center">
                  <Image
                    src="/images/map-pin.png"
                    alt=""
                    width={132}
                    height={204}
                    className="h-[46px] w-[30px] origin-bottom transition-transform duration-200 ease-out group-hover:scale-125 group-focus-visible:scale-125 motion-reduce:transition-none"
                  />
                </span>
              </a>
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
