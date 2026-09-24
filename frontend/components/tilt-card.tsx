"use client";

import { useRef } from "react";

/**
 * Leans up to 3° towards the pointer, like a door starting to swing, and
 * settles back on leave. Only fine pointers get it; the CSS ignores the
 * variables under reduced motion.
 */
export function TiltCard({ className, children }: { className: string; children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--tilt-x", `${(-y * 6).toFixed(2)}deg`);
    el.style.setProperty("--tilt-y", `${(x * 6).toFixed(2)}deg`);
  };

  const onPointerLeave = () => {
    ref.current?.style.setProperty("--tilt-x", "0deg");
    ref.current?.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <article
      ref={ref}
      className={`tilt-card ${className}`}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {children}
    </article>
  );
}
