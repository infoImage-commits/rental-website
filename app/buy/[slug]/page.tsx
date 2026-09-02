import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SingleBuyPropertyPageContent from "../../../components/SingleBuyPropertyPageContent";
import { API_BASE_URL } from "@/lib/api/config";
import { getPropertyIdBySlug } from "@/lib/api/propertyHelpers";
import { siteConfig } from "@/lib/site";

type PropertyImage = {
  isCover?: boolean;
  imageUrl?: string;
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const id = await getPropertyIdBySlug(slug, 'buy');
  
  if (!id) {
    return {
      title: "Property Not Found",
      robots: { index: false, follow: false },
    };
  }

  try {
    // We use fetch here directly for server-side metadata generation to avoid axios instance issues on server
    const res = await fetch(`${API_BASE_URL}/api/public/property-buyings/${id}`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error("Failed to fetch");
    const json = await res.json();
    const property = json.data;
    
    const coverImage = (property?.images as PropertyImage[] | undefined)?.find((img) => img.isCover)?.imageUrl;

    return {
      title: property?.title || "Hurghada Property for Sale",
      description:
        property?.description?.substring(0, 160) ||
        "View property details, amenities, and buying information for this Hurghada home.",
      alternates: {
        canonical: `/buy/${slug}`,
      },
      openGraph: {
        title: `${property?.title || "Hurghada Property for Sale"} | ${siteConfig.name}`,
        description:
          property?.description?.substring(0, 160) ||
          "View property details, amenities, and buying information for this Hurghada home.",
        images: coverImage ? [{ url: `${API_BASE_URL}/${coverImage}` }] : []
      }
    };
  } catch {
    return { title: "Property Details" };
  }
}

export default async function SingleBuyPropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const id = await getPropertyIdBySlug(slug, 'buy');
  
  if (!id) {
    notFound();
  }
  
  return <SingleBuyPropertyPageContent id={id} />;
}
