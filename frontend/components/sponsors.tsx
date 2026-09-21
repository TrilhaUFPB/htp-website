import Image from "next/image";
import { sponsors } from "@/content/sponsors";

export function Sponsors() {
  return (
    <div className="flex w-full max-w-[1040px] flex-wrap items-center justify-between gap-7 border-b border-[#e5e5e5] pb-14 sm:gap-12">
      <p className="m-0 shrink-0 text-[14px] font-bold uppercase tracking-[0.2em] text-htp-blue">
        Com o apoio de
      </p>

      <ul className="m-0 flex flex-1 list-none flex-wrap items-center justify-center gap-14 p-0">
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
              className="flex items-center transition-all duration-200 grayscale hover:grayscale-0 hover:opacity-100!"
            >
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                width={sponsor.width}
                height={sponsor.height}
                className="h-10 w-auto object-contain"
              />
            </a>
          </li>
        ))}
      </ul>

      <a
        href="https://instagram.com/trilhaufpb"
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 whitespace-nowrap border-b-2 border-htp-blue text-sm font-bold text-black transition-colors duration-200 hover:text-htp-blue"
      >
        Leve sua marca →
      </a>
    </div>
  );
}
