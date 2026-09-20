"use client";

import { useEffect, useRef } from "react";

export function ScrollHeader({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = ref.current;
    if (!header) return;
    let previous = window.scrollY;
    let travel = 0;
    let direction = 0;
    let frame = 0;

    const update = () => {
      frame = 0;
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
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
    };
  }, []);

  return <header ref={ref} className="site-header scroll-header" data-mode="top">{children}</header>;
}
