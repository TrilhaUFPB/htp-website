"use client";

import { useEffect } from "react";

/**
 * Counts [data-count] numbers up from zero the first time they scroll into
 * view. The server renders the final value, so without JS or under reduced
 * motion the number is simply there.
 */
export function ScrollEffects() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const runCount = (el: HTMLElement) => {
      const end = Number(el.dataset.count);
      const prefix = el.dataset.prefix ?? "";
      const suffix = el.dataset.suffix ?? "";
      if (!Number.isFinite(end)) return;
      const duration = 1400;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - (1 - progress) ** 3;
        el.textContent = `${prefix}${Math.round(end * eased)}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          runCount(entry.target as HTMLElement);
        });
      },
      { threshold: 0.5 },
    );
    document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
