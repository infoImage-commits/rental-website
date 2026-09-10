import { LANDMARK_ATTRIBUTE_GROUP_ID } from "@/lib/constants/landmarks";
import type { AttributeGroupItem } from "@/lib/types/attributeGroupItem";

type LandmarkCarrier = {
  attributeGroups?: unknown;
  attributeGroupItems?: unknown;
  attributeGroupItemIds?: unknown;
  attributes?: unknown;
  landmarks?: unknown;
  landMarks?: unknown;
};

function isLandmarkItem(value: unknown): value is AttributeGroupItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Partial<AttributeGroupItem>;
  return typeof item.id === "string" && typeof item.key === "string" && typeof item.value === "string";
}

function readItemArray(value: unknown) {
  return Array.isArray(value) ? value.filter(isLandmarkItem) : [];
}

function readItemsFromAttributeGroups(value: unknown) {
  if (!Array.isArray(value)) return [];

  return value.flatMap((group) => {
    if (!group || typeof group !== "object") return [];

    const attributeGroup = group as {
      id?: unknown;
      items?: unknown;
    };

    if (attributeGroup.id !== LANDMARK_ATTRIBUTE_GROUP_ID) return [];

    return readItemArray(attributeGroup.items).map((item) => ({
      ...item,
      attributeGroupId: LANDMARK_ATTRIBUTE_GROUP_ID,
    }));
  });
}

export function sortLandmarks(items: AttributeGroupItem[]) {
  return [...items].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0) || a.key.localeCompare(b.key));
}

export function getPropertyLandmarks(property: LandmarkCarrier, allLandmarks: AttributeGroupItem[] = []) {
  const directItems = [
    ...readItemsFromAttributeGroups(property.attributeGroups),
    ...readItemArray(property.attributeGroupItems),
    ...readItemArray(property.attributes),
    ...readItemArray(property.landmarks),
    ...readItemArray(property.landMarks),
  ].filter((item) => !item.attributeGroupId || item.attributeGroupId === LANDMARK_ATTRIBUTE_GROUP_ID);

  if (directItems.length > 0) {
    const seen = new Set<string>();
    return sortLandmarks(directItems.filter((item) => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    }));
  }

  const ids = Array.isArray(property.attributeGroupItemIds)
    ? property.attributeGroupItemIds.filter((id): id is string => typeof id === "string")
    : [];

  if (ids.length === 0) return [];

  const idSet = new Set(ids);
  return sortLandmarks(allLandmarks.filter((item) => idSet.has(item.id)));
}
