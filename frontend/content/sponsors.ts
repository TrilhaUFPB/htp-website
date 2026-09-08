export type Sponsor = {
  name: string;
  url: string;
  logo: string;
  /** Intrinsic pixel size of the logo file, so next/image can reserve the box. */
  width: number;
  height: number;
};

export const sponsors: readonly Sponsor[] = [
  {
    name: "Valor Capital Group",
    url: "https://valorcapitalgroup.com",
    logo: "/images/sponsors/valor.svg",
    width: 185,
    height: 30,
  },
  {
    name: "AI Tinkerers",
    url: "https://aitinkerers.org",
    logo: "/images/sponsors/ai-tinkerers.png",
    width: 600,
    height: 131,
  },
  {
    name: "NXTP Ventures",
    url: "https://nxtp.vc",
    logo: "/images/sponsors/nxtp.png",
    width: 506,
    height: 206,
  },
  {
    name: "Fundação Behring",
    url: "https://fundacaobehring.org",
    logo: "/images/sponsors/behring.png",
    width: 572,
    height: 168,
  },
] as const;
