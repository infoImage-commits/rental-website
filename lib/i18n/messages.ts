import { defaultLocale, type Locale } from "./config";
import en from "./locales/en.json";
import fr from "./locales/fr.json";
import de from "./locales/de.json";
import ru from "./locales/ru.json";

type MessageLeaf = string | string[] | readonly string[];
type MessageTree = { [key: string]: MessageLeaf | MessageTree | MessageTree[] | readonly MessageTree[] };
type MessageValue = MessageLeaf | MessageTree | MessageTree[];

export type Messages = typeof en;
type PartialMessages = Partial<Messages>;

const localeMessages: Record<Locale, PartialMessages> = {
  en,
  fr: fr as unknown as PartialMessages,
  de: de as unknown as PartialMessages,
  ru: ru as unknown as PartialMessages,
};

const completeMessages: Record<Locale, Messages> = {
  en,
  fr: mergeMessages(en, localeMessages.fr),
  de: mergeMessages(en, localeMessages.de),
  ru: mergeMessages(en, localeMessages.ru),
};

export function getMessages(locale: Locale) {
  return completeMessages[locale] ?? completeMessages[defaultLocale];
}

export function resolveMessage(path: string, locale: Locale): MessageValue | undefined {
  const source = getMessages(locale) as Record<string, unknown>;
  return path.split(".").reduce<unknown>((current, key) => {
    if (!current || typeof current !== "object") return undefined;
    return (current as Record<string, unknown>)[key];
  }, source) as MessageValue | undefined;
}

function mergeMessages<T extends Record<string, unknown>>(base: T, override: Partial<T>): T {
  const result: Record<string, unknown> = { ...base };

  Object.entries(override).forEach(([key, value]) => {
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      base[key] &&
      typeof base[key] === "object" &&
      !Array.isArray(base[key])
    ) {
      result[key] = mergeMessages(base[key] as Record<string, unknown>, value as Record<string, unknown>);
    } else if (value !== undefined) {
      result[key] = value;
    }
  });

  return result as T;
}
