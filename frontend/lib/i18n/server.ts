import { cookies, headers } from "next/headers";

import { copy, type Copy } from "@/content/copy";
import { LOCALE_COOKIE, resolveLocale, type Locale } from "./config";

export async function getLocale(): Promise<Locale> {
  const [cookieStore, headerList] = await Promise.all([cookies(), headers()]);
  return resolveLocale(cookieStore.get(LOCALE_COOKIE)?.value, headerList.get("accept-language"));
}

export async function getCopy(): Promise<{ locale: Locale; t: Copy }> {
  const locale = await getLocale();
  return { locale, t: copy[locale] };
}
