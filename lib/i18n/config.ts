export const locales = ["en", "fr", "de", "ru"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  de: "Deutsch",
  ru: "Русский",
};

export const localeFlags: Record<Locale, { src: string; alt: string }> = {
  en: { src: "/flags/gb.svg", alt: "United Kingdom flag" },
  fr: { src: "/flags/fr.svg", alt: "France flag" },
  de: { src: "/flags/de.svg", alt: "Germany flag" },
  ru: { src: "/flags/ru.svg", alt: "Russia flag" },
};

export const localeNames: Record<Locale, string> = {
  en: "English",
  fr: "French",
  de: "German",
  ru: "Russian",
};

export const ogLocales: Record<Locale, string> = {
  en: "en_US",
  fr: "fr_FR",
  de: "de_DE",
  ru: "ru_RU",
};

export function isLocale(value: string | undefined): value is Locale {
  return Boolean(value && (locales as readonly string[]).includes(value));
}

export function getPathLocale(pathname: string): Locale | null {
  const firstSegment = pathname.split("/").filter(Boolean)[0];
  return isLocale(firstSegment) ? firstSegment : null;
}

export function stripLocale(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  if (isLocale(segments[0])) {
    const stripped = `/${segments.slice(1).join("/")}`;
    return stripped === "/" ? "/" : stripped.replace(/\/$/, "");
  }
  return pathname || "/";
}

export function localizePath(path: string, locale: Locale) {
  if (!path || path === "#") return path;
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;

  const [pathname, suffix = ""] = path.split(/(?=[?#])/);
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const withoutLocale = stripLocale(normalizedPath);
  const localized = withoutLocale === "/" ? `/${locale}` : `/${locale}${withoutLocale}`;

  return `${localized}${suffix}`;
}
