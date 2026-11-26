"use client";

import { useEffect } from "react";

/**
 * The inverse of the live hero: the page opens on a black card framed by
 * white, and the first stretch of scroll grows the card until it fills the
 * screen. Publishes --open (0 → 1) on the hero, and as --hero-open on <html>
 * so the fixed header can ride inside the card while it is framed.
 *
 * Also publishes --art: the blades fade out once the tunnel has zoomed into
 * its dark centre and stay gone, so leaving the hero shows plain black
 * instead of the live hero's rays coming back.
 */
export function HeroOpen() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".scroll-hero");
    const stage = hero?.querySelector<HTMLElement>(".scroll-hero-stage");
    if (!hero || !stage) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const root = document.documentElement;
    let frame = 0;

    const update = () => {
      frame = 0;
      const travelled = -hero.getBoundingClientRect().top;
      const distance = window.innerHeight * 0.7;
      const raw = motion.matches ? 0 : Math.min(1, Math.max(0, travelled / distance));
      const eased = raw * raw * (3 - 2 * raw);
      hero.style.setProperty("--open", eased.toFixed(4));
      root.style.setProperty("--hero-open", eased.toFixed(4));

      const runway = Math.max(1, hero.offsetHeight - stage.offsetHeight);
      const progress = travelled / runway;
      const fade = Math.min(1, Math.max(0, (progress - 0.82) / 0.14));
      hero.style.setProperty("--art", motion.matches ? "1" : (1 - fade * fade * (3 - 2 * fade)).toFixed(4));
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
      root.style.removeProperty("--hero-open");
    };
  }, []);

  return null;
}
