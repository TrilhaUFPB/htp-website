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
        {/* Neutral dark parts (the lettering) to white, colour untouched. A
            pixel counts as lettering when it is both dark (luminance under
            ~60%) and colourless (the channel differences sum to under ~12%),
            so navy or deep green in a mark stays as it is. */}
        <filter id="logo-text" colorInterpolationFilters="sRGB">
          <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 -1 0 0 0" result="rg" />
          <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -1 1 0 0 0" result="gr" />
          <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 1 -1 0 0" result="gb" />
          <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 -1 1 0 0" result="bg" />
          <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 -1 0 0" result="rb" />
          <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -1 0 1 0 0" result="br" />
          <feComposite in="rg" in2="gr" operator="arithmetic" k2="1" k3="1" result="c1" />
          <feComposite in="gb" in2="bg" operator="arithmetic" k2="1" k3="1" result="c2" />
          <feComposite in="rb" in2="br" operator="arithmetic" k2="1" k3="1" result="c3" />
          <feComposite in="c1" in2="c2" operator="arithmetic" k2="1" k3="1" result="c12" />
          <feComposite in="c12" in2="c3" operator="arithmetic" k2="1" k3="1" result="chroma" />
          <feComponentTransfer in="chroma" result="neutral">
            <feFuncA type="discrete" tableValues="1 0 0 0 0 0 0 0" />
          </feComponentTransfer>
          <feColorMatrix in="SourceGraphic" type="luminanceToAlpha" result="lum" />
          <feComponentTransfer in="lum" result="dark">
            <feFuncA type="discrete" tableValues="1 1 1 1 1 1 0 0 0 0" />
          </feComponentTransfer>
          <feComposite in="neutral" in2="dark" operator="in" result="neutralDark" />
          <feComposite in="neutralDark" in2="SourceAlpha" operator="in" result="lettering" />
          <feFlood floodColor="#fff" result="white" />
          <feComposite in="white" in2="lettering" operator="in" result="whiteText" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="whiteText" />
          </feMerge>
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
                    {/* Two images: the logo at rest (white or greys) and the same
                        logo in colour, crossfaded on hover over the black cell. */}
                    <Image
                      src={sponsor.onDark?.src ?? sponsor.logo}
                      alt={sponsor.name}
                      width={sponsor.onDark?.width ?? sponsor.width}
                      height={sponsor.onDark?.height ?? sponsor.height}
                      style={{ "--logo-scale": sponsor.scale ?? 1 } as React.CSSProperties}
                      className={`${styles.logo} ${styles.logoRest}`}
                      data-rest={
                        sponsor.onDark ? "file" : sponsor.opaque ? "opaque" : sponsor.tones ? "tones" : "silhouette"
                      }
                    />
                    <Image
                      src={sponsor.logo}
                      alt=""
                      aria-hidden="true"
                      width={sponsor.width}
                      height={sponsor.height}
                      style={
                        {
                          "--logo-scale": sponsor.scale ?? 1,
                          "--logo-saturate": sponsor.hoverSaturate ?? 1,
                        } as React.CSSProperties
                      }
                      className={`${styles.logo} ${styles.logoHover}`}
                      data-hover={sponsor.hover ?? "lift"}
                    />
                  </a>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
