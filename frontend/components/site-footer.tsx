"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { NotifySignup } from "@/components/notify-signup";
import { privacyConfig } from "@/content/privacy";

/**
 * The page sheet lifts off this footer like a curtain, and the HTP fan rises
 * from the bottom edge as it does: the brand's sunburst, flipped so the light
 * source sits below the frame. --rise (0 → 1) is how much of the footer the
 * sheet has uncovered; every moving part is a calc() on it in globals.css.
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
      <div className="footer-field" aria-hidden="true" />
      <Sunrise />

      <div className="footer-inner">
        <div className="flex flex-col items-start gap-6 sm:gap-8">
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
          <a href="https://www.instagram.com/hackthepath/" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href={`mailto:${privacyConfig.controllerEmail}`}>Contato</a>
          <Link href="/privacidade">Privacidade</Link>
        </nav>
      </div>

      <div className="footer-mark">
        <Image
          src="/images/logo/png/hack-the-path-03.png"
          alt="Hack The Path"
          width={3128}
          height={1171}
          className="h-[20px] w-auto sm:h-[24px]"
        />
      </div>
    </footer>
  );
}

const point = (r: number, degrees: number) => {
  const a = (degrees * Math.PI) / 180;
  return `${(Math.cos(a) * r).toFixed(2)},${(Math.sin(a) * r).toFixed(2)}`;
};

// Full circles, cropped to the upper half by the viewBox (y = 0 is the fan's
// origin), so the counter-rotating bands never open a gap at the horizon.
const bands = [
  { inner: 130, outer: 300, count: 72, offset: 0, fill: "url(#sunrise-inner)", className: "sunrise-band-a" },
  { inner: 300, outer: 760, count: 72, offset: 1.25, fill: "url(#sunrise-outer)", className: "sunrise-band-b" },
];

function Sunrise() {
  return (
    <svg
      className="sunrise"
      viewBox="-1000 -620 2000 620"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="sunrise-core" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="112">
          <stop offset="0" stopColor="#c6d2fe" />
          <stop offset="1" stopColor="#7a94fd" />
        </radialGradient>
        <radialGradient id="sunrise-inner" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="300">
          <stop offset="0.43" stopColor="#c6d2fe" />
          <stop offset="1" stopColor="#7a94fd" />
        </radialGradient>
        <radialGradient id="sunrise-outer" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="620">
          <stop offset="0.48" stopColor="#7a94fd" />
          <stop offset="0.66" stopColor="#3b4c8f" />
          <stop offset="0.84" stopColor="#10162a" />
          <stop offset="1" stopColor="#000" />
        </radialGradient>
      </defs>
      {bands.map(({ inner, outer, count, offset, fill, className }) => (
        <g key={className} className={className} fill={fill}>
          {Array.from({ length: count }, (_, i) => {
            const start = (i * 360) / count + offset;
            const end = start + 180 / count;
            return (
              <path
                key={i}
                d={`M${point(inner, start)} L${point(outer, start)} A${outer},${outer} 0 0 1 ${point(outer, end)} L${point(inner, end)} A${inner},${inner} 0 0 0 ${point(inner, start)}Z`}
              />
            );
          })}
        </g>
      ))}
      <circle className="sunrise-core" r="112" fill="url(#sunrise-core)" />
    </svg>
  );
}
