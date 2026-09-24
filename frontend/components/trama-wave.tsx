"use client";

import { useEffect, useRef } from "react";

// The stepped H from the brand's monogram (Grafismos, Prancheta 14), in its
// own 300-unit box; the letter spans 67.35–232.65 × 68.67–231.33.
const H_PATH =
  "M104.11 68.67H67.35V231.33H104.11V182.94H150V150H104.11Z" +
  "M195.89 68.67V117.06H150V150H195.89V231.33H232.65V68.67Z";
const H_MIN = 67.35;
const H_SPAN = 232.65 - 67.35;

const PITCH = 70; // CSS px between H centres
const SIZE = 52; // CSS px per H
const CYCLE = 5000; // ms for one wave to cross a cell
const STEP = 90; // ms of delay per diagonal
const BASE = 0.1;
const PEAK = 0.95;

const smooth = (x: number) => x * x * (3 - 2 * x);

/** Brightness of a cell at a point in its cycle: up in the first fifth,
 *  back down by three fifths, then resting. */
function pulse(phase: number) {
  if (phase < 0.2) return smooth(phase / 0.2);
  if (phase < 0.6) return smooth(1 - (phase - 0.2) / 0.4);
  return 0;
}

/**
 * The brand's trama (a grid of stepped Hs) with a diagonal wave lighting the
 * letters up in turn. Drawn on one canvas rather than hundreds of animated
 * elements, so it stays cheap on phones; it pauses while off screen or in a
 * background tab, and holds still under prefers-reduced-motion.
 */
export function TramaWave() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const letter = new Path2D(H_PATH);
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cols = 0;
    let rows = 0;
    let frame = 0;
    let visible = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(canvas.clientWidth / PITCH) + 1;
      rows = Math.ceil(canvas.clientHeight / PITCH) + 1;
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      ctx.fillStyle = "#7a94fd";
      const scale = SIZE / H_SPAN;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const phase = motion.matches
            ? 1
            : ((((time - (r + c) * STEP) % CYCLE) + CYCLE) % CYCLE) / CYCLE;
          ctx.globalAlpha = BASE + (PEAK - BASE) * pulse(phase);
          ctx.save();
          // Offset a quarter pitch so the grid bleeds off the top-left edge.
          const inset = (PITCH - SIZE) / 2 - PITCH / 4;
          ctx.translate(c * PITCH + inset, r * PITCH + inset);
          ctx.scale(scale, scale);
          ctx.translate(-H_MIN, -68.67);
          ctx.fill(letter);
          ctx.restore();
        }
      }
    };

    const loop = (time: number) => {
      draw(time);
      frame = visible && !motion.matches ? requestAnimationFrame(loop) : 0;
    };
    const start = () => {
      if (!frame) frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    resize();
    draw(performance.now());
    start();

    const onResize = () => {
      resize();
      draw(performance.now());
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && !document.hidden;
      if (visible) start();
      else stop();
    });
    observer.observe(canvas);
    const onVisibility = () => {
      visible = !document.hidden;
      if (visible) start();
      else stop();
    };
    const onMotion = () => {
      draw(performance.now());
      start();
    };

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    motion.addEventListener("change", onMotion);
    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      motion.removeEventListener("change", onMotion);
    };
  }, []);

  return <canvas ref={ref} className="hero-trama" aria-hidden="true" />;
}
