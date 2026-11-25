/** Sponsors fund the event; supporters back it in kind. The page lists them apart. */
export type SponsorTier = "sponsor" | "supporter";

export type Sponsor = {
  name: string;
  tier: SponsorTier;
  url: string;
  logo: string;
  /** Intrinsic pixel size of the logo file, so next/image can reserve the box. */
  width: number;
  height: number;
  /** Optical size tweak for logos that read smaller than the rest at equal height. */
  scale?: number;
  /** The file has a white ground (opaque or a halo), so it cannot be shown as a silhouette. */
  opaque?: boolean;
  /**
   * The organisation's own light version for dark grounds, used at rest
   * instead of a filter. From htp-repo/slides/parceiros (the same files the
   * proposals use on black).
   */
  onDark?: { src: string; width: number; height: number };
  /** The logo carries its own tones (stripes, a shaded mark), so it is shown in greys, not as a flat silhouette. */
  tones?: boolean;
};

export const sponsors: readonly Sponsor[] = [
  {
    name: "Valor Capital Group",
    tier: "sponsor",
    url: "https://valorcapitalgroup.com",
    logo: "/images/sponsors/valor.png",
    width: 591,
    height: 130,
    scale: 1.15,
  },
  {
    name: "NXTP Ventures",
    tier: "sponsor",
    opaque: true,
    // NXTP's light file drops "VENTURES"; to keep one lockup in both states the
    // original is shown inverted at rest, swapped (not re-filtered) on hover.
    onDark: { src: "/images/sponsors/nxtp.png", width: 506, height: 206 },
    url: "https://nxtp.vc",
    logo: "/images/sponsors/nxtp.png",
    width: 506,
    height: 206,
  },
  {
    name: "iFood",
    tier: "sponsor",
    url: "https://www.ifood.com.br",
    logo: "/images/sponsors/ifood.png",
    width: 378,
    height: 200,
    scale: 1.15,
  },
  {
    name: "Oracle",
    tier: "supporter",
    url: "https://www.oracle.com/br/",
    logo: "/images/sponsors/oracle.png",
    width: 294,
    height: 38,
    scale: 0.6,
  },
  {
    name: "Fundação Estudar",
    tier: "supporter",
    tones: true,
    url: "https://www.estudar.org.br",
    logo: "/images/sponsors/fundacao-estudar.png",
    width: 482,
    height: 200,
    scale: 1.25,
  },
  {
    name: "AI Tinkerers",
    tier: "supporter",
    opaque: true,
    onDark: { src: "/images/sponsors/ai-tinkerers-branco.png", width: 1486, height: 265 },
    url: "https://aitinkerers.org",
    logo: "/images/sponsors/ai-tinkerers.png",
    width: 600,
    height: 131,
  },
  {
    name: "Fundação Behring",
    tier: "supporter",
    tones: true,
    onDark: { src: "/images/sponsors/behring-branco.png", width: 1200, height: 344 },
    url: "https://fundacaobehring.org",
    logo: "/images/sponsors/behring.png",
    width: 572,
    height: 168,
    scale: 1.2,
  },
] as const;
