export const siteConfig = {
  name: "Hack The Path",
  shortName: "HTP",
  title: "Hack The Path 2027 — O maior hackathon do Nordeste",
  description:
    "Hackathon gratuito para estudantes, 20 e 21 de fevereiro de 2027, na Grande João Pessoa. Um dia de palestras e empresas, um dia de código. Entre na lista.",
  tagline: "O maior hackathon da história do Nordeste",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://www.hackthepath.com.br",
  locale: "pt_BR",
  language: "pt-BR",
  keywords: [
    "Hack The Path",
    "HTP",
    "hackathon",
    "hackathon 2027",
    "hackathon Nordeste",
    "hackathon João Pessoa",
    "hackathon Paraíba",
    "hackathon gratuito",
    "hackathon para estudantes",
    "Trilha UFPB",
  ],
  authors: [{ name: "Trilha UFPB", url: "https://instagram.com/trilhaufpb" }],
  creator: "Trilha UFPB",
  publisher: "Trilha UFPB",
  logoPath: "/images/logo/png/hack-the-path-01.png",
  event: {
    name: "Hack The Path 2027",
    description:
      "Dois dias de evento presencial e gratuito para estudantes. No dia 20, palestras, talks e stands de empresas, aberto a todos. No dia 21, o hackathon, com participantes selecionados, mentoria, pitches e premiação.",
    startDate: "2027-02-20",
    endDate: "2027-02-21",
    // The venue contract is not signed yet, so the site names only the metro
    // area. Add the venue and street address back once it can be announced.
    locationName: "Grande João Pessoa",
    addressLocality: "João Pessoa",
    addressRegion: "PB",
    addressCountry: "BR",
  },
  links: {
    website: "https://www.hackthepath.com.br",
    instagram: "https://instagram.com/trilhaufpb",
    instagramEvent: "https://instagram.com/hackthepath",
  },
  social: {
    twitter: "@trilhaufpb",
  },
  ogImage: {
    path: "/images/og/og-image.png",
    width: 1200,
    height: 630,
    alt: "Hack The Path — O maior hackathon da história do Nordeste",
  },
} as const;
