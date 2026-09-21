"use client";

import Image from "next/image";
import { localeFlags, localeLabels, type Locale } from "@/lib/i18n/config";
import {
  adminTranslationLocales,
  type TranslationInput,
} from "@/lib/i18n/adminTranslations";

type TranslationFieldsProps = {
  label: string;
  value: TranslationInput;
  onChange: (value: TranslationInput) => void;
  required?: boolean;
  textarea?: boolean;
  rows?: number;
  placeholder?: string;
  disabled?: boolean;
};

export default function TranslationFields({
  label,
  value,
  onChange,
  required = false,
  textarea = false,
  rows = 3,
  placeholder,
  disabled = false,
}: TranslationFieldsProps) {
  function updateLocale(locale: Locale, nextValue: string) {
    onChange({ ...value, [locale]: nextValue });
  }

  return (
    <fieldset className="rounded-2xl border border-[#dfe8e4] bg-[#fbfdfc] p-4">
      <legend className="px-1 text-[13px] font-semibold text-[#183c2f]">
        {label} {required && <span className="text-red-500">*</span>}
      </legend>

      <div className="mt-3 grid gap-3">
        {adminTranslationLocales.map((locale) => {
          const inputId = `${label.replace(/\s+/g, "-").toLowerCase()}-${locale}`;
          const missingRequired = required && locale === "en" && !value[locale].trim();

          return (
            <label key={locale} htmlFor={inputId} className="block rounded-xl border border-[#e6eee9] bg-white p-3">
              <span className="mb-2 flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-[12px] font-semibold text-[#183c2f]">
                  <Image
                    src={localeFlags[locale].src}
                    alt={localeFlags[locale].alt}
                    width={22}
                    height={16}
                    className="h-4 w-[22px] rounded-[2px] object-cover shadow-[0_0_0_1px_rgba(31,77,61,0.12)]"
                  />
                  {localeLabels[locale]}
                </span>
                {missingRequired && <span className="text-[11px] font-medium text-red-500">Required</span>}
              </span>

              {textarea ? (
                <textarea
                  id={inputId}
                  value={value[locale]}
                  onChange={(event) => updateLocale(locale, event.target.value)}
                  placeholder={placeholder}
                  rows={rows}
                  disabled={disabled}
                  className="w-full resize-y rounded-lg border border-[#dfe8e4] px-3 py-2 text-[13px] outline-none transition focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57] disabled:bg-[#f5f7f6] disabled:text-[#8a9a94]"
                />
              ) : (
                <input
                  id={inputId}
                  type="text"
                  value={value[locale]}
                  onChange={(event) => updateLocale(locale, event.target.value)}
                  placeholder={placeholder}
                  disabled={disabled}
                  className="h-10 w-full rounded-lg border border-[#dfe8e4] px-3 text-[13px] outline-none transition focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57] disabled:bg-[#f5f7f6] disabled:text-[#8a9a94]"
                />
              )}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
