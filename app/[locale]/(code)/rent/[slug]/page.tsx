import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SinglePropertyPageContent from "@/components/SinglePropertyPageContent";
import { API_BASE_URL } from "@/lib/api/config";
import { getPropertyIdBySlug } from "@/lib/api/propertyHelpers";
import { siteConfig } from "@/lib/site";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";

type PropertyImage = {
  isCover?: boolean;
  imageUrl?: string;
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "en";
  const messages = getMessages(locale);
  const id = await getPropertyIdBySlug(slug, 'rent');
  
  if (!id) {
    return {
      title: messages.property.propertyNotFoundMeta,
      robots: { index: false, follow: false },
    };
  }

  try {
    // We use fetch here directly for server-side metadata generation to avoid axios instance issues on server
    const res = await fetch(`${API_BASE_URL}/api/properties/${id}`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Failed to fetch");
    const json = await res.json();
    const property = json.data;
    
    const coverImage = (property?.images as PropertyImage[] | undefined)?.find((img) => img.isCover)?.imageUrl;

    return {
      title: property?.name || messages.property.defaultMetaTitle,
      description:
        property?.description?.substring(0, 160) ||
        messages.property.defaultMetaDescription,
      alternates: {
        canonical: `/${locale}/rent/${slug}`,
      },
      openGraph: {
        title: `${property?.name || messages.property.defaultMetaTitle} | ${siteConfig.name}`,
        description:
          property?.description?.substring(0, 160) ||
          messages.property.defaultMetaDescription,
        images: coverImage ? [{ url: `${API_BASE_URL}/${coverImage}` }] : []
      }
    };
  } catch {
    return { title: messages.property.detailsMetaTitle };
  }
}

export default async function SinglePropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const id = await getPropertyIdBySlug(slug, 'rent');
  
  if (!id) {
    notFound();
  }
  
  return <SinglePropertyPageContent id={id} />;
}
