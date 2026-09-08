import Image from "next/image";
import { sponsors } from "@/content/sponsors";

export function Sponsors() {
  return (
    <div className="flex w-full max-w-[1040px] flex-col gap-12 pb-[150px]">
      <div className="flex flex-col gap-7">
        <p className="m-0 text-[13px] font-semibold uppercase tracking-[0.2em] text-htp-blue">
          Patrocinadores
        </p>
        <h2 className="m-0 text-[clamp(40px,5.2vw,72px)] font-extrabold leading-[1.05] tracking-[-0.02em]">
          Quem torna isso possível.
        </h2>
      </div>

      <ul className="m-0 flex list-none flex-wrap gap-5 p-0">
        {sponsors.map((sponsor) => (
          <li key={sponsor.name} className="flex">
            {/* The card keeps the border geometry of the other cards on the site.
                Against the black section the black ring reads as the card's own
                edge, so it only becomes visible once hover turns it blue.
                The `!` on the opacity is load-bearing: globals.css sets
                `a:hover { opacity: .8 }` outside any @layer, and unlayered
                styles outrank @layer utilities, so only an important
                declaration keeps the logos from washing out on hover. */}
            <a
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${sponsor.name} (abre em nova aba)`}
              className="flex h-[112px] w-[240px] items-center justify-center rounded-[24px] border-[1.5px] border-black bg-white px-9 transition-colors duration-200 hover:border-htp-blue hover:opacity-100!"
            >
              {/* Every logo is fitted into the same full-width, 52px-tall box.
                  Capping the height rather than the width is what normalises
                  them optically: the single-line wordmarks come out shorter
                  than the two-line lockups, which is how they read at equal
                  weight. w-full (not w-auto) matters for the SVG, which would
                  otherwise stop at its own 185px intrinsic width while the
                  raster logos scale up around it. */}
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                width={sponsor.width}
                height={sponsor.height}
                className="max-h-[52px] w-full object-contain"
              />
            </a>
          </li>
        ))}
      </ul>

      <p className="m-0 max-w-[680px] text-[clamp(16px,1.4vw,20px)] leading-relaxed text-[#aaa]">
        Quer levar sua marca para o Hack the Path?{" "}
        <a
          href="https://instagram.com/trilhaufpb"
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap border-b-2 border-htp-blue font-bold text-white"
        >
          Fale com a gente →
        </a>
      </p>
    </div>
  );
}
