"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";

/**
 * A heavier, eased wheel scroll so the page glides instead of jumping. Touch
 * keeps the phone's native scroll (the content must stay under the finger),
 * and Lenis already stands down under prefers-reduced-motion. It still moves
 * the real window, so sticky elements and the CSS scroll timelines are
 * unaffected.
 */
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      // Weight comes from a shorter step per wheel notch, not from lag: a low
      // lerp makes the page answer late, which reads as stuck. This one starts
      // moving on the first frame and glides out.
      lerp: 0.08,
      wheelMultiplier: 0.6,
    });
    return () => lenis.destroy();
  }, []);

  return null;
}
