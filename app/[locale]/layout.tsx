import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AppChrome from "@/components/AppChrome";
import I18nProvider from "@/components/I18nProvider";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { getMessages } from "@/lib/i18n/messages";
import { isLocale, localeNames, locales, ogLocales, type Locale } from "@/lib/i18n/config";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();

  const locale = rawLocale as Locale;
  const messages = getMessages(locale);
  const languages = Object.fromEntries(locales.map((item) => [item, `/${item}`]));

  return {
    title: {
      default: messages.seo.siteTitle,
      template: `%s | ${siteConfig.name}`,
    },
    description: messages.seo.siteDescription,
    alternates: {
      canonical: `/${locale}`,
      languages,
    },
    openGraph: {
      type: "website",
      locale: ogLocales[locale],
      url: `/${locale}`,
      siteName: siteConfig.name,
      title: messages.seo.siteTitle,
      description: messages.seo.siteDescription,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: messages.seo.ogAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: messages.seo.siteTitle,
      description: messages.seo.siteDescription,
      images: [siteConfig.ogImage],
    },
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();

  const locale = rawLocale as Locale;
  const messages = getMessages(locale);
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: siteConfig.name,
    description: messages.seo.siteDescription,
    url: absoluteUrl(`/${locale}`),
    telephone: siteConfig.phone,
    image: absoluteUrl(siteConfig.ogImage),
    logo: absoluteUrl(siteConfig.logo),
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.streetAddress,
      addressLocality: siteConfig.address.addressLocality,
      addressRegion: siteConfig.address.addressRegion,
      addressCountry: siteConfig.address.addressCountry,
    },
    areaServed: ["Hurghada", "El Kawther", "Red Sea Governorate"],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phone,
      contactType: "customer support",
      availableLanguage: locales.map((item) => localeNames[item]),
    },
  };

  return (
    <I18nProvider locale={locale} messages={messages}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <AppChrome>{children}</AppChrome>
    </I18nProvider>
  );
}
