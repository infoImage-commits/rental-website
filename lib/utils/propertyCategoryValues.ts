import type { PropertyCategoryGroup, PropertyCategoryValueDto } from "@/lib/types/property";
import type { PropertyCategory, PropertyCategoryItem } from "@/lib/types/propertyCategory";

type CategoryValueCarrier = {
  categories?: PropertyCategoryGroup[] | null;
  propertyCategoryValueDtos?: PropertyCategoryValueDto[] | null;
  propertyCategoryItemIds?: string[] | null;
};

function uniqueStrings(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

export function getSelectedPropertyCategoryItemIds(
  property: CategoryValueCarrier,
  allItems: PropertyCategoryItem[] = []
) {
  const dtoIds = property.propertyCategoryValueDtos
    ?.map((value) => value.propertyCategoryItemId || value.propertyCategoryItem?.id || "")
    .filter(Boolean);

  if (dtoIds?.length) return uniqueStrings(dtoIds);

  if (property.propertyCategoryItemIds?.length) {
    return uniqueStrings(property.propertyCategoryItemIds);
  }

  const selectedNames = property.categories?.flatMap((category) => category.items) ?? [];
  if (selectedNames.length === 0) return [];

  const selectedNameSet = new Set(selectedNames.map((name) => name.trim().toLowerCase()));
  return allItems
    .filter((item) => selectedNameSet.has(item.name.trim().toLowerCase()))
    .map((item) => item.id);
}

export function getPropertyCategoryGroupsFromValues(
  property: CategoryValueCarrier,
  allCategories: PropertyCategory[] = [],
  allItems: PropertyCategoryItem[] = []
) {
  if (property.categories?.length) return property.categories;

  const values = property.propertyCategoryValueDtos ?? [];
  if (values.length === 0) return [];

  const categoryNameById = new Map(allCategories.map((category) => [category.id, category.name]));
  const itemById = new Map(allItems.map((item) => [item.id, item]));
  const groups = new Map<string, { categoryName: string; items: { name: string; displayOrder: number }[] }>();

  values.forEach((value) => {
    const item = value.propertyCategoryItem ?? itemById.get(value.propertyCategoryItemId);
    if (!item) return;

    const categoryId = item.propertyCategoryId;
    const categoryName = categoryNameById.get(categoryId) || "Amenities";
    const group = groups.get(categoryId) ?? { categoryName, items: [] };
    group.items.push({ name: item.name, displayOrder: item.displayOrder || 0 });
    groups.set(categoryId, group);
  });

  return Array.from(groups.values()).map((group) => ({
    categoryName: group.categoryName,
    items: group.items
      .sort((a, b) => a.displayOrder - b.displayOrder || a.name.localeCompare(b.name))
      .map((item) => item.name),
  }));
}
