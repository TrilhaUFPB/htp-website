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
  },
] as const;
