export const siteConfig = {
  name: "Hack The Path",
  shortName: "HTP",
  title: "Hack The Path — Maior Hackathon do Nordeste",
  description:
    "Dois dias de evento presencial, 20 e 21 de fevereiro. Hackathon, palestras e conversas com empresas.",
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
    "Trilha UFPB",
    "João Pessoa",
    "Paraíba",
    "Nordeste",
  ],
  authors: [{ name: "Trilha UFPB", url: "https://instagram.com/trilhaufpb" }],
  creator: "Trilha UFPB",
  publisher: "Trilha UFPB",
  event: {
    name: "Hack The Path",
    startDate: "2027-02-20",
    endDate: "2027-02-21",
    locationName: "Palazzo Cristal",
    streetAddress: "R. Quatrocentos e Noventa e Dois, 2-114 - Lot. Progresso",
    addressLocality: "Cabedelo",
    addressRegion: "PB",
    addressCountry: "BR",
  },
  links: {
    luma: "https://lu.ma",
    website: "https://www.hackthepath.com.br",
    instagram: "https://instagram.com/trilhaufpb",
    instagramAlt: "https://instagram.com/hackingthepath",
  },
  social: {
    twitter: "@trilhaufpb",
  },
  ogImage: {
    path: "/images/og/og-image.png",
    width: 1200,
    height: 630,
    alt: "Hack The Path — Maior Hackathon do Nordeste",
  },
} as const;
