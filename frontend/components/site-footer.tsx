"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { DiaGlow } from "@/components/dia-glow";
import { NotifySignup } from "@/components/notify-signup";

/**
 * The page sheet lifts off this footer like a curtain, and resists doing so. Behind it, Dia's
 * gradient footer in HTP blues: blurred columns shaped into a mountain that
 * grows out of the bottom edge. --rise (0 → 1) is how much of the footer the
 * sheet has uncovered; the glow's scale is a calc() on it in globals.css.
 */
export function SiteFooter() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = ref.current;
    const sheet = footer?.previousElementSibling as HTMLElement | null;
    if (!footer || !sheet) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let current = 0;
    let runway = 0;

    // The footer is fixed behind the sheet, and the sheet is given extra
    // runway below it: RESISTANCE times the footer's height of scroll to
    // uncover it. Over that runway the sheet is held back, so it lifts slower
    // than the finger and heaviest at first, like pulling something stuck.
    const RESISTANCE = 1.8;
    const measure = () => {
      const pinned = getComputedStyle(footer).position === "fixed" && !motion.matches;
      runway = pinned ? footer.offsetHeight * RESISTANCE : 0;
      sheet.style.marginBottom = pinned ? `${runway}px` : "";
      schedule();
    };

    const update = () => {
      frame = 0;
      const height = footer.offsetHeight;
      let uncovered = height;
      if (runway) {
        const end = sheet.offsetTop + sheet.offsetHeight - window.innerHeight;
        const pulled = Math.min(runway, Math.max(0, window.scrollY - end));
        uncovered = height * (pulled / runway) ** 1.5;
        sheet.style.transform = pulled ? `translate3d(0, ${pulled - uncovered}px, 0)` : "";
      }

      // The glow follows the reveal closely, with just enough damping to
      // smooth a flick.
      const t = Math.min(1, Math.max(0, uncovered / height / 0.85));
      const goal = motion.matches ? 1 : 1 - (1 - t) ** 3;
      current += (goal - current) * 0.18;
      if (Math.abs(goal - current) < 0.001) current = goal;
      footer.style.setProperty("--rise", current.toFixed(4));
      if (current !== goal) schedule();
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    motion.addEventListener("change", measure);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      motion.removeEventListener("change", measure);
      sheet.style.marginBottom = "";
      sheet.style.transform = "";
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
