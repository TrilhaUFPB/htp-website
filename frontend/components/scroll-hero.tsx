"use client";

import { useEffect, useRef } from "react";

/**
 * Publishes scroll position through --hero-progress (0 at the top, 1 once the
 * hero's runway is spent) so the stage can contract into the page frame in CSS.
 * Reduced motion pins it at 1: the framed end state, no scroll choreography.
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
      // Progress is measured against the sticky stage's own travel: the stage
      // un-pins after the section has scrolled past by its own height minus the
      // stage's. Deriving it from the section's live offset rather than
      // window.scrollY keeps it correct wherever the hero sits in the document,
      // and comparing two measured elements avoids mixing svh (the CSS heights)
      // with the visual viewport (window.innerHeight), which differ on mobile
      // while the browser toolbars are collapsing.
      const distance = Math.max(1, element.offsetHeight - stage.offsetHeight);
      const travelled = -element.getBoundingClientRect().top;
      const progress = motion.matches
        ? 1
        : Math.min(1, Math.max(0, travelled / distance));
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

  return (
    <section ref={ref} className="scroll-hero" aria-labelledby="hero-title">
      <div ref={stageRef} className="scroll-hero-stage">
        {children}
      </div>
    </section>
  );
}
