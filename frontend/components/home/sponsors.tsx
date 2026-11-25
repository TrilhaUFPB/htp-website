"use client";

import Image from "next/image";

import { sponsors, type SponsorTier } from "@/content/sponsors";
import { track } from "@/lib/analytics/events";
import { useCopy } from "@/lib/i18n/context";

import styles from "./home.module.css";

export function HomeSponsors() {
  const { t, locale } = useCopy();
  const title =
    locale === "pt" ? { light: "Quem faz", bold: "acontecer." } : { light: "Who makes it", bold: "happen." };
  const tiers: { tier: SponsorTier; label: string }[] = [
    { tier: "sponsor", label: t.sponsors.sponsorsLabel },
    { tier: "supporter", label: t.sponsors.supportersLabel },
  ];

  return (
    <div className={styles.sponsorTiers}>
      {/* Greys for logos with their own tones: desaturate, then invert into a
          range whose darkest value is 55% white, so nothing sinks into the black. */}
      <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
        <filter id="logo-tones" colorInterpolationFilters="sRGB">
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncR type="table" tableValues="1 0.55" />
            <feFuncG type="table" tableValues="1 0.55" />
            <feFuncB type="table" tableValues="1 0.55" />
          </feComponentTransfer>
        </filter>
      </svg>
      {/* The title waits for a little more scroll than the black needs. */}
      <h2 className={styles.sponsorTitle} data-fill data-fill-delay={0.35}>
        <span>{title.light}</span> <strong>{title.bold}</strong>
      </h2>
      {tiers.map(({ tier, label }) => (
        <div key={tier} className={styles.sponsorTier} data-tier={tier}>
          <h3 className={styles.label} data-fill>
            {label}
          </h3>
          <ul className={styles.logoGrid}>
            {sponsors
              .filter((sponsor) => sponsor.tier === tier)
              .map((sponsor, index) => (
                // Logos come in one after another once the black is behind them.
                <li key={sponsor.name} data-fill data-fill-delay={0.08 + index * 0.07}>
                  <a
                    href={sponsor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${sponsor.name} (${t.sponsors.opensInNewTab})`}
                    onClick={() => track("sponsor_clicked", { sponsor: sponsor.name })}
                    className={styles.logoCell}
                  >
                    {sponsor.onDark ? (
                      // Two files: the light one at rest, the original in colour
                      // on the white hover cell. No filters on either.
                      <>
                        <Image
                          src={sponsor.onDark.src}
                          alt={sponsor.name}
                          width={sponsor.onDark.width}
                          height={sponsor.onDark.height}
                          style={{ "--logo-scale": sponsor.scale ?? 1 } as React.CSSProperties}
                          className={`${styles.logo} ${styles.logoDark}`}
                        />
                        <Image
                          src={sponsor.logo}
                          alt=""
                          aria-hidden="true"
                          width={sponsor.width}
                          height={sponsor.height}
                          style={{ "--logo-scale": sponsor.scale ?? 1 } as React.CSSProperties}
                          className={`${styles.logo} ${styles.logoColor}`}
                        />
                      </>
                    ) : (
                      <Image
                        src={sponsor.logo}
                        alt={sponsor.name}
                        width={sponsor.width}
                        height={sponsor.height}
                        style={{ "--logo-scale": sponsor.scale ?? 1 } as React.CSSProperties}
                        className={styles.logo}
                        data-opaque={sponsor.opaque ? "true" : undefined}
                        data-tones={sponsor.tones ? "true" : undefined}
                      />
                    )}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
