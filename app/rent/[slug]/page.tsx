import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SinglePropertyPageContent from "../../../components/SinglePropertyPageContent";
import { API_BASE_URL } from "@/lib/api/config";
import { getPropertyIdBySlug } from "@/lib/api/propertyHelpers";
import { siteConfig } from "@/lib/site";

type PropertyImage = {
  isCover?: boolean;
  imageUrl?: string;
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const id = await getPropertyIdBySlug(slug, 'rent');
  
  if (!id) {
    return {
      title: "Rental Property Not Found",
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
      title: property?.name || "Hurghada Rental Property",
      description:
        property?.description?.substring(0, 160) ||
        "View rental details, amenities, availability, and booking information for this Hurghada vacation home.",
      alternates: {
        canonical: `/rent/${slug}`,
      },
      openGraph: {
        title: `${property?.name || "Hurghada Rental Property"} | ${siteConfig.name}`,
        description:
          property?.description?.substring(0, 160) ||
          "View rental details, amenities, availability, and booking information for this Hurghada vacation home.",
        images: coverImage ? [{ url: `${API_BASE_URL}/${coverImage}` }] : []
      }
    };
  } catch {
    return { title: "Rental Property Details" };
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
