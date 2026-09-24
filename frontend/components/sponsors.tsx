import Image from "next/image";
import { sponsors } from "@/content/sponsors";

export function Sponsors() {
  return (
    <div className="wrap flex flex-col gap-8 border-b border-black/10 pb-14 sm:flex-row sm:items-center sm:justify-between sm:gap-12 sm:pb-20">
      <p className="m-0 shrink-0 text-[15px] text-[#5c5c5c]">Com o apoio de</p>

      <ul className="m-0 flex list-none flex-wrap items-center gap-x-12 gap-y-6 p-0 sm:flex-1 sm:justify-center">
        {sponsors.map((sponsor) => (
          <li key={sponsor.name} className="flex">
            {/* The `!` on the opacity is load-bearing: globals.css sets
                `a:hover { opacity: .8 }` outside any @layer, and unlayered
                styles outrank @layer utilities, so only an important
                declaration keeps the logo at full strength on hover. */}
            <a
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${sponsor.name} (abre em nova aba)`}
              className="flex items-center opacity-70 grayscale transition-[filter,opacity] duration-200 hover:opacity-100! hover:grayscale-0"
            >
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                width={sponsor.width}
                height={sponsor.height}
                className="h-7 w-auto object-contain sm:h-9"
              />
            </a>
          </li>
        ))}
      </ul>

      <a
        href="https://instagram.com/trilhaufpb"
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 self-start text-[15px] font-medium text-black underline decoration-black/25 underline-offset-[6px] transition-colors hover:decoration-black sm:self-auto"
      >
        Leve sua marca →
      </a>
    </div>
  );
}
