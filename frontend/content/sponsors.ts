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
  /** The file has an opaque white ground, so it cannot be shown as a silhouette. */
  opaque?: boolean;
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
    url: "https://www.estudar.org.br",
    logo: "/images/sponsors/fundacao-estudar.png",
    width: 482,
    height: 200,
    scale: 1.25,
  },
  {
    name: "AI Tinkerers",
    tier: "supporter",
    url: "https://aitinkerers.org",
    logo: "/images/sponsors/ai-tinkerers.png",
    width: 600,
    height: 131,
  },
  {
    name: "Fundação Behring",
    tier: "supporter",
    url: "https://fundacaobehring.org",
    logo: "/images/sponsors/behring.png",
    width: 572,
    height: 168,
    scale: 1.2,
  },
] as const;
