"use client";

import { createContext, useContext } from "react";

import type { Copy } from "@/content/copy";
import type { Locale } from "./config";

type LocaleValue = { locale: Locale; t: Copy };

const LocaleContext = createContext<LocaleValue | null>(null);

export function LocaleProvider({
  locale,
  t,
  children,
}: {
  locale: Locale;
  t: Copy;
  children: React.ReactNode;
}) {
  return <LocaleContext.Provider value={{ locale, t }}>{children}</LocaleContext.Provider>;
}

export function useCopy(): LocaleValue {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("useCopy must be used inside <LocaleProvider>.");
  return value;
}
