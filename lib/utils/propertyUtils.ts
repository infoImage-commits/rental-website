import { PropertyType, PropertyStatus, BedType } from "@/lib/types/property";

export const HOUSE_RENT_PROPERTY_TYPES = [
  PropertyType.Chalet,
  PropertyType.TwinHouse,
  PropertyType.TownHouse,
  PropertyType.Duplex,
] as const;

export function buildRentPropertyTypeHref(propertyType: PropertyType | readonly PropertyType[]) {
  const params = new URLSearchParams();

  if (Array.isArray(propertyType)) {
    params.set("PropertyTypeGroup", "houses");
    params.set("PropertyTypes", propertyType.join(","));
  } else {
    params.set("PropertyType", propertyType.toString());
  }

  return `/rent?${params.toString()}`;
}

export function getPropertyTypeLabel(type: PropertyType | number): string {
  switch (type) {
    case PropertyType.Apartment: return "Apartment";
    case PropertyType.Villa: return "Villa";
    case PropertyType.Studio: return "Studio";
    case PropertyType.Chalet: return "Chalet";
    case PropertyType.TwinHouse: return "TwinHouse";
    case PropertyType.TownHouse: return "TownHouse";
    case PropertyType.Duplex: return "Duplex";
    case PropertyType.Penthouse: return "Penthouse";
    case PropertyType.Cabin: return "Cabin";
    case PropertyType.Hotel: return "Hotel";
    default: return "Unknown";
  }
}

export function getPropertyStatusLabel(status: PropertyStatus | number): string {
  switch (status) {
    case PropertyStatus.Clean: return "Clean";
    case PropertyStatus.Dirty: return "Dirty";
    case PropertyStatus.Maintenance: return "Maintenance";
    default: return "Unknown";
  }
}

export function getBedTypeLabel(type: BedType | number): string {
  switch (type) {
    case BedType.Single: return "Single";
    case BedType.Twin: return "Twin";
    case BedType.Double: return "Double";
    case BedType.Queen: return "Queen";
    case BedType.King: return "King";
    case BedType.SofaBed: return "SofaBed";
    case BedType.BunkBed: return "BunkBed";
    case BedType.BabyCrib: return "BabyCrib";
    case BedType.Futon: return "Futon";
    default: return "Unknown";
  }
}
