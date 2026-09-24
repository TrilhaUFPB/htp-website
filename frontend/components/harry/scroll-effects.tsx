"use client";

import { useEffect } from "react";

/**
 * One-shot scroll effects, shared by the sections below the hero:
 *
 * - [data-reveal] blocks play a short reveal the first time they enter and
 *   then stay put. Time-based, not scrubbed by the scroll, so a block is
 *   never left half-faded wherever the page happens to stop. The page is
 *   only armed after mount, so without JS or under reduced motion everything
 *   is simply there.
 * - [data-count] numbers count up from zero the first time they are seen.
 *   The server renders the final value.
 */
export function ScrollEffects() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const reveals = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    // Anything already on screen at load is shown as is, not hidden then
    // revealed.
    const unseen = reveals.filter((el) => el.getBoundingClientRect().top > window.innerHeight);
    unseen.forEach((el) => el.setAttribute("data-reveal-armed", ""));
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          revealObserver.unobserve(entry.target);
          entry.target.setAttribute("data-revealed", "");
        });
      },
      // Fire as soon as any of the block is on screen: a visible sliver must
      // never sit there blank.
      { threshold: 0 },
    );
    unseen.forEach((el) => revealObserver.observe(el));

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

    return () => {
      observer.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  return null;
}
