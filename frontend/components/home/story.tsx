"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./story.module.css";

/**
 * A pinned scroll story told by one system of 200 squares: one idea, which
 * lands on João Pessoa while the other 199 draw Brazil around it; the 200
 * seated for day one; the 100 who build on day two (grouped in fours); and
 * finally those 100 drawing the stepped H.
 * Positions are interpolated between formations by scroll; nothing is cut.
 */

type Chapter = { key: string; title: string; body: string };

const COPY: Record<"pt" | "en", Chapter[]> = {
  pt: [
    { key: "ideia", title: "Tudo começa com uma ideia.", body: "Uma só. Pode ser a sua." },
    { key: "chegar", title: "Estudantes de todos os cursos e cidades.", body: "Não importa de onde você vem, só para onde quer ir." },
    { key: "encontro", title: "De todo o Brasil para João Pessoa.", body: "Um ponto de encontro no Nordeste." },
    { key: "conectar", title: "Dia 01. Palestras, talks e empresas.", body: "Aberto a todos. Mais de 200 pessoas no mesmo lugar." },
    { key: "construir", title: "Dia 02. Cem selecionados constroem.", body: "Do zero ao pitch final, com mentores e judges do lado." },
    { key: "subir", title: "Hackeie o seu caminho.", body: "20 e 21 de fevereiro de 2027, na Grande João Pessoa." },
  ],
  en: [
    { key: "ideia", title: "It starts with one idea.", body: "Just one. It could be yours." },
    { key: "chegar", title: "Students from every major and city.", body: "Where you come from matters less than where you are going." },
    { key: "encontro", title: "From all over Brazil to João Pessoa.", body: "One meeting point in the Northeast." },
    { key: "conectar", title: "Day 01. Talks, panels and companies.", body: "Open to everyone. More than 200 people in one place." },
    { key: "construir", title: "Day 02. A hundred selected build.", body: "From zero to the final pitch, mentors and judges beside you." },
    { key: "subir", title: "Hack your own path.", body: "20–21 February 2027, Greater João Pessoa." },
  ],
};

const N = 200;
const BLUE = [122, 148, 253];
const WHITE = [255, 255, 255];
const GREY = [60, 60, 60];

type Pt = { x: number; y: number };

/** Deterministic pseudo-random so server and client agree and reloads match. */
function rand(seed: number) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/** The stepped H on a 12×13 grid: two 3-wide stems, the left arm low, the right arm high. */
const H_CELLS: [number, number][] = [];
for (let r = 0; r < 13; r++) for (const c of [0, 1, 2, 9, 10, 11]) H_CELLS.push([c, r]);
for (let r = 7; r < 10; r++) for (let c = 3; c < 6; c++) H_CELLS.push([c, r]);
for (let r = 4; r < 7; r++) for (let c = 6; c < 9; c++) H_CELLS.push([c, r]);
// 96 cells; the remaining 4 of the 100 double up on the last ones.

/**
 * Brazil on a 21×21 grid, rasterised from the Natural Earth outline
 * (johan/world.geo.json, BRA). 200 cells; the first is João Pessoa, the
 * easternmost cell, and the rest are ordered by distance from it.
 */
