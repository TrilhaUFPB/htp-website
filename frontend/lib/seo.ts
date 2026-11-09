import type { Metadata } from "next";
import { copy } from "@/content/copy";
import { siteConfig } from "@/content/site";
import type { Locale } from "@/lib/i18n/config";

const ogImageUrl = new URL(siteConfig.ogImage.path, siteConfig.url);

export function createSiteMetadata(overrides?: Metadata, locale: Locale = "pt"): Metadata {
  const t = copy[locale];

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t.meta.title,
      template: `%s · ${siteConfig.name}`,
    },
    description: t.meta.description,
    keywords: [...siteConfig.keywords],
    authors: [...siteConfig.authors],
    creator: siteConfig.creator,
    publisher: siteConfig.publisher,
    category: "technology",
    applicationName: siteConfig.name,
    alternates: {
      canonical: "/",
      languages: {
        "pt-BR": "/",
      },
    },
    openGraph: {
      type: "website",
      locale: t.ogLocale,
      url: siteConfig.url,
      siteName: siteConfig.name,
      title: t.meta.title,
      description: t.meta.description,
      images: [
        {
          url: ogImageUrl,
          width: siteConfig.ogImage.width,
          height: siteConfig.ogImage.height,
          alt: t.meta.ogAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
      site: siteConfig.social.twitter,
      creator: siteConfig.social.twitter,
      images: [ogImageUrl.toString()],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    ...overrides,
  };
}

export function createEventJsonLd(locale: Locale = "pt") {
  const t = copy[locale];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: t.meta.description,
        inLanguage: t.htmlLang,
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.publisher,
        url: siteConfig.links.website,
        logo: new URL(siteConfig.logoPath, siteConfig.url).toString(),
        sameAs: [siteConfig.links.instagram, siteConfig.links.instagramEvent],
      },
      {
        "@type": "Event",
        "@id": `${siteConfig.url}/#event`,
        name: siteConfig.event.name,
        description: t.meta.eventDescription,
        inLanguage: t.htmlLang,
        startDate: siteConfig.event.startDate,
        endDate: siteConfig.event.endDate,
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        isAccessibleForFree: true,
        url: siteConfig.url,
        image: new URL(siteConfig.ogImage.path, siteConfig.url).toString(),
        location: {
          "@type": "Place",
          name: t.meta.locationName,
          address: {
            "@type": "PostalAddress",
            addressLocality: siteConfig.event.addressLocality,
            addressRegion: siteConfig.event.addressRegion,
            addressCountry: siteConfig.event.addressCountry,
          },
        },
        organizer: {
          "@id": `${siteConfig.url}/#organization`,
        },
        audience: {
          "@type": "EducationalAudience",
          educationalRole: "student",
        },
        offers: {
          "@type": "Offer",
          url: siteConfig.url,
          availability: "https://schema.org/PreOrder",
          price: "0",
          priceCurrency: "BRL",
        },
      },
    ],
  };
}

export function createFaqJsonLd(locale: Locale = "pt") {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteConfig.url}/#faq`,
    mainEntity: copy[locale].faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
