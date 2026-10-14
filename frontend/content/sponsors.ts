export type Sponsor = {
  name: string;
  url: string;
  logo: string;
  /** Intrinsic pixel size of the logo file, so next/image can reserve the box. */
  width: number;
  height: number;
  /** Optical size tweak for logos that read smaller than the rest at equal height. */
  scale?: number;
};

export const sponsors: readonly Sponsor[] = [
  {
    name: "Valor Capital Group",
    url: "https://valorcapitalgroup.com",
    logo: "/images/sponsors/valor.png",
    width: 591,
    height: 130,
    scale: 1.15,
  },
  {
    name: "AI Tinkerers",
    url: "https://aitinkerers.org",
    logo: "/images/sponsors/ai-tinkerers.png",
    width: 600,
    height: 131,
  },
  {
    name: "Fundação Behring",
    url: "https://fundacaobehring.org",
    logo: "/images/sponsors/behring.png",
    width: 572,
    height: 168,
    scale: 1.2,
  },
  {
    name: "NXTP Ventures",
    url: "https://nxtp.vc",
    logo: "/images/sponsors/nxtp.png",
    width: 506,
    height: 206,
  },
] as const;
