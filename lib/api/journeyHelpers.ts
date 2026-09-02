import { API_BASE_URL } from "@/lib/api/config";
import type { JourneyItem, JourneyApiResponse } from "@/lib/types/journey";
import { slugify } from "@/lib/utils/slugify";

type JourneyListResponse = JourneyApiResponse<{
  items: JourneyItem[];
}>;

export async function getJourneyIdBySlug(slug: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/journeys?pageNumber=1&pageSize=100&isActive=true`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return slug;

    const json = (await res.json()) as JourneyListResponse;
    const journeys = json.data?.items ?? [];
    const match = journeys.find((journey) => journey.id === slug || slugify(journey.name) === slug);

    return match?.id ?? slug;
  } catch {
    return slug;
  }
}

export async function getJourneyBySlug(slug: string) {
  const id = await getJourneyIdBySlug(slug);

  try {
    const res = await fetch(`${API_BASE_URL}/api/journeys/${id}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;

    const json = (await res.json()) as JourneyApiResponse<JourneyItem>;
    return json.data;
  } catch {
    return null;
  }
}
