"use client";

import { useEffect, useRef } from "react";

import styles from "./dark-reveal.module.css";

/**
 * The white story hands over to the black half of the page in its own
 * language: the opening screen of the black half starts white and fills with
 * black squares behind its content, bottom rows first with a little jitter.
 * Scroll drives it both ways.
 */
export function DarkReveal({ children }: { children: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let cols = 0;
    let rows = 0;
    let cell = 0;
    let jitter: number[] = [];

    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      cols = w >= 900 ? 24 : 10;
      cell = w / cols;
      rows = Math.ceil(h / cell);
      jitter = Array.from({ length: cols * rows }, (_, i) => {
        const x = Math.sin((i + 1) * 12.9898) * 43758.5453;
        return x - Math.floor(x);
      });
    };

    const smooth = (t: number) => {
      const c = Math.min(1, Math.max(0, t));
      return c * c * (3 - 2 * c);
    };

    const draw = () => {
      frame = 0;
      const rect = canvas.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the band's top enters at the bottom of the screen, 1 when it is
      // a fifth of the way down.
      const p = motion.matches ? 1 : Math.min(1, Math.max(0, (vh - rect.top) / (vh * 0.8)));

      // Content marked data-fill shows only once the black has filled in
      // behind it: a row at height y is fully in when p * 1.5 passes its
      // distance from the bottom plus the full jitter and ramp (0.5). Fully
      // white-free means the row above it is in too.
      const items = cardRef.current?.querySelectorAll<HTMLElement>("[data-fill]") ?? [];
      for (const el of items) {
        const r = el.getBoundingClientRect();
        // Measured at its top edge (one cell above, for the squares' jitter), so
        // nothing shows while any white is left around it.
        const y = (r.top - cell - rect.top) / h;
        const fb = 1 - Math.min(1, Math.max(0, y));
        const delay = Number(el.dataset.fillDelay ?? 0);
        const o = motion.matches ? 1 : smooth((p * 1.5 - (fb + 0.5) - delay) / 0.15);
        el.style.opacity = o.toFixed(3);
        el.style.transform = o < 1 ? `translateY(${((1 - o) * 16).toFixed(1)}px)` : "";
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#000";
      for (let r = 0; r < rows; r++) {
        const fromBottom = (rows - 1 - r) / Math.max(1, rows - 1);
        for (let c = 0; c < cols; c++) {
          const d = fromBottom + jitter[r * cols + c] * 0.25;
          const k = smooth((p * 1.5 - d) / 0.25);
          if (k <= 0) continue;
          const s = cell * Math.min(1.02, k * 1.02);
          ctx.fillRect(c * cell + (cell - s) / 2, r * cell + (cell - s) / 2, s, s);
        }
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };
    const onResize = () => {
      resize();
      schedule();
    };

    resize();
    draw();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div ref={cardRef} className={styles.card}>
      <canvas ref={canvasRef} className={styles.pixels} aria-hidden="true" />
      {children}
    </div>
  );
}
