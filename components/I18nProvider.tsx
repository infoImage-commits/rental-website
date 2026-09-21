"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { localizePath, type Locale } from "@/lib/i18n/config";
import type { Messages } from "@/lib/i18n/messages";

type TranslationParams = Record<string, string | number>;

type I18nContextValue = {
  locale: Locale;
  messages: Messages;
  t: (key: string, params?: TranslationParams) => string;
  tArray: <T = unknown>(key: string) => T[];
  href: (path: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export default function I18nProvider({
  locale,
  messages,
  children,
}: {
  locale: Locale;
  messages: Messages;
  children: ReactNode;
}) {
  const queryClient = useQueryClient();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = "ltr";
    queryClient.invalidateQueries();
  }, [locale, queryClient]);

  function t(key: string, params?: TranslationParams) {
    const value = getNestedValue(messages, key);
    const template = typeof value === "string" ? value : key;
    return interpolate(template, params);
  }

  function tArray<T = unknown>(key: string) {
    const value = getNestedValue(messages, key);
    return Array.isArray(value) ? (value as T[]) : [];
  }

  function href(path: string) {
    return localizePath(path, locale);
  }

  return (
    <I18nContext.Provider value={{ locale, messages, t, tArray, href }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used inside I18nProvider");
  }
  return context;
}

function getNestedValue(source: Messages, key: string): unknown {
  return key.split(".").reduce<unknown>((current, segment) => {
    if (!current || typeof current !== "object") return undefined;
    return (current as Record<string, unknown>)[segment];
  }, source);
}

function interpolate(template: string, params?: TranslationParams) {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(params[key] ?? `{${key}}`));
}
