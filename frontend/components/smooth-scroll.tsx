"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";

/**
 * Inertial scrolling: the wheel eases into position instead of stepping. It
 * wraps the browser's own scroll, so sticky stages, scroll listeners and
 * anchor links keep working. Off when the visitor prefers reduced motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.09,
      anchors: { offset: -16 },
    });

    return () => lenis.destroy();
  }, []);

  return null;
}
