"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { DiaGlow } from "@/components/dia-glow";
import { NotifySignup } from "@/components/notify-signup";

/**
 * The page sheet lifts off this footer like a curtain. Behind it, Dia's
 * gradient footer in HTP blues: blurred columns shaped into a mountain that
 * grows out of the bottom edge. --rise (0 → 1) is how much of the footer the
 * sheet has uncovered; the glow's scale is a calc() on it in globals.css.
 */
export function SiteFooter() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = ref.current;
    const sheet = footer?.previousElementSibling;
    if (!footer || !sheet) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      if (motion.matches) {
        footer.style.setProperty("--rise", "1");
        return;
      }
      const uncovered = window.innerHeight - sheet.getBoundingClientRect().bottom;
      const t = Math.min(1, Math.max(0, uncovered / footer.offsetHeight));
      footer.style.setProperty("--rise", (t * t * (3 - 2 * t)).toFixed(4));
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    motion.addEventListener("change", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      motion.removeEventListener("change", schedule);
    };
  }, []);

  return (
    <footer ref={ref} className="site-footer" aria-labelledby="footer-title">
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
