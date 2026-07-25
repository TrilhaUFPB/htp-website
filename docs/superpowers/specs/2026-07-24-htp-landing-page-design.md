# Hack The Path — Landing Page Design Spec

**Location of app:** `frontend/` (Next.js 16, React 19, Tailwind v4)

## 1. Overview

A single-page, scroll-based marketing landing page for **Hack The Path (HTP)** — a
university hackathon at UFPB (João Pessoa) organized by the Trilha project. The page's
primary goal is to explain the event and drive registrations via an external **Luma**
event page.

The design follows the existing HTP brand deck: bold, high-contrast, "op-art" visual
language (checkerboard + radial sunburst + arrow motifs) using periwinkle blue, black,
and white, with the Google Sans Flex variable font.

## 2. Goals & Non-Goals

**Goals**
- Communicate what Hack The Path is and its two-day format.
- Drive clicks to the external Luma registration page (primary conversion).
- Reflect the bold, animated brand identity with rich motion.
- Be fully responsive and accessible (including `prefers-reduced-motion`).
- Keep all copy, dates, and links in one editable place.

**Non-Goals (v1)**
- No custom registration form or backend (registration is handled by Luma).
- No CMS — content is code-defined.
- No multi-page routing.
- No bilingual support — Portuguese (PT-BR) only.
- No speakers/mentors section and no "Sobre o Trilha" standalone section in v1
  (Trilha stats appear inline within "Sobre o evento").

## 3. Brand System

- **Colors:**
  - Periwinkle blue: `#7A94FD`
  - Black: `#000000`
  - White: `#FFFFFF`
- **Typography:** Google Sans Flex (variable) — already wired into the scaffold as
  `--font-google-sans-flex`. Oversized uppercase headings leveraging weight/width axes.
- **Logo assets** (in `frontend/public/images/logo/`):
  - `HTP` square badge and the boxed `HACK THE PATH` wordmark (PNG + SVG variants).
- **Motifs** (rebuilt as reusable React SVG components, not raster assets):
  checkerboard, radial sunburst, diagonal arrow.

## 4. Theme & Section Rhythm

Dark-first, poster-style layout where sections alternate between **black**,
**periwinkle**, and **white** panels for high-contrast editorial rhythm. Op-art motifs
are used as animated section accents and must never reduce text legibility (maintain WCAG
AA contrast for body copy).

## 5. Page Structure (scroll flow)

1. **Sticky Nav** — `HTP` badge (left); anchor links: Sobre · Cronograma ·
   Patrocinadores · FAQ; `Inscreva-se` button → Luma (right). Mobile: hamburger menu.
2. **Hero** (black) — animated sunburst/checkerboard backdrop; `HACK THE PATH` wordmark;
   tagline **"A nossa voz define o futuro."**; `20–21 de Fevereiro de 2027 · João Pessoa
   – UFPB`; primary CTA **Inscreva-se** (Luma) + secondary **Saiba mais** (scrolls to
   Sobre).
3. **Sobre o evento** (white) — short intro to HTP; two-day format as two cards:
   - **Dia 01 — Imersão e Código**: hackathon presencial, 80–100 participantes, equipes
     selecionadas por histórico/experiência, apoio de mentores (8h–22h).
   - **Dia 02 — Conexão e Mercado**: aberto ao público (~250), apresentação de projetos,
     pitches finais, palestras, coffee break, painéis de inovação, feira de carreiras,
     cerimônia de premiação (8h–21h).
   - Stat strip: `48h de inovação` · `~250 participantes` · `UFPB · João Pessoa`.
4. **Cronograma** (periwinkle) — timeline for Dia 01 and Dia 02 (stacked on mobile,
   two-column on desktop), built from the event PDF.
5. **Patrocinadores** (black) — "Seja um patrocinador" pitch + placeholder logo grid
   with tier structure; CTA to email/Instagram.
