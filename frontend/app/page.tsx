import Image from "next/image";

const LUMA_URL = "https://lu.ma";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-black">
      {/* HERO */}
      <section className="grid min-h-screen grid-cols-1 lg:grid-cols-[minmax(440px,1.1fr)_1fr]">
        <div className="flex flex-col gap-8 px-8 pb-14 pt-9 sm:px-14">
          <div className="flex items-center justify-between text-[13px] font-semibold uppercase tracking-[0.14em]">
            <div className="flex items-center gap-2.5">
              <span className="inline-block h-2.5 w-2.5 animate-[htp-blink_1.4s_steps(1)_infinite] rounded-full bg-htp-blue" />
              <span>Em breve</span>
            </div>
          </div>

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
            <a
              href={LUMA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-black px-10 py-[18px] text-[17px] font-bold tracking-[0.02em] text-white transition-colors hover:bg-htp-blue hover:text-black hover:opacity-100"
            >
              Aceite o desafio <span aria-hidden>→</span>
            </a>
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
      <div className="overflow-hidden whitespace-nowrap bg-black py-4 text-white">
        <div className="inline-flex animate-[htp-marquee_24s_linear_infinite]">
          <span className="pr-14 text-sm font-semibold uppercase tracking-[0.28em]">
            Inove · Colabore · Transforme · Onde ideias encontram propósito ·&nbsp;
          </span>
          <span className="pr-14 text-sm font-semibold uppercase tracking-[0.28em]">
            Inove · Colabore · Transforme · Onde ideias encontram propósito ·&nbsp;
          </span>
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
              Onde ideias encontram propósito.
            </h2>
            <p className="m-0 max-w-[640px] text-[clamp(16px,1.4vw,20px)] font-normal leading-relaxed text-[#444]">
              Dois dias construindo com IA ao lado de mentores e empresas — um
              hackathon universitário feito por estudantes, do Nordeste para o
              mundo.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Inove", text: "Construa um projeto real em 48 horas." },
              {
                title: "Colabore",
                text: "Times de universidades de todo o Nordeste.",
              },
              {
                title: "Transforme",
                text: "Ideias com impacto, avaliadas por quem constrói.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="flex flex-col gap-2.5 rounded-[24px] border-[1.5px] border-black p-8"
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
              João
              <br />
              Pessoa · PB
            </h2>
            <p className="m-0 text-base font-medium leading-[1.55] text-[#1a1a1a]">
              Local em definição — anunciamos em breve.
            </p>
          </div>
        </div>
      </section>

      {/* SPONSORS */}
      <section className="flex justify-center bg-white px-8 py-[130px] sm:px-14">
        <div className="flex w-full max-w-[1040px] flex-col gap-6">
          <p className="m-0 text-[13px] font-semibold uppercase tracking-[0.2em] text-htp-blue">
            Patrocinadores
          </p>
          <h2 className="m-0 text-[clamp(34px,4.4vw,60px)] font-extrabold leading-[1.05] tracking-[-0.02em]">
            Em breve.
          </h2>
          <p className="m-0 max-w-[560px] text-[clamp(16px,1.4vw,19px)] leading-relaxed text-[#444]">
            Quer levar sua marca para o Hack the Path?{" "}
            <a
              href="https://instagram.com/trilhaufpb"
              target="_blank"
              rel="noopener noreferrer"
              className="border-b-2 border-htp-blue font-bold text-black"
            >
              Fale com a gente →
            </a>
          </p>
        </div>
      </section>

      {/* CTA + FOOTER */}
      <section className="flex flex-col items-center bg-black px-8 pt-[130px] text-white sm:px-14">
        <div className="flex w-full max-w-[1040px] flex-col items-center gap-8 pb-[120px] text-center">
          <h2 className="m-0 text-[clamp(40px,5.5vw,76px)] font-black leading-[0.98] tracking-[-0.02em]">
            Aceite o desafio.
          </h2>
          <p className="m-0 max-w-[480px] text-[clamp(16px,1.4vw,19px)] leading-relaxed text-[#aaa]">
            Entre na lista e seja avisado assim que as inscrições abrirem.
          </p>
          <a
            href={LUMA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-htp-blue px-11 py-[18px] text-[17px] font-bold tracking-[0.02em] text-black transition-colors hover:bg-white hover:opacity-100"
          >
            Quero ser avisado <span aria-hidden>→</span>
          </a>
        </div>

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
            href="https://instagram.com/trilhaufpb"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#777]"
          >
            @trilhaufpb
          </a>
        </footer>
      </section>
    </div>
  );
}