const BRAZIL: [number, number][] = [[20, 6], [19, 6], [20, 7], [19, 5], [19, 7], [18, 6], [18, 5], [18, 7], [19, 8], [18, 8], [17, 6], [17, 5], [17, 7], [17, 4], [17, 8], [18, 9], [16, 6], [16, 5], [16, 7], [17, 9], [16, 4], [16, 8], [18, 10], [15, 6], [16, 9], [17, 10], [15, 5], [15, 7], [15, 4], [15, 8], [18, 11], [16, 10], [15, 9], [17, 11], [14, 6], [14, 5], [14, 7], [14, 4], [14, 8], [15, 10], [16, 11], [14, 3], [14, 9], [17, 12], [13, 6], [13, 5], [13, 7], [15, 11], [14, 10], [16, 12], [13, 4], [13, 8], [13, 3], [13, 9], [17, 13], [14, 11], [15, 12], [12, 6], [12, 5], [12, 7], [13, 10], [16, 13], [12, 4], [12, 8], [14, 12], [12, 3], [12, 9], [17, 14], [13, 11], [15, 13], [12, 2], [12, 10], [16, 14], [11, 6], [11, 5], [11, 7], [11, 4], [11, 8], [13, 12], [14, 13], [12, 11], [15, 14], [11, 3], [11, 9], [11, 2], [11, 10], [13, 13], [10, 6], [12, 12], [14, 14], [10, 5], [10, 7], [10, 4], [10, 8], [11, 11], [10, 3], [10, 9], [12, 13], [13, 14], [10, 2], [10, 10], [11, 12], [14, 15], [9, 6], [9, 5], [9, 7], [9, 4], [9, 8], [10, 11], [12, 14], [9, 3], [9, 9], [11, 13], [13, 15], [10, 12], [9, 2], [9, 10], [8, 6], [8, 5], [8, 7], [11, 14], [12, 15], [9, 11], [8, 4], [8, 8], [10, 13], [13, 16], [8, 3], [8, 9], [9, 12], [8, 2], [8, 10], [11, 15], [10, 14], [12, 16], [7, 6], [8, 11], [7, 5], [7, 7], [9, 13], [13, 17], [7, 4], [7, 8], [7, 3], [7, 9], [10, 15], [11, 16], [7, 2], [7, 10], [9, 14], [12, 17], [7, 1], [7, 11], [6, 6], [6, 5], [6, 7], [6, 4], [6, 8], [10, 16], [11, 17], [6, 3], [6, 9], [12, 18], [6, 2], [6, 1], [10, 17], [5, 6], [11, 18], [5, 5], [5, 7], [5, 4], [5, 8], [5, 3], [5, 2], [10, 18], [5, 1], [11, 19], [4, 6], [4, 5], [4, 7], [4, 4], [4, 3], [9, 18], [10, 19], [4, 2], [3, 6], [3, 5], [3, 7], [3, 4], [3, 3], [3, 2], [2, 6], [2, 5], [2, 7], [2, 4], [2, 3], [1, 6], [1, 5], [1, 7], [0, 6]];
const MAP_SIZE = 21;
const LAST = 5;

function smooth(t: number) {
  const c = Math.min(1, Math.max(0, t));
  return c * c * (3 - 2 * c);
}

