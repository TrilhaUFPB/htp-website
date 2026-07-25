import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

const ogImageUrl = new URL(siteConfig.ogImage.path, siteConfig.url);

export function createSiteMetadata(overrides?: Metadata): Metadata {
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.title,
      template: `%s · ${siteConfig.name}`,
    },
    description: siteConfig.description,
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
      locale: siteConfig.locale,
      url: siteConfig.url,
      siteName: siteConfig.name,
      title: siteConfig.title,
      description: siteConfig.description,
      images: [
        {
          url: ogImageUrl,
          width: siteConfig.ogImage.width,
          height: siteConfig.ogImage.height,
          alt: siteConfig.ogImage.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.title,
      description: siteConfig.description,
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

export function createEventJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: siteConfig.language,
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.publisher,
        url: siteConfig.links.website,
        sameAs: [siteConfig.links.instagram, siteConfig.links.instagramAlt],
      },
      {
        "@type": "Event",
        "@id": `${siteConfig.url}/#event`,
        name: siteConfig.event.name,
        description: siteConfig.description,
        startDate: siteConfig.event.startDate,
        endDate: siteConfig.event.endDate,
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        url: siteConfig.url,
        image: new URL(siteConfig.ogImage.path, siteConfig.url).toString(),
        location: {
          "@type": "Place",
          name: siteConfig.event.locationName,
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
        offers: {
          "@type": "Offer",
          url: siteConfig.links.luma,
          availability: "https://schema.org/PreOrder",
          price: "0",
          priceCurrency: "BRL",
        },
      },
    ],
  };
}
