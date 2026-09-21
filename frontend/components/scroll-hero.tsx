"use client";

import { useEffect, useRef } from "react";

/** Holds the full-screen hero while the artwork moves, then reveals the page frame. */
export function ScrollHero({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    const stage = stageRef.current;
    if (!element || !stage) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let previousScroll = window.scrollY;
    let scrolling = false;

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
      let travelled = -element.getBoundingClientRect().top;
      const upwardDistance = previousScroll - window.scrollY;
      // Shorten the return trip only inside the pinned hero. Record the adjusted
      // position so our own scroll event cannot recursively accelerate itself.
      // Large navigation jumps keep their exact destination.
      if (scrolling && !motion.matches && upwardDistance > 0 &&
          upwardDistance < stage.offsetHeight / 2 && travelled > 0 && travelled < distance) {
        const extra = Math.min(travelled, upwardDistance * 1.5);
        window.scrollTo({ top: window.scrollY - extra, behavior: "instant" });
        travelled = -element.getBoundingClientRect().top;
      }
      previousScroll = window.scrollY;
      scrolling = false;
      const progress = motion.matches
        ? 1
        : Math.min(1, Math.max(0, travelled / distance));
      // Keep the end of the pinned hero dark; return the artwork after it exits.
      const journey = progress;
      const exitProgress = Math.max(0, (travelled - distance) / stage.offsetHeight);
      const returnPhase = Math.min(1, Math.max(0, exitProgress / 0.55));
      const returnEase = returnPhase * returnPhase * (3 - 2 * returnPhase);
      const reveal = Math.min(1, Math.max(0, (progress - 0.85) / 0.15));
      const easedReveal = reveal * reveal * (3 - 2 * reveal);
      // A single light swell near the end of the tunnel, fading before exit.
      const beamPhase = Math.min(1, Math.max(0, (journey - 0.48) / 0.42));
      const beams = motion.matches ? 0 : Math.sin(beamPhase * Math.PI) ** 2;
      // Ease into a faster turn during the last stretch without a speed jump.
      const finale = Math.max(0, (journey - 0.78) / 0.22);
      const rotation = journey * 5 + finale * finale * 12 + returnEase * 8;
      // Travel into the aperture until its empty center fills the frame.
      const zoomPhase = Math.min(1, Math.max(0, (journey - 0.45) / 0.5));
      const inwardZoom = 1 + journey * 0.2 + zoomPhase * zoomPhase * 5;
      const zoom = inwardZoom + (1.2 - inwardZoom) * returnEase;
      element.style.setProperty("--hero-zoom", String(motion.matches ? 1 : zoom));
      element.style.setProperty("--hero-rotation", `${motion.matches ? 0 : rotation}deg`);
      element.style.setProperty("--hero-beams", String(beams));
      element.style.setProperty("--hero-progress", String(easedReveal));
      element.style.setProperty("--hero-motion", String(motion.matches ? 0 : progress));
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const onScroll = () => {
      scrolling = true;
      schedule();
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", schedule);
    motion.addEventListener("change", schedule);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
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
