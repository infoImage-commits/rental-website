import { locales, type Locale } from "@/lib/i18n/config";

export type TranslationInput = Record<Locale, string>;
export type LocaleRecord<T> = Record<Locale, T>;

export const adminTranslationLocales = locales;

export function emptyTranslation(): TranslationInput {
  return {
    en: "",
    fr: "",
    de: "",
    ru: "",
  };
}

export function translationFromLocaleValues(values: Partial<Record<Locale, string | null | undefined>>): TranslationInput {
  return {
    en: values.en ?? "",
    fr: values.fr ?? "",
    de: values.de ?? "",
    ru: values.ru ?? "",
  };
}

export function trimTranslation(value: TranslationInput): TranslationInput {
  return {
    en: value.en.trim(),
    fr: value.fr.trim(),
    de: value.de.trim(),
    ru: value.ru.trim(),
  };
}

export function hasRequiredBaseTranslation(value: TranslationInput) {
  return value.en.trim().length > 0;
}

export function hasAnyTranslation(value: TranslationInput) {
  return adminTranslationLocales.some((locale) => value[locale].trim().length > 0);
}

export function appendTranslationFormData(formData: FormData, prefix: string, value: TranslationInput) {
  const trimmed = trimTranslation(value);
  formData.append(`${prefix}.En`, trimmed.en);
  formData.append(`${prefix}.Fr`, trimmed.fr);
  formData.append(`${prefix}.De`, trimmed.de);
  formData.append(`${prefix}.Ru`, trimmed.ru);
}

export function buildTranslationFromRecords<T>(
  records: LocaleRecord<T>,
  selector: (record: T) => string | null | undefined
): TranslationInput {
  return translationFromLocaleValues({
    en: selector(records.en),
    fr: selector(records.fr),
    de: selector(records.de),
    ru: selector(records.ru),
  });
}
