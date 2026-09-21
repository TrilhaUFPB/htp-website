"use client";

import { useEffect, useRef } from "react";

/**
 * A header that stays out of the way: transparent over the hero at the top of
 * the page, gone once you scroll down, and back on a solid surface as soon as
 * you scroll up. The mode lives in a data attribute so the styling stays in CSS.
 *
 * Direction is accumulated rather than acted on per event, so a trackpad's
 * jitter around a turning point cannot flicker the header.
 */
export function ScrollHeader({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = ref.current;
    if (!header) return;

    const hero = document.querySelector(".scroll-hero");

    let previous = Math.max(0, window.scrollY);
    let travel = 0;
    let direction = 0;
    let frame = 0;

    const update = () => {
      frame = 0;
      const heroBounds = hero?.getBoundingClientRect();
      header.dataset.heroVisible = String(Boolean(heroBounds && heroBounds.bottom > 0 && heroBounds.top < window.innerHeight));
      const y = Math.max(0, window.scrollY);
      const delta = y - previous;
      previous = y;

      if (y <= 20) {
        header.dataset.mode = "top";
        travel = 0;
        direction = 0;
        return;
      }

      if (!delta) return;

      const nextDirection = delta > 0 ? 1 : -1;
      travel = nextDirection === direction ? travel + Math.abs(delta) : Math.abs(delta);
      direction = nextDirection;

      if (travel >= 8) {
        header.dataset.mode = direction === -1 ? "visible" : "hidden";
      }
    };

    header.dataset.mode = window.scrollY <= 20 ? "top" : "hidden";

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <header ref={ref} className="site-header" data-mode="top">
      {children}
    </header>
  );
}
