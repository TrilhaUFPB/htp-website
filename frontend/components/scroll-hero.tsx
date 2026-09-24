"use client";

import { useEffect, useRef } from "react";

/**
 * Pins the hero while it contracts from full-bleed into the page frame and
 * its glow sinks. Publishes --hero-progress (the frame, eased, starting
 * halfway down the runway) and --hero-motion (raw progress, for the glow).
 */
export function ScrollHero({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    const stage = stageRef.current;
    if (!element || !stage) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      if (motion.matches) {
        element.style.setProperty("--hero-progress", "1");
        element.style.setProperty("--hero-motion", "0");
        return;
      }
      // Measured against the sticky stage's own travel rather than
      // window.scrollY, so svh (CSS) and innerHeight (JS) never get mixed
      // while mobile toolbars collapse.
      const distance = Math.max(1, element.offsetHeight - stage.offsetHeight);
      const progress = Math.min(1, Math.max(0, -element.getBoundingClientRect().top / distance));
      const reveal = Math.min(1, Math.max(0, (progress - 0.35) / 0.65));
      element.style.setProperty("--hero-progress", String(reveal * reveal * (3 - 2 * reveal)));
      element.style.setProperty("--hero-motion", String(progress));
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
    <section ref={ref} className="scroll-hero" aria-labelledby="hero-title">
      <div ref={stageRef} className="scroll-hero-stage">
        {children}
      </div>
    </section>
  );
}
