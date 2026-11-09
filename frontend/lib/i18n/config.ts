export const LOCALES = ["pt", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "pt";

/** Set when someone picks a language; it outranks the browser's own setting. */
export const LOCALE_COOKIE = "htp-lang";

export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

/** The language the browser ranks first, when it is one we have. */
function fromAcceptLanguage(header: string | null | undefined): Locale | null {
  if (!header) return null;

  const ranked = header
    .split(",")
    .map((part, index) => {
      const [tag = "", ...params] = part.trim().split(";");
      const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
      const weight = q ? Number.parseFloat(q.slice(2)) : 1;
      return { tag: tag.trim().toLowerCase(), weight: Number.isFinite(weight) ? weight : 0, index };
    })
    .filter((entry) => entry.tag && entry.weight > 0)
    .sort((a, b) => b.weight - a.weight || a.index - b.index);

  const top = ranked[0]?.tag.split("-")[0];
  if (top === "en") return "en";
  if (top === "pt") return "pt";
  return null;
}

/**
 * An explicit choice (the cookie) wins. Without one, a browser that ranks
 * English first gets English; everything else gets Portuguese.
 */
export function resolveLocale(
  cookieValue: string | null | undefined,
  acceptLanguage: string | null | undefined,
): Locale {
  if (isLocale(cookieValue)) return cookieValue;
  return fromAcceptLanguage(acceptLanguage) ?? DEFAULT_LOCALE;
}
