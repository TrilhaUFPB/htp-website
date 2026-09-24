"use client";

import { useEffect } from "react";

/**
 * Wires up the scroll-driven polish shared by the sections below the hero:
 * fade-up reveals ([data-reveal]), count-up numbers ([data-count]), and a
 * light parallax drift ([data-parallax]). One observer set for the whole
 * page beats one IntersectionObserver per revealed element.
 */
export function ScrollEffects() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let revealObserver: IntersectionObserver | undefined;
    const reveals = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!reduceMotion && reveals.length) {
      reveals.forEach((el) => {
        const delay = el.getAttribute("data-reveal");
        el.style.transitionDelay = delay && delay !== "true" ? `${delay}ms` : "0ms";
        el.setAttribute("data-reveal-armed", "");
      });

      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.setAttribute("data-reveal-visible", "");
            revealObserver?.unobserve(entry.target);
          });
        },
        { threshold: 0.12 },
      );
      reveals.forEach((el) => revealObserver?.observe(el));
    }

    const runCount = (el: HTMLElement) => {
      const end = Number(el.dataset.count);
      const prefix = el.dataset.prefix ?? "";
      const suffix = el.dataset.suffix ?? "";
      if (!Number.isFinite(end)) return;
      if (reduceMotion) {
        el.textContent = `${prefix}${end}${suffix}`;
        return;
      }
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

    let countObserver: IntersectionObserver | undefined;
    const counters = Array.from(document.querySelectorAll<HTMLElement>("[data-count]"));
    if (counters.length) {
      countObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            countObserver?.unobserve(entry.target);
            runCount(entry.target as HTMLElement);
          });
        },
        { threshold: 0.5 },
      );
      counters.forEach((el) => countObserver?.observe(el));
    }

    const parallax = reduceMotion
      ? []
      : Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let frame = 0;
    const applyParallax = () => {
      frame = 0;
      const viewportHeight = window.innerHeight;
      parallax.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > viewportHeight + 200) return;
        const center = rect.top + rect.height / 2 - viewportHeight / 2;
        const factor = Number(el.dataset.parallax) || 0;
        el.style.transform = `translateY(${(-center * factor).toFixed(1)}px)`;
      });
    };
    const scheduleParallax = () => {
      if (!frame) frame = requestAnimationFrame(applyParallax);
    };

    if (parallax.length) {
      applyParallax();
      window.addEventListener("scroll", scheduleParallax, { passive: true });
      window.addEventListener("resize", scheduleParallax);
    }

    return () => {
      revealObserver?.disconnect();
      countObserver?.disconnect();
      window.removeEventListener("scroll", scheduleParallax);
      window.removeEventListener("resize", scheduleParallax);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
