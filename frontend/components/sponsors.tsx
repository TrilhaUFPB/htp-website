import Image from "next/image";
import { sponsors } from "@/content/sponsors";

export function Sponsors() {
  return (
    <div className="flex w-full max-w-[1040px] flex-col gap-10">
      <div className="flex flex-col items-start gap-9 border-b border-[#e5e5e5] pb-10 sm:flex-row sm:items-center sm:gap-16">
        <div className="flex shrink-0 flex-col gap-3 sm:w-[220px]">
          <p className="m-0 text-[13px] font-semibold uppercase tracking-[0.2em] text-htp-blue">
            Patrocinadores
          </p>
          <h2 className="m-0 text-[26px] font-bold leading-[1.25] tracking-[-0.02em] text-black">
            Quem acredita
            <br />
            nesse encontro.
          </h2>
        </div>

        <ul className="m-0 flex flex-1 list-none flex-wrap items-center gap-x-14 gap-y-8 p-0 sm:justify-evenly">
          {sponsors.map((sponsor) => (
            <li key={sponsor.name} className="flex">
              {/* No card this time: the logo sits straight on the page, so the
                  `!` on the opacity is load-bearing: globals.css sets
                  `a:hover { opacity: .8 }` outside any @layer, and unlayered
                  styles outrank @layer utilities, so only an important
                  declaration keeps the logo at full strength on hover. */}
              <a
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${sponsor.name} (abre em nova aba)`}
                className="flex items-center transition-transform duration-200 hover:-translate-y-0.5 hover:opacity-100!"
              >
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  width={sponsor.width}
                  height={sponsor.height}
                  className="h-[42px] w-auto object-contain"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <p className="m-0 max-w-[680px] text-[clamp(16px,1.4vw,20px)] leading-relaxed text-[#444]">
        Quer levar sua marca para o Hack the Path?{" "}
        <a
          href="https://instagram.com/trilhaufpb"
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap border-b-2 border-htp-blue font-bold text-black"
        >
          Fale com a gente →
        </a>
      </p>
    </div>
  );
}
