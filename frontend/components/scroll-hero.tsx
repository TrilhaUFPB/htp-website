"use client";

import { useEffect, useRef } from "react";

/** Progressively reveals the white frame while keeping all content in normal flow. */
export function ScrollHero({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const distance = Math.max(1, element.offsetHeight - window.innerHeight);
      const progress = motion.matches ? 1 : Math.min(1, Math.max(0, window.scrollY / distance));
      element.style.setProperty("--hero-progress", String(progress));
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

  return <section ref={ref} className="scroll-hero" aria-labelledby="hero-title"><div className="scroll-hero-stage">{children}</div></section>;
}
