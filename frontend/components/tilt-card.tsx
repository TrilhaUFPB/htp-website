"use client";

import { useRef } from "react";

/**
 * Leans up to 3° towards the pointer, like a door starting to swing, and
 * settles back on leave. Mouse only; the CSS drops it under reduced motion.
 *
 * The card's box is measured once on enter: measuring on every move would
 * read the already-tilted box and feed the tilt back into itself. Moves are
 * applied once per frame, and the CSS transition only eases the first lean
 * and the settle, so the card tracks the pointer instead of chasing it.
 */
export function TiltCard({ className, children }: { className: string; children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const box = useRef<DOMRect | null>(null);
  const frame = useRef(0);
  const settle = useRef(0);

  const onPointerEnter = (event: React.PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (event.pointerType !== "mouse" || !el) return;
    box.current = el.getBoundingClientRect();
    window.clearTimeout(settle.current);
    // Let the transition ease the first lean, then track directly.
    settle.current = window.setTimeout(() => el.setAttribute("data-tracking", ""), 220);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const el = ref.current;
    const rect = box.current;
    if (event.pointerType !== "mouse" || !el || !rect) return;
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    window.cancelAnimationFrame(frame.current);
    frame.current = window.requestAnimationFrame(() => {
      el.style.setProperty("--tilt-x", `${(-y * 6).toFixed(2)}deg`);
      el.style.setProperty("--tilt-y", `${(x * 6).toFixed(2)}deg`);
    });
  };

  const onPointerLeave = () => {
    const el = ref.current;
    if (!el) return;
    box.current = null;
    window.clearTimeout(settle.current);
    window.cancelAnimationFrame(frame.current);
    el.removeAttribute("data-tracking");
    el.style.setProperty("--tilt-x", "0deg");
    el.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <article
      ref={ref}
      className={`tilt-card ${className}`}
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {children}
    </article>
  );
}
