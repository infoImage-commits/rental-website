import { slugify } from "@/lib/utils/slugify";
import { API_BASE_URL } from "@/lib/api/config";

type SlugSourceItem = {
  id: string;
  name?: string;
  title?: string;
};

export async function getPropertyIdBySlug(slug: string, type: 'rent' | 'buy' = 'rent'): Promise<string | null> {
  try {
    // Determine the API endpoint based on type
    const endpoint = type === 'rent' ? '/api/properties/filter?pageSize=1000' : '/api/public/property-buyings?pageSize=1000';
    
    const res = await fetch(`${API_BASE_URL}${endpoint}`, { cache: 'no-store' });
    if (!res.ok) return null;
    
    const json = await res.json();
    const items = (json.data?.items || []) as SlugSourceItem[];
    
    // Find the item where the slugified name matches the URL slug
    const match = items.find((item) => {
      const name = type === 'rent' ? item.name : item.title;
      return item.id === slug || slugify(name ?? "") === slug;
    });

    return match ? match.id : null;
  } catch (error) {
    console.error("Failed to fetch properties for slug mapping:", error);
    return null;
  }
}