export function Story({ locale, tone = "dark" }: { locale: "pt" | "en"; tone?: "dark" | "light" }) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // `chapter` follows the scroll and drives the index; `shown` is the chapter
  // whose copy is on screen, or -1 between chapters, while the squares move.
  const [chapter, setChapter] = useState(0);
  const [shown, setShown] = useState(0);
  const chapters = COPY[locale];

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const INK = tone === "light" ? [0, 0, 0] : WHITE;
    const FADE = tone === "light" ? [229, 229, 228] : GREY;
    const MUTED = tone === "light" ? [158, 158, 158] : GREY.map((v) => v * 2.6);
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let visible = false;
    let lastChapter = -1;
    let lastShown = -2;

    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    };

    // Formation layout: the art lives in the right half on desktop, the top
    // half on phones, so the chapter copy never sits under the squares.
    const frame = () => {
      const wide = w >= 900;
      const size = wide ? Math.min(w * 0.42, h * 0.72, 620) : Math.min(w * 0.86, h * 0.46);
      const cx = wide ? w * 0.68 : w / 2;
      const cy = wide ? h / 2 : h * 0.34;
      return { size, cx, cy };
    };

    // `swirl` turns the crowd; `turn` walks each team of four round its square.
    const formations = (t: number, swirl: number, turn: number) => {
      const { size, cx, cy } = frame();
      // Each formation returns, per particle: position, cell size, colour, alpha.
      const scatter = (i: number): Pt => {
        const a = rand(i + 1) * Math.PI * 2;
        const r = Math.sqrt(rand(i + 101)) * size * 0.62;
        const drift = motion.matches ? 0 : 1;
        const b = a + swirl;
        return {
          x: cx + Math.cos(b) * r * 1.25 + Math.sin(t * 0.0006 + i) * 6 * drift,
          y: cy + Math.sin(b) * r + Math.cos(t * 0.0005 + i * 1.7) * 6 * drift,
        };
      };
      const mapCell = size / MAP_SIZE;
      const map = (i: number): Pt => {
        const [c, r] = BRAZIL[i];
        return {
          x: cx - (MAP_SIZE * mapCell) / 2 + (c + 0.5) * mapCell,
          y: cy - (MAP_SIZE * mapCell) / 2 + (r + 0.5) * mapCell,
        };
      };
      const gridCell = size / 20;
      const grid = (i: number): Pt => ({
        x: cx - size / 2 + (i % 20 + 0.5) * gridCell,
        y: cy - (10 * gridCell) / 2 + (Math.floor(i / 20) + 0.5) * gridCell,
      });
      // The 100 builders are every other seat, so the selection reads as spread out.
      const teamCell = size / 13;
      // The four corners of a team, in order round the square.
      const ring = [[0, 0], [1, 0], [1, 1], [0, 1]];
      const team = (k: number): Pt => {
        const g = Math.floor(k / 4);
        const gx = g % 5;
        const gy = Math.floor(g / 5);
        const step = (k % 4) + turn;
        const a = ring[Math.floor(step) % 4];
        const b = ring[(Math.floor(step) + 1) % 4];
        const f = smooth(step - Math.floor(step));
        const mx = a[0] + (b[0] - a[0]) * f;
        const my = a[1] + (b[1] - a[1]) * f;
        return {
          x: cx - (size * 0.92) / 2 + (gx * 2.6 + mx + 0.5) * teamCell,
          y: cy - (size * 0.92) / 2 + (gy * 2.6 + my + 0.5) * teamCell,
        };
      };
      const hCell = size / 13;
      const hPos = (k: number): Pt => {
        const [c, r] = H_CELLS[Math.min(k, H_CELLS.length - 1)];
        return { x: cx - (12 * hCell) / 2 + (c + 0.5) * hCell, y: cy - (13 * hCell) / 2 + (r + 0.5) * hCell };
      };
      return { scatter, map, mapCell, grid, team, hPos, hCell, gridCell, teamCell, size, cx, cy, t };
    };

    const draw = (now: number) => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const runway = Math.max(1, section.offsetHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, -rect.top / runway)); // 0 → 1 over the story
      // u walks 0 → 6 across six equal chapters. Inside each chapter the
      // squares rest from 0.2 to 0.8 and play that chapter's own motion; the
      // move to the next formation happens across the boundary (0.8 → 1.2),
      // and the copy is off screen for that whole stretch.
      const u = p * (LAST + 1);
      const current = Math.min(LAST, Math.floor(u));
      const v = u - current;
      const copyOn = current === LAST ? v >= 0.22 : v >= (current === 0 ? 0.08 : 0.22) && v <= 0.72;
      const nextShown = copyOn ? current : -1;
      if (current !== lastChapter) {
        lastChapter = current;
        setChapter(current);
      }
      if (nextShown !== lastShown) {
        lastShown = nextShown;
        setShown(nextShown);
      }

      const tr = (i: number) => smooth((u - (i + 0.8)) / 0.4); // chapter i → i + 1
      const rest = (i: number) => Math.min(1, Math.max(0, (u - i - 0.2) / (i === LAST ? 0.7 : 0.6)));
      const t1 = tr(0); // idea → crowd
      const t2 = tr(1); // crowd → Brazil
      const t3 = tr(2); // Brazil → day-one grid
      const t4 = tr(3); // grid → teams
      const t5 = tr(4); // teams → H
      const [r0, r1, r2, r3, r4, r5] = [0, 1, 2, 3, 4, 5].map(rest);
      // João Pessoa is labelled while the map rests, and gone before it moves.
      const spot = smooth((u - 2.15) / 0.1) * (1 - smooth((u - 2.72) / 0.08));

      const f = formations(now, (r1 - 0.5) * 0.7 * (1 - t2), r4 * 3);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < N; i++) {
        const builder = i % 2 === 0;
        const k = i >> 1; // index among the 100 builders
        const lerp = (a: Pt, b: Pt, t: number): Pt => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });

        // Position chain.
        let pos: Pt = { x: f.cx, y: f.cy };
        pos = lerp(pos, f.scatter(i), t1);
        pos = lerp(pos, f.map(i), t2); // the idea square is BRAZIL[0]: João Pessoa
        pos = lerp(pos, f.grid(i), t3);
        if (builder) {
          pos = lerp(pos, f.team(k), t4);
          pos = lerp(pos, f.hPos(k), t5);
        } else {
          // Those not building sink and fade out on day two.
          pos = { x: pos.x, y: pos.y + t4 * f.size * 0.25 };
        }

        // Size: one large square at the start, then the cell of each formation.
        const startSize = f.size * 0.16;
        // Idea: the square grows while it rests.
        let sz = i === 0 ? startSize * (1 + r0 * 0.3) + (f.gridCell * 0.62 - startSize * (1 + r0 * 0.3)) * t1 : f.gridCell * 0.62;
        sz += (f.mapCell * 0.78 - sz) * t2;
        if (i === 0) sz *= 1 + spot * 0.35;
        sz += (f.gridCell * 0.72 - sz) * t3;
        if (builder) {
          sz += (f.teamCell * 0.86 - sz) * t4;
          sz += (f.hCell * 1.02 - sz) * t5; // the gaps close: the grid becomes one solid H
        }

        // Colour and alpha.
        let alpha = i === 0 ? 1 : t1; // only the first square exists in the idea chapter
        let col = i % 5 === 0 ? BLUE : i % 7 === 0 ? MUTED : INK;
        // On the map everything is ink and grey, so João Pessoa is the only blue.
        col = mix(col, i % 6 === 0 ? MUTED : INK, t2);
        col = mix(col, i % 3 === 0 ? BLUE : INK, t3);
        // Map: a blue wave runs across the country towards João Pessoa (the
        // cells are ordered by distance from it, so i / N is that distance).
        const onMap = t2 * (1 - t3);
        if (onMap > 0 && i > 0) {
          const wave = Math.max(0, 1 - Math.abs(i / N - (1 - r2)) / 0.07);
          col = mix(col, BLUE, wave * onMap);
        }
        // Day one: a blue sweep crosses the 200 seats, column by column.
        const onGrid = t3 * (1 - t4);
        if (onGrid > 0) {
          const sweep = Math.max(0, 1 - Math.abs((i % 20) / 19 - r3 * 1.2 + 0.1) / 0.12);
          col = mix(col, BLUE, sweep * onGrid);
          sz *= 1 + sweep * onGrid * 0.25;
        }
        if (builder) {
          col = mix(col, Math.floor(k / 4) % 2 === 0 ? BLUE : INK, t4);
          // The H forms in ink and fills with blue from the bottom up as it rests.
          const row = H_CELLS[Math.min(k, H_CELLS.length - 1)][1];
          const fill = smooth((r5 * 1.25 - (12 - row) / 12) / 0.15);
          col = mix(col, mix(INK, BLUE, fill), t5);
        } else {
          col = mix(col, FADE, t4);
          alpha *= 1 - t4;
        }
        if (i === 0 && t3 < 1) col = BLUE;
        if (alpha <= 0.01) continue;

        ctx.globalAlpha = alpha;
        ctx.fillStyle = `rgb(${col[0] | 0},${col[1] | 0},${col[2] | 0})`;
        ctx.fillRect(pos.x - sz / 2, pos.y - sz / 2, sz, sz);
      }
      ctx.globalAlpha = 1;

      // Idea: outlines ripple out from the square while it rests.
      if (r0 > 0 && t1 < 1) {
        const base = f.size * 0.16 * (1 + r0 * 0.3);
        for (const k of [0, 0.5]) {
          const ph = (r0 * 2 + k) % 1;
          const half = (base / 2) * (1 + ph * 1.6);
          ctx.strokeStyle = `rgba(${BLUE.join(",")},${(1 - ph) * (1 - t1) * 0.8})`;
          ctx.lineWidth = 1.5;
          ctx.strokeRect(f.cx - half, f.cy - half, half * 2, half * 2);
        }
      }

      // João Pessoa: a pulsing outline and a label on a leader line above it.
      if (spot > 0.01) {
        const jp = f.map(0);
        const half = (f.mapCell * 0.78 * 1.35) / 2;
        const pulse = motion.matches ? 0.5 : (now % 1600) / 1600;
        ctx.strokeStyle = `rgba(${BLUE.join(",")},${(1 - pulse) * spot})`;
        ctx.lineWidth = 1.5;
        const r = half + 4 + pulse * f.mapCell * 1.4;
        ctx.strokeRect(jp.x - r, jp.y - r, r * 2, r * 2);

        const ink = tone === "light" ? "0,0,0" : "255,255,255";
        const top = f.cy - (MAP_SIZE * f.mapCell) / 2 - 8;
        ctx.strokeStyle = `rgba(${ink},${spot})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(jp.x, jp.y - half - 6);
        ctx.lineTo(jp.x, top);
        ctx.stroke();
        ctx.fillStyle = `rgba(${ink},${spot})`;
        ctx.font = `600 13px ${getComputedStyle(canvas).fontFamily}`;
        ctx.textAlign = "right";
        ctx.textBaseline = "bottom";
        ctx.fillText("João Pessoa", jp.x + 6, top - 6);
      }

      if (visible && !motion.matches) raf = requestAnimationFrame(draw);
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) schedule();
    });

    resize();
    schedule();
    io.observe(section);
    const onResize = () => {
      resize();
      schedule();
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", schedule, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", schedule);
    };
  }, [tone]);

  return (
    <section ref={sectionRef} className={styles.story} data-tone={tone} aria-label={chapters[LAST].title}>
      <div className={styles.stage}>
        <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />

        <div className={styles.copy}>
          {chapters.map((c, i) => (
            <div key={c.key} className={styles.chapter} data-active={i === shown} data-ahead={i > chapter}>
              <h2 className={styles.title}>{c.title}</h2>
              <p className={styles.body}>{c.body}</p>
            </div>
          ))}
        </div>

        <ol className={styles.index} aria-hidden="true">
          {chapters.map((c, i) => (
            <li key={c.key} data-active={i === chapter} data-done={i < chapter}>
              <span className={styles.indexDash} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function mix(a: number[], b: number[], t: number) {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}