6. **FAQ** (white) — accordion of drafted Q&As (quem pode participar, custo/ingresso,
   formato das equipes, o que levar, onde acontece, etc.).
7. **Final CTA + Footer** (periwinkle → black) — full-bleed **"Aceite o desafio"** with
   Luma button; footer with socials (@trilhaufpb, @hackingthepath),
   site (hackthepath.com.br), contact email, and UFPB/Trilha credit.

## 6. Architecture

```
frontend/
  app/
    layout.tsx            # fonts, metadata (updated), lang="pt-BR"
    page.tsx              # composes sections in order
    globals.css           # theme tokens (brand colors), base styles
  components/
    layout/   Nav.tsx, Footer.tsx
    sections/ Hero.tsx, About.tsx, Schedule.tsx, Sponsors.tsx, Faq.tsx, FinalCta.tsx
    brand/    HtpBadge.tsx, Wordmark.tsx, Checkerboard.tsx, Sunburst.tsx, ArrowMark.tsx
    ui/       Button.tsx, Reveal.tsx, Section.tsx, Accordion.tsx
  content/
    site.ts               # single source of truth: copy, dates, links, schedule, FAQ, socials
```

**Design principles**
- Each section is a self-contained component consuming data from `content/site.ts`.
- Brand motif components are pure, prop-driven SVG (color, size, animation flags) — crisp
  at any scale, no large image files.
- `Reveal` wraps children with viewport-triggered enter animations (run once).
- `Section` provides consistent padding, max-width, and background-variant handling
  (black/white/periwinkle).

## 7. Content Source of Truth (`content/site.ts`)

Typed objects for:
- `event`: name, date string ("20–21 de Fevereiro de 2027"), location, taglines.
- `links`: `luma` (configurable placeholder until real URL provided), instagram handles,
  website, contact email.
- `about`: intro copy, two day-cards, stats.
- `schedule`: array of `{ day, title, items: [{ time, label }] }`.
- `sponsors`: tiers + placeholder slots + sponsor-CTA copy.
- `faq`: array of `{ question, answer }`.
- `nav`: anchor items.

> **Open placeholder:** the real Luma URL. Until provided, `links.luma` is a clearly
> marked placeholder constant.

## 8. Motion (via `motion` / motion.dev)

- **Hero:** slow-rotating/scaling sunburst + subtly shifting checkerboard; wordmark + CTA
  stagger in on load.
- **Scroll:** headings and cards reveal with staggered fade/slide, viewport-triggered,
  run once.
- **Hover:** buttons/cards get op-art offset/"glitch" accent; animated nav underlines.
- **Accessibility:** all motion respects `prefers-reduced-motion` and degrades to static;
  content is fully readable without JS-driven animation.

## 9. Accessibility & Performance

- Semantic landmarks (`header`, `main`, `nav`, `section`, `footer`), proper heading order.
- Keyboard-navigable nav, buttons, and FAQ accordion; visible focus states.
- WCAG AA contrast for body text on every background variant.
- Motifs are decorative (`aria-hidden`).
- Images optimized via `next/image`; SVG motifs are inline and lightweight.
- Lazy/viewport-gated animations to avoid jank.

## 10. Testing / Verification

- Build passes (`pnpm build`) and lint passes (`pnpm lint`).
- Manual responsive check at mobile / tablet / desktop breakpoints.
- Verify all anchor links scroll correctly and the Luma CTA opens in a new tab.
- Verify `prefers-reduced-motion` disables animation.
- Screenshots of each major section for review.

## 11. Decisions Log

- **Event date:** 20–21 de Fevereiro de **2027**, João Pessoa – UFPB (user-confirmed;
  overrides conflicting dates in source PDFs).
- **Registration:** external **Luma** link (not Sympla, not a custom form).
- **Scope:** single-page scroll; sections = Hero, Sobre o evento, Cronograma,
  Patrocinadores, FAQ, Final CTA + Footer.
- **Motion:** rich/high-energy via the `motion` library.
- **Language:** PT-BR only.
