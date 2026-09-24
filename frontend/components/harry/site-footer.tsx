import Image from "next/image";

import { DiaGlow } from "@/components/harry/dia-glow";
import { NotifySignup } from "@/components/harry/notify-signup";

/**
 * The page sheet lifts off this footer like a curtain, and resists doing so,
 * while Dia's gradient in HTP blues grows out of the bottom edge. All of it is
 * CSS scroll-driven animation in globals.css; no JS runs per frame.
 */
export function SiteFooter() {
  return (
    <footer className="site-footer" aria-labelledby="footer-title">
      <DiaGlow className="footer-glow" />

      <div className="footer-inner">
        <div className="flex flex-col items-start gap-6 sm:gap-8">
          <p className="section-label">Inscrições em breve</p>
          <h2
            id="footer-title"
            className="m-0 font-display text-[clamp(44px,7vw,104px)] font-medium leading-[0.95] tracking-[-0.045em]"
          >
            Aceite o desafio.
          </h2>
          <p className="m-0 max-w-[400px] text-[17px] leading-[1.5] text-[#a3a3a3] sm:text-[19px]">
            Entre na lista e seja avisado assim que as inscrições abrirem.
          </p>
          <NotifySignup variant="cta" />
        </div>

        <nav
          aria-label="Rodapé"
          className="flex flex-wrap gap-x-8 gap-y-3 text-[15px] text-[#a3a3a3] sm:flex-col sm:items-end sm:gap-3 sm:text-right"
        >
          <a href="https://www.hackthepath.com.br" target="_blank" rel="noopener noreferrer">
            hackthepath.com.br
          </a>
          <a href="https://www.instagram.com/hackthepath/" target="_blank" rel="noopener noreferrer">
            @hackthepath
          </a>
        </nav>
      </div>

      <div className="footer-mark">
        <Image
          src="/images/logo/svg/hack-the-path-03.svg"
          alt="Hack The Path"
          width={1564}
          height={585}
          className="h-[30px] w-auto sm:h-[40px]"
        />
      </div>
    </footer>
  );
}
