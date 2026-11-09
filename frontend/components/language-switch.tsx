"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { LOCALE_COOKIE, LOCALE_COOKIE_MAX_AGE, type Locale } from "@/lib/i18n/config";
import { useCopy } from "@/lib/i18n/context";

function saveLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax`;
}

/**
 * A single quiet button that shows the current language (PT or EN) and flips
 * to the other on click. The choice is saved in a cookie, which then outranks
 * the browser's own setting, and the page refreshes in place.
 */
export function LanguageSwitch() {
  const { locale, t } = useCopy();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const toggle = () => {
    saveLocale(locale === "pt" ? "en" : "pt");
    startTransition(() => router.refresh());
  };

  return (
    <button
      type="button"
      className="lang-switch"
      aria-label={t.common.switchLanguageAria}
      data-pending={pending}
      onClick={toggle}
    >
      {locale.toUpperCase()}
    </button>
  );
}
