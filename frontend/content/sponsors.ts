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
  /**
   * How the logo shows its colour on hover, on the black cell. "lift" (the
   * default) inverts lightness but keeps hue, for logos drawn dark on light;
   * "original" shows the file as is, for logos whose colours already read on
   * black; "text" keeps the colours as they are and turns only the dark parts
   * (the lettering) white, for logos with bright colour beside dark type.
   */
  hover?: "lift" | "original" | "text";
  /** Extra saturation for the hover colour, for logos whose colour comes out faint. */
  hoverSaturate?: number;
  /** The logo carries its own tones (stripes, a shaded mark), so it is shown in greys, not as a flat silhouette. */
  tones?: boolean;
};

export const sponsors: readonly Sponsor[] = [
  {
    name: "Valor Capital Group",
    tier: "sponsor",
    hoverSaturate: 3,
    url: "https://valorcapitalgroup.com",
    logo: "/images/sponsors/valor.png",
    width: 591,
    height: 130,
    scale: 1.15,
  },
  {
    name: "Tako",
    tier: "sponsor",
    url: "https://tako.ai",
    logo: "/images/sponsors/tako.svg",
    width: 845,
    height: 295,
  },
  {
    name: "NXTP Ventures",
    tier: "sponsor",
    opaque: true,
    url: "https://nxtp.vc",
    logo: "/images/sponsors/nxtp.png",
    width: 506,
    height: 206,
  },
  {
    name: "iFood",
    tier: "sponsor",
    hover: "original",
    url: "https://www.ifood.com.br",
    logo: "/images/sponsors/ifood.png",
    width: 378,
    height: 200,
    scale: 1.15,
  },
  {
    name: "Fundação Behring",
    tier: "supporter",
    hover: "text",
    tones: true,
    onDark: { src: "/images/sponsors/behring-branco.png", width: 1200, height: 344 },
    url: "https://fundacaobehring.org",
    logo: "/images/sponsors/behring.png",
    width: 572,
    height: 168,
    scale: 1.2,
  },
  {
    name: "Fundação Estudar",
    tier: "supporter",
    hover: "text",
    tones: true,
    url: "https://www.estudar.org.br",
    logo: "/images/sponsors/fundacao-estudar.png",
    width: 482,
    height: 200,
    scale: 1.25,
  },
  {
    name: "Oracle",
    tier: "supporter",
    hover: "original",
    url: "https://www.oracle.com/br/",
    logo: "/images/sponsors/oracle.png",
    width: 294,
    height: 38,
    scale: 0.6,
  },
  {
    name: "AI Tinkerers",
    tier: "supporter",
    opaque: true,
    url: "https://aitinkerers.org",
    logo: "/images/sponsors/ai-tinkerers.png",
    width: 600,
    height: 131,
  },
] as const;
