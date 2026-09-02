"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  usePropertyById,
  useUpdateProperty,
  useUpdatePropertyAddress,
  useUpdatePropertyListingDetails,
  usePropertyImages,
  useUploadPropertyImages,
  useDeletePropertyImage,
  useSetCoverImage,
  useBulkConfigureDailyPrices,
  useDeletePropertyDailyPrice,
  usePropertyDailyPrices,
} from "@/lib/hooks/useProperties";
import { useAdminPropertyBookings } from "@/lib/hooks/useBooking";
import { useCategories } from "@/lib/hooks/useCategory";
import { usePropertyCategoryItems } from "@/lib/hooks/usePropertyCategoryItem";
import { usePropertyCategories } from "@/lib/hooks/usePropertyCategory";
import { API_BASE_URL } from "@/lib/api/config";
import Image from "next/image";
import { BedType, type DailyPrice } from "@/lib/types/property";
import type { AdminBookingListItem } from "@/lib/types/booking";
import { formatUsd } from "@/lib/utils/currency";

type Tab = "basic" | "features" | "beds" | "address" | "details" | "images" | "prices";

const hiddenListingDefaults = {
  extraPeople: "",
  extraPeopleFee: 0,
};

const adminCalendarWeekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatLocalDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return year + "-" + month + "-" + day;
}

function getMonthPresetEndDate(dateString: string, months: number) {
  const date = new Date(dateString + "T00:00:00");
  date.setMonth(date.getMonth() + months);
  date.setDate(date.getDate() - 1);
  return formatLocalDate(date);
}

function getMonthStart(dateString: string) {
  const date = new Date(dateString + "T00:00:00");
  return formatLocalDate(new Date(date.getFullYear(), date.getMonth(), 1));
}

function getMonthEnd(dateString: string) {
  const date = new Date(dateString + "T00:00:00");
  return formatLocalDate(new Date(date.getFullYear(), date.getMonth() + 1, 0));
}

function addMonths(dateString: string, months: number) {
  const date = new Date(dateString + "T00:00:00");
  return formatLocalDate(new Date(date.getFullYear(), date.getMonth() + months, 1));
}

function getMonthLabel(dateString: string) {
  return new Date(dateString + "T00:00:00").toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
}

function getCalendarDays(monthDate: string) {
  const date = new Date(monthDate + "T00:00:00");
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const start = new Date(firstDay);
  start.setDate(firstDay.getDate() - firstDay.getDay());

  return Array.from({ length: 42 }, (_, index) => {
    const current = new Date(start);
    current.setDate(start.getDate() + index);
    return {
      date: formatLocalDate(current),
      day: current.getDate(),
      isCurrentMonth: current.getMonth() === month,
    };
  });
}

function formatAdminBookingDate(value: string) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("en", { year: "numeric", month: "short", day: "2-digit" }).format(new Date(value));
}

function formatAdminBookingMoney(value: number) {
  return formatUsd(value);
}

function adminBookingStatusClass(statusName: string) {
  const normalized = statusName.toLowerCase();
  if (normalized.includes("confirm")) return "bg-emerald-50 text-emerald-700";
  if (normalized.includes("pending")) return "bg-amber-50 text-amber-700";
  if (normalized.includes("cancel")) return "bg-red-50 text-red-700";
  return "bg-[#f5f7f6] text-[#667c74]";
}

// Strip IDs from sleeping arrangements — the PUT endpoint does NOT accept them
function stripArrangements(arrangements: any[]) {
  return (arrangements || []).map(r => ({
    name: r.name,
    displayOrder: r.displayOrder,
    beds: (r.beds || []).map((b: any) => ({
      bedType: b.bedType,
      quantity: b.quantity,
    })),
  }));
}

// Build the exact payload for PUT /api/properties/{id}
// Schema: categoryId, name, description, bedroomNo, bathroomNo, roomNo, capacity, size,
//         basePrice, propertyType, propertyStatus, hasSeaView/Pool/Garden/Mountain/City,
//         latitude, longitude, rulesCancellation, notes, sleepingArrangements, propertyCategoryItemIds
function buildPutPayload(property: any, currentItemIds: string[], overrides: Record<string, any>) {
  return {
    categoryId: property.category?.id || "00000000-0000-0000-0000-000000000000",
    name: property.name || "",
    description: property.description || "",
    bedroomNo: property.bedroomNo || 0,
    bathroomNo: property.bathroomNo || 0,
    roomNo: property.roomNo || 0,
    capacity: property.capacity || 0,
    size: property.size || 0,
    basePrice: property.basePrice || 0,
    propertyType: property.propertyType || 1,
    propertyStatus: property.propertyStatus || 1,
    hasSeaView: property.hasSeaView || false,
    hasPoolView: property.hasPoolView || false,
    hasGardenView: property.hasGardenView || false,
    hasMountainView: property.hasMountainView || false,
    hasCityView: property.hasCityView || false,
    latitude: property.latitude || 0,
    longitude: property.longitude || 0,
    rulesCancellation: property.rulesCancellation || "",
    notes: property.notes || "",
    sleepingArrangements: stripArrangements(property.sleepingArrangements || []),
    propertyCategoryItemIds: currentItemIds,
    ...overrides,
  };
}

export default function PropertyEditContent({ id }: { id: string }) {
  const [activeTab, setActiveTab] = useState<Tab>("basic");
  const { data: property, isLoading } = usePropertyById(id);
  // Fetch items once at top level so all tabs can derive current category item IDs
  const { data: includeItems = [] } = usePropertyCategoryItems();

  // Compute current selected item IDs from property.categories (name-based) × items (id-based)
  const currentItemIds = useMemo(() => {
    if (!property) return [];
    const names: string[] = property.categories?.flatMap((c: any) => c.items) || [];
    return includeItems.filter((i: any) => names.includes(i.name)).map((i: any) => i.id);
  }, [property, includeItems]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20 text-[14px] text-[#8a9a94]">
        <span className="mr-2 inline-block size-5 animate-spin rounded-full border-2 border-[#dfe8e4] border-t-[#2e6f57]" />
        Loading property…
      </div>
    );
  }

  if (!property) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-[18px] font-semibold text-[#183c2f]">Property not found</h2>
        <Link href="/admin/properties" className="mt-4 inline-block text-[#2e6f57] hover:underline">Back to list</Link>
      </div>
    );
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "basic", label: "Basic Info" },
    { key: "features", label: "Features" },
    { key: "beds", label: "Beds" },
    { key: "address", label: "Address" },
    { key: "details", label: "Listing Details" },
    { key: "images", label: "Images" },
    { key: "prices", label: "Prices" },
  ];

  const sharedProps = { property, currentItemIds };

  return (
    <div className="mx-auto max-w-5xl min-w-0">
      <header className="mb-8">
        <Link href="/admin/properties" className="mb-4 inline-flex items-center gap-2 text-[13px] font-medium text-[#667c74] hover:text-[#183c2f]">
          <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Properties
        </Link>
        <h1 className="text-[26px] font-semibold leading-tight text-[#183c2f] lg:text-[32px]">Edit: {property.name}</h1>
        <p className="mt-1 text-[14px] text-[#667c74]">{property.code}</p>
      </header>

      <div className="mb-6 flex gap-1 overflow-x-auto border-b border-[#dfe8e4]">
        {tabs.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className={`whitespace-nowrap px-4 py-2.5 text-[13px] font-medium transition-colors ${
              activeTab === tab.key
                ? "border-b-2 border-[#2e6f57] text-[#183c2f]"
                : "border-b-2 border-transparent text-[#667c74] hover:border-[#dfe8e4] hover:text-[#183c2f]"
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-[#dfe8e4] bg-white p-6 shadow-[0_8px_24px_rgba(31,77,61,0.05)] sm:p-8">
        {activeTab === "basic"   && <BasicInfoTab   {...sharedProps} includeItems={includeItems} />}
        {activeTab === "features"&& <FeaturesTab    {...sharedProps} includeItems={includeItems} />}
        {activeTab === "beds"    && <BedsTab        {...sharedProps} includeItems={includeItems} />}
        {activeTab === "address" && <AddressTab     property={property} />}
        {activeTab === "details" && <ListingDetailsTab property={property} />}
        {activeTab === "images"  && <ImagesTab      property={property} />}
        {activeTab === "prices"  && <PricesTab      property={property} />}
      </div>
    </div>
  );
}

// ── 1. Basic Info — PUT /api/properties/{id} ─────────────────────────────────
function BasicInfoTab({ property, currentItemIds, includeItems }: { property: any; currentItemIds: string[]; includeItems: any[] }) {
  const { mutate: updateProperty, isPending } = useUpdateProperty();
  const { data: locationCategories = [] } = useCategories();

  const [form, setForm] = useState({
    name: property.name,
    description: property.description,
    bedroomNo: property.bedroomNo,
    bathroomNo: property.bathroomNo,
    roomNo: property.roomNo,
    capacity: property.capacity,
    size: property.size,
    basePrice: property.basePrice,
    categoryId: property.category?.id || "",
    propertyType: property.propertyType,
    propertyStatus: property.propertyStatus,
    isAvailable: property.isAvailable,
    isFeatured: property.isFeatured,
    latitude: property.latitude || 0,
    longitude: property.longitude || 0,
    rulesCancellation: property.rulesCancellation || "",
    notes: property.notes || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // PUT /api/properties/{id} — pass currentItemIds and current beds unchanged
    updateProperty({
      id: property.id,
      payload: buildPutPayload(property, currentItemIds, {
        ...form,
        // Preserve existing sleeping arrangements (stripped of IDs)
        sleepingArrangements: stripArrangements(property.sleepingArrangements || []),
      }),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in">
      <div>
        <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Property Name</label>
        <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]/20" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">View Category</label>
          <select value={form.categoryId} onChange={e => setForm({ ...form, categoryId: e.target.value })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57]">
            <option value="" disabled>Select View Category</option>
            {(locationCategories as any[]).map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Description</label>
        <textarea rows={4} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57]" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-5">
        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Property Type</label>
          <select value={form.propertyType} onChange={e => setForm({ ...form, propertyType: Number(e.target.value) })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57]">
            {[["Apartment",1],["Villa",2],["Studio",3],["Chalet",4],["TwinHouse",5],["TownHouse",6],["Duplex",7],["Penthouse",8],["Cabin",9],["Hotel",10]].map(([l,v]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Status</label>
          <select value={form.propertyStatus} onChange={e => setForm({ ...form, propertyStatus: Number(e.target.value) })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57]">
            <option value={1}>Clean</option>
            <option value={2}>Dirty</option>
            <option value={3}>Maintenance</option>
          </select>
        </div>
        <div className="flex items-center gap-3 pt-6">
          <input type="checkbox" checked={form.isAvailable} onChange={e => setForm({ ...form, isAvailable: e.target.checked })} className="size-5 rounded border-gray-300 text-[#2e6f57] focus:ring-[#2e6f57]" />
          <span className="text-[14px] font-medium text-[#183c2f]">Available</span>
        </div>
        <div className="flex items-center gap-3 pt-6">
          <input type="checkbox" checked={form.isFeatured} onChange={e => setForm({ ...form, isFeatured: e.target.checked })} className="size-5 rounded border-gray-300 text-[#2e6f57] focus:ring-[#2e6f57]" />
          <span className="text-[14px] font-medium text-[#183c2f]">Featured</span>
        </div>
        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Base Price / Night (Banner)</label>
          <input type="number" min={0} value={form.basePrice} onChange={e => setForm({ ...form, basePrice: Number(e.target.value) })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57]" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        {([["Bedrooms","bedroomNo"],["Bathrooms","bathroomNo"],["Rooms","roomNo"],["Capacity","capacity"]] as [string, keyof typeof form][]).map(([label, key]) => (
          <div key={key}>
            <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">{label}</label>
            <input type="number" min={0} value={form[key] as number} onChange={e => setForm({ ...form, [key]: Number(e.target.value) })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57]" />
          </div>
        ))}
        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Size (m²)</label>
          <input type="number" min={1} value={form.size} onChange={e => setForm({ ...form, size: Number(e.target.value) })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57]" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Cancellation Rules</label>
          <textarea rows={2} value={form.rulesCancellation} onChange={e => setForm({ ...form, rulesCancellation: e.target.value })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57]" />
        </div>
        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Notes</label>
          <textarea rows={2} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57]" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Latitude</label>
          <input type="number" step="any" value={form.latitude} onChange={e => setForm({ ...form, latitude: Number(e.target.value) })} placeholder="e.g. 31.2001" className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57]" />
        </div>
        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Longitude</label>
          <input type="number" step="any" value={form.longitude} onChange={e => setForm({ ...form, longitude: Number(e.target.value) })} placeholder="e.g. 29.9187" className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57]" />
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-[#dfe8e4]">
        <button type="submit" disabled={isPending} className="rounded-full bg-[#2e6f57] px-6 py-2.5 text-[14px] font-medium text-white transition hover:bg-[#255f49] disabled:opacity-50">
          {isPending ? "Saving…" : "Save Basic Info"}
        </button>
      </div>
    </form>
  );
}

// ── 2. Features — PUT /api/properties/{id} with views + category item IDs ────
function FeaturesTab({ property, currentItemIds, includeItems }: { property: any; currentItemIds: string[]; includeItems: any[] }) {
  const { mutate: updateProperty, isPending } = useUpdateProperty();
  const { data: includeCategories = [] } = usePropertyCategories();

  const [selectedIds, setSelectedIds] = useState<string[]>(currentItemIds);
  const [views, setViews] = useState({
    hasSeaView: property.hasSeaView,
    hasPoolView: property.hasPoolView,
    hasGardenView: property.hasGardenView,
    hasMountainView: property.hasMountainView,
    hasCityView: property.hasCityView,
  });

  const toggle = (id: string) =>
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // PUT /api/properties/{id} — preserves existing beds, updates views + item IDs
    updateProperty({
      id: property.id,
      payload: buildPutPayload(property, selectedIds, {
        ...views,
        sleepingArrangements: stripArrangements(property.sleepingArrangements || []),
        propertyCategoryItemIds: selectedIds,
      }),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in">
      <div>
        <h3 className="mb-3 text-[14px] font-semibold text-[#183c2f]">Property Views</h3>
        <div className="flex flex-wrap gap-5">
          {([["hasSeaView","Sea View"],["hasPoolView","Pool View"],["hasGardenView","Garden View"],["hasMountainView","Mountain View"],["hasCityView","City View"]] as [keyof typeof views, string][]).map(([key, label]) => (
            <label key={key} className="flex items-center gap-2">
              <input type="checkbox" checked={views[key]} onChange={e => setViews({ ...views, [key]: e.target.checked })} className="size-4 rounded border-gray-300 text-[#2e6f57] focus:ring-[#2e6f57]" />
              <span className="text-[14px] font-medium text-[#183c2f]">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-[14px] font-semibold text-[#183c2f]">Includes & Amenities</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(includeCategories as any[]).map((cat: any) => {
            const catItems = includeItems.filter((i: any) => i.propertyCategoryId === cat.id);
            if (!catItems.length) return null;
            return (
              <div key={cat.id} className="rounded-xl border border-[#dfe8e4] bg-[#f5f7f6] p-4">
                <h4 className="mb-3 text-[13px] font-semibold text-[#183c2f]">{cat.name}</h4>
                {catItems.map((item: any) => (
                  <label key={item.id} className="flex items-center gap-2 mb-2">
                    <input type="checkbox" checked={selectedIds.includes(item.id)} onChange={() => toggle(item.id)} className="size-4 rounded border-gray-300 text-[#2e6f57] focus:ring-[#2e6f57]" />
                    <span className="text-[13px] text-[#667c74]">{item.name}</span>
                  </label>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-[#dfe8e4]">
        <button type="submit" disabled={isPending} className="rounded-full bg-[#2e6f57] px-6 py-2.5 text-[14px] font-medium text-white transition hover:bg-[#255f49] disabled:opacity-50">
          {isPending ? "Saving…" : "Save Features"}
        </button>
      </div>
    </form>
  );
}

// ── 3. Beds — PUT /api/properties/{id} with new sleeping arrangements ─────────
function BedsTab({ property, currentItemIds, includeItems }: { property: any; currentItemIds: string[]; includeItems: any[] }) {
  const { mutate: updateProperty, isPending } = useUpdateProperty();
  // Local copy of arrangements without IDs (as required by PUT)
  const [arrangements, setArrangements] = useState<any[]>(
    stripArrangements(property.sleepingArrangements || [])
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // PUT /api/properties/{id} — sends cleaned arrangements, preserves views + item IDs
    updateProperty({
      id: property.id,
      payload: buildPutPayload(property, currentItemIds, {
        sleepingArrangements: arrangements,
      }),
    });
  };

  const addRoom = () => setArrangements(prev => [...prev, { name: `Room ${prev.length + 1}`, displayOrder: prev.length + 1, beds: [{ bedType: BedType.Double, quantity: 1 }] }]);
  const removeRoom = (ri: number) => setArrangements(prev => prev.filter((_, i) => i !== ri));
  const addBed = (ri: number) => setArrangements(prev => prev.map((r, i) => i === ri ? { ...r, beds: [...r.beds, { bedType: BedType.Single, quantity: 1 }] } : r));
  const removeBed = (ri: number, bi: number) => setArrangements(prev => prev.map((r, i) => i === ri ? { ...r, beds: r.beds.filter((_: any, j: number) => j !== bi) } : r));
  const updateRoomName = (ri: number, name: string) => setArrangements(prev => prev.map((r, i) => i === ri ? { ...r, name } : r));
  const updateBed = (ri: number, bi: number, key: string, val: any) =>
    setArrangements(prev => prev.map((r, i) => i === ri ? { ...r, beds: r.beds.map((b: any, j: number) => j === bi ? { ...b, [key]: val } : b) } : r));

  const BED_OPTIONS = [[0,"Single"],[1,"Twin"],[2,"Double"],[3,"Queen"],[4,"King"],[5,"Sofa Bed"],[6,"Bunk Bed"],[7,"Baby Crib"],[8,"Futon"]];

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in">
      {arrangements.map((room, ri) => (
        <div key={ri} className="rounded-xl border border-[#dfe8e4] p-5">
          <div className="flex items-center justify-between mb-4">
            <input type="text" value={room.name} onChange={e => updateRoomName(ri, e.target.value)}
              className="flex-1 bg-transparent font-semibold text-[#183c2f] outline-none border-b border-transparent focus:border-[#2e6f57]" />
            <button type="button" onClick={() => removeRoom(ri)} className="ml-4 text-[12px] font-medium text-red-500 hover:underline">
              Remove
            </button>
          </div>
          <div className="space-y-2">
            {room.beds.map((bed: any, bi: number) => (
              <div key={bi} className="flex items-center gap-3">
                <select value={bed.bedType} onChange={e => updateBed(ri, bi, "bedType", Number(e.target.value))}
                  className="flex-1 rounded-lg border border-[#dfe8e4] px-3 py-2 text-[13px] outline-none focus:border-[#2e6f57]">
                  {BED_OPTIONS.map(([val, label]) => <option key={val} value={val}>{label}</option>)}
                </select>
                <input type="number" min={1} value={bed.quantity} onChange={e => updateBed(ri, bi, "quantity", Number(e.target.value))}
                  className="w-20 rounded-lg border border-[#dfe8e4] px-3 py-2 text-[13px] text-center outline-none focus:border-[#2e6f57]" />
                <button type="button" onClick={() => removeBed(ri, bi)} className="text-[#8a9a94] hover:text-red-500">
                  <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
            ))}
            <button type="button" onClick={() => addBed(ri)} className="mt-1 text-[13px] font-medium text-[#2e6f57] hover:underline">+ Add Bed</button>
          </div>
        </div>
      ))}
      <button type="button" onClick={addRoom} className="w-full rounded-xl border border-dashed border-[#dfe8e4] py-4 text-[14px] font-medium text-[#667c74] transition hover:bg-[#f5f7f6]">
        + Add Room
      </button>
      <div className="flex justify-end pt-4 border-t border-[#dfe8e4]">
        <button type="submit" disabled={isPending} className="rounded-full bg-[#2e6f57] px-6 py-2.5 text-[14px] font-medium text-white transition hover:bg-[#255f49] disabled:opacity-50">
          {isPending ? "Saving…" : "Save Sleeping Arrangements"}
        </button>
      </div>
    </form>
  );
}

// ── 4. Address — PUT /api/properties/{propertyId}/address ────────────────────
// Schema: { country, city, area, zipCode, street }  (no state field)
function AddressTab({ property }: { property: any }) {
  const { mutate: updateAddress, isPending } = useUpdatePropertyAddress();
  const [address, setAddress] = useState({
    country: property.address?.country || "",
    city: property.address?.city || "",
    area: property.address?.area || "",
    zipCode: property.address?.zipCode || "",
    street: property.address?.street || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Exactly matches PUT /api/properties/{propertyId}/address schema
    updateAddress({ id: property.id, payload: address });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Country</label>
          <input type="text" value={address.country} onChange={e => setAddress({ ...address, country: e.target.value })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57]" />
        </div>
        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">City</label>
          <input type="text" value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57]" />
        </div>
        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Area / District</label>
          <input type="text" value={address.area} onChange={e => setAddress({ ...address, area: e.target.value })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57]" />
        </div>
        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Zip Code</label>
          <input type="text" value={address.zipCode} onChange={e => setAddress({ ...address, zipCode: e.target.value })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57]" />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Street</label>
          <input type="text" value={address.street} onChange={e => setAddress({ ...address, street: e.target.value })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57]" />
        </div>
      </div>
      <div className="flex justify-end pt-4 border-t border-[#dfe8e4]">
        <button type="submit" disabled={isPending} className="rounded-full bg-[#2e6f57] px-6 py-2.5 text-[14px] font-medium text-white transition hover:bg-[#255f49] disabled:opacity-50">
          {isPending ? "Saving…" : "Save Address"}
        </button>
      </div>
    </form>
  );
}

// ── 5. Listing Details — PUT /api/properties/{propertyId}/listing-details ─────
// Schema: lateCheckIn, outdoorFacility, originalService, cancellation,
//         extraPeopleFee, privateBathroom (capital B!), checkInHour, checkOutHour,
//         familyFriendly, privateEntrance, extraPeople
function ListingDetailsTab({ property }: { property: any }) {
  const { mutate: updateDetails, isPending } = useUpdatePropertyListingDetails();
  const [d, setD] = useState({
    lateCheckIn: property.listingDetails?.lateCheckIn || "",
    outdoorFacility: property.listingDetails?.outdoorFacility || "",
    originalService: property.listingDetails?.originalService || "",
    cancellation: property.listingDetails?.cancellation || "",
    extraPeopleFee: hiddenListingDefaults.extraPeopleFee,
    extraPeople: hiddenListingDefaults.extraPeople,
    checkInHour: property.listingDetails?.checkInHour || "14:00:00",
    checkOutHour: property.listingDetails?.checkOutHour || "12:00:00",
    // API uses "privateBathroom" (capital B), GET response returns "privatebathroom" (lowercase b)
    privatebathroom: property.listingDetails?.privatebathroom ?? property.listingDetails?.privateBathroom ?? false,
    familyFriendly: property.listingDetails?.familyFriendly || false,
    privateEntrance: property.listingDetails?.privateEntrance || false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Exactly matches PUT /api/properties/{propertyId}/listing-details schema
    updateDetails({ id: property.id, payload: { ...d, ...hiddenListingDefaults } });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Check-In Hour</label>
          <input type="time" step="1" value={d.checkInHour} onChange={e => setD({ ...d, checkInHour: e.target.value })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57]" />
        </div>
        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Check-Out Hour</label>
          <input type="time" step="1" value={d.checkOutHour} onChange={e => setD({ ...d, checkOutHour: e.target.value })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57]" />
        </div>
        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Late Check-In Policy</label>
          <input type="text" value={d.lateCheckIn} onChange={e => setD({ ...d, lateCheckIn: e.target.value })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57]" />
        </div>
        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Cancellation Policy</label>
          <input type="text" value={d.cancellation} onChange={e => setD({ ...d, cancellation: e.target.value })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57]" />
        </div>
        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Outdoor Facility</label>
          <input type="text" value={d.outdoorFacility} onChange={e => setD({ ...d, outdoorFacility: e.target.value })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57]" />
        </div>
        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Original Service</label>
          <input type="text" value={d.originalService} onChange={e => setD({ ...d, originalService: e.target.value })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57]" />
        </div>
      </div>

      <div className="flex flex-wrap gap-6 rounded-xl border border-[#dfe8e4] bg-[#f5f7f6] p-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={d.familyFriendly} onChange={e => setD({ ...d, familyFriendly: e.target.checked })} className="size-4 rounded border-gray-300 text-[#2e6f57] focus:ring-[#2e6f57]" />
          <span className="text-[14px] font-medium text-[#183c2f]">Family Friendly</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={d.privatebathroom} onChange={e => setD({ ...d, privatebathroom: e.target.checked })} className="size-4 rounded border-gray-300 text-[#2e6f57] focus:ring-[#2e6f57]" />
          <span className="text-[14px] font-medium text-[#183c2f]">Private Bathroom</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={d.privateEntrance} onChange={e => setD({ ...d, privateEntrance: e.target.checked })} className="size-4 rounded border-gray-300 text-[#2e6f57] focus:ring-[#2e6f57]" />
          <span className="text-[14px] font-medium text-[#183c2f]">Private Entrance</span>
        </label>
      </div>

      <div className="flex justify-end pt-4 border-t border-[#dfe8e4]">
        <button type="submit" disabled={isPending} className="rounded-full bg-[#2e6f57] px-6 py-2.5 text-[14px] font-medium text-white transition hover:bg-[#255f49] disabled:opacity-50">
          {isPending ? "Saving…" : "Save Listing Details"}
        </button>
      </div>
    </form>
  );
}

// ── 6. Images — POST /api/properties/{id}/images + DELETE + set-cover ─────────
function ImagesTab({ property }: { property: any }) {
  const { data: images = [], isLoading } = usePropertyImages(property.id);
  const { mutate: upload, isPending: isUploading } = useUploadPropertyImages();
  const { mutate: setCover } = useSetCoverImage();
  const { mutate: deleteImage } = useDeletePropertyImage();

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const formData = new FormData();
    Array.from(e.target.files).forEach(f => formData.append("Images", f));
    upload({ id: property.id, formData }, { onSuccess: () => { e.target.value = "" } });
  };

  if (isLoading) return <div className="py-10 text-center text-[#8a9a94]">Loading images…</div>;

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[15px] font-semibold text-[#183c2f]">Property Images</h2>
          <p className="text-[13px] text-[#667c74]">Hover an image to set it as cover or delete it.</p>
        </div>
        <label className={`inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#2e6f57] px-4 py-2 text-[13px] font-medium text-white transition hover:bg-[#255f49] ${isUploading ? "opacity-50" : ""}`}>
          {isUploading ? "Uploading…" : "+ Upload Images"}
          <input type="file" multiple accept="image/*" className="hidden" onChange={handleUpload} disabled={isUploading} />
        </label>
      </div>
      {images.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#dfe8e4] py-16 text-center">
          <p className="text-[14px] text-[#8a9a94]">No images uploaded yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {images.map(img => (
            <div key={img.id} className="group relative aspect-square overflow-hidden rounded-xl border border-[#dfe8e4] bg-[#f5f7f6]">
              <Image src={`${API_BASE_URL}/${img.imageUrl}`} alt="Property" fill className="object-cover" unoptimized />
              {img.isCover && (
                <span className="absolute left-2 top-2 rounded bg-white/90 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#2e6f57]">Cover</span>
              )}
              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                {!img.isCover && (
                  <button onClick={() => setCover({ propertyId: property.id, imageId: img.id })} className="rounded bg-white px-2 py-1 text-[11px] font-medium text-[#183c2f] hover:bg-gray-100">Set Cover</button>
                )}
                <button onClick={() => deleteImage({ propertyId: property.id, imageId: img.id })} className="rounded bg-red-600 px-2 py-1 text-[11px] font-medium text-white hover:bg-red-700">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Prices - date-based daily pricing
function PricesTab({ property }: { property: any }) {
  const today = formatLocalDate(new Date());
  const defaultViewEnd = getMonthPresetEndDate(today, 1);
  const { mutateAsync: bulkConfigurePrices, isPending: isSaving } = useBulkConfigureDailyPrices();
  const { mutateAsync: deleteDailyPrice, isPending: isDeleting } = useDeletePropertyDailyPrice();

  const [mode, setMode] = useState<"months" | "custom">("months");
  const [startDate, setStartDate] = useState(today);
  const [durationInMonths, setDurationInMonths] = useState(1);
  const [endDate, setEndDate] = useState(defaultViewEnd);
  const [calendarMonth, setCalendarMonth] = useState(getMonthStart(today));
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [price, setPrice] = useState(property.basePrice || 0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const calendarStartDate = getMonthStart(calendarMonth);
  const calendarEndDate = getMonthEnd(calendarMonth);

  const { data: dailyPricesData, isLoading } = usePropertyDailyPrices({
    propertyId: property.id,
    startDate: calendarStartDate,
    endDate: calendarEndDate,
  });
  const {
    data: bookingsResponse,
    isLoading: isLoadingBookings,
    isError: isBookingsError,
  } = useAdminPropertyBookings({
    PropertyId: property.id,
    PropertyNumber: property.code || undefined,
    PageNumber: 1,
    PageSize: 10,
    SortBy: "checkIn",
    IsDescending: false,
  });

  const dailyPrices = dailyPricesData?.prices || [];
  const selectedCount = selectedDates.length;
  const propertyBookings = bookingsResponse?.items || [];

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setError("");

    if (!startDate) {
      setError("Choose a start date.");
      return;
    }

    if (price < 0) {
      setError("Price cannot be negative.");
      return;
    }

    if (mode === "custom" && (!endDate || endDate < startDate)) {
      setError("Choose an end date after the start date.");
      return;
    }

    try {
      const result = await bulkConfigurePrices({
        propertyId: property.id,
        payload: {
          startDate,
          durationInMonths: mode === "months" ? durationInMonths : null,
          endDate: mode === "custom" ? endDate : null,
          price,
        },
      });

      if (!result.isSuccess) {
        setError(result.errors?.[0] || result.message || "Failed to save daily prices.");
        return;
      }

      setCalendarMonth(getMonthStart(startDate));
      setSelectedDates([]);
      setMessage(result.message || "Daily prices saved.");
    } catch (err) {
      const apiError = err as { response?: { data?: { errors?: string[]; message?: string } } };
      setError(apiError.response?.data?.errors?.[0] || apiError.response?.data?.message || "Failed to save daily prices.");
    }
  };

  const handleDelete = async (date: string) => {
    setMessage("");
    setError("");

    try {
      const result = await deleteDailyPrice({ propertyId: property.id, date });
      if (!result.isSuccess) {
        setError(result.errors?.[0] || result.message || "Failed to delete this daily price.");
        return;
      }
      setSelectedDates(prev => prev.filter(selectedDate => selectedDate !== date));
      setMessage(result.message || "Daily price deleted.");
    } catch (err) {
      const apiError = err as { response?: { data?: { errors?: string[]; message?: string } } };
      setError(apiError.response?.data?.errors?.[0] || apiError.response?.data?.message || "Failed to delete this daily price.");
    }
  };

  const toggleSelectedDate = (date: string) => {
    setSelectedDates(prev =>
      prev.includes(date) ? prev.filter(selectedDate => selectedDate !== date) : [...prev, date]
    );
  };

  const handleBulkDelete = async () => {
    setMessage("");
    setError("");

    if (selectedDates.length === 0) {
      setError("Select at least one priced date to delete.");
      return;
    }

    const datesToDelete = [...selectedDates];
    const results = await Promise.allSettled(
      datesToDelete.map(date => deleteDailyPrice({ propertyId: property.id, date }))
    );
    const deletedDates = datesToDelete.filter((_, index) => {
      const result = results[index];
      return result.status === "fulfilled" && result.value.isSuccess;
    });
    const failedCount = datesToDelete.length - deletedDates.length;

    setSelectedDates(prev => prev.filter(date => !deletedDates.includes(date)));

    if (failedCount > 0) {
      setError(`Deleted ${deletedDates.length} date${deletedDates.length === 1 ? "" : "s"}. ${failedCount} date${failedCount === 1 ? "" : "s"} could not be deleted.`);
      return;
    }

    setMessage(`Deleted ${deletedDates.length} selected date${deletedDates.length === 1 ? "" : "s"}.`);
  };

  const handleMonthChange = (month: string) => {
    setCalendarMonth(month);
    setSelectedDates([]);
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <form onSubmit={handleSave} className="space-y-5">
        <div>
          <h2 className="mb-1 text-[15px] font-semibold text-[#183c2f]">Daily Price Setup</h2>
          <p className="text-[13px] leading-5 text-[#667c74]">
            Set one nightly price across a preset month span or a custom calendar range.
          </p>
        </div>

        <div className="inline-flex rounded-full border border-[#dfe8e4] bg-[#f8faf9] p-1">
          <button
            type="button"
            onClick={() => setMode("months")}
            className={mode === "months" ? "h-9 rounded-full bg-[#2e6f57] px-4 text-[12px] font-semibold text-white transition" : "h-9 rounded-full px-4 text-[12px] font-semibold text-[#667c74] transition hover:text-[#183c2f]"}
          >
            Month presets
          </button>
          <button
            type="button"
            onClick={() => setMode("custom")}
            className={mode === "custom" ? "h-9 rounded-full bg-[#2e6f57] px-4 text-[12px] font-semibold text-white transition" : "h-9 rounded-full px-4 text-[12px] font-semibold text-[#667c74] transition hover:text-[#183c2f]"}
          >
            Custom range
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <label className="block">
            <span className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Start Date</span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="h-11 w-full rounded-xl border border-[#dfe8e4] px-4 text-[14px] outline-none focus:border-[#2e6f57]"
            />
          </label>

          {mode === "months" ? (
            <label className="block">
              <span className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Duration</span>
              <select
                value={durationInMonths}
                onChange={(e) => setDurationInMonths(Number(e.target.value))}
                className="h-11 w-full rounded-xl border border-[#dfe8e4] bg-white px-4 text-[14px] outline-none focus:border-[#2e6f57]"
              >
                <option value={1}>1 month</option>
                <option value={2}>2 months</option>
                <option value={3}>3 months</option>
              </select>
            </label>
          ) : (
            <label className="block">
              <span className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">End Date</span>
              <input
                type="date"
                value={endDate}
                min={startDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="h-11 w-full rounded-xl border border-[#dfe8e4] px-4 text-[14px] outline-none focus:border-[#2e6f57]"
              />
            </label>
          )}

          <label className="block">
            <span className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Nightly Price</span>
            <input
              type="number"
              min={0}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="h-11 w-full rounded-xl border border-[#dfe8e4] px-4 text-[14px] outline-none focus:border-[#2e6f57]"
            />
          </label>
        </div>

        {(message || error) && (
          <p className={error ? "rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-[12px] leading-5 text-red-600" : "rounded-lg border border-[#dceee7] bg-[#f1faf6] px-3 py-2 text-[12px] leading-5 text-[#2e6f57]"}>
            {error || message}
          </p>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-full bg-[#2e6f57] px-6 py-2.5 text-[14px] font-medium text-white transition hover:bg-[#255f49] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Saving..." : "Save Daily Prices"}
          </button>
        </div>
      </form>

      <AdminDailyPricesCalendar
        month={calendarMonth}
        prices={dailyPrices}
        isLoading={isLoading}
        isDeleting={isDeleting}
        selectedDates={selectedDates}
        selectedCount={selectedCount}
        onMonthChange={handleMonthChange}
        onToggleDate={toggleSelectedDate}
        onDeleteDate={handleDelete}
        onBulkDelete={handleBulkDelete}
        onClearSelection={() => setSelectedDates([])}
      />

      <PropertyBookingsTable
        bookings={propertyBookings}
        isLoading={isLoadingBookings}
        isError={isBookingsError}
      />
    </div>
  );
}

type AdminDailyPricesCalendarProps = {
  month: string;
  prices: DailyPrice[];
  isLoading: boolean;
  isDeleting: boolean;
  selectedDates: string[];
  selectedCount: number;
  onMonthChange: (month: string) => void;
  onToggleDate: (date: string) => void;
  onDeleteDate: (date: string) => void;
  onBulkDelete: () => void;
  onClearSelection: () => void;
};

function AdminDailyPricesCalendar({
  month,
  prices,
  isLoading,
  isDeleting,
  selectedDates,
  selectedCount,
  onMonthChange,
  onToggleDate,
  onDeleteDate,
  onBulkDelete,
  onClearSelection,
}: AdminDailyPricesCalendarProps) {
  const calendarDays = useMemo(() => getCalendarDays(month), [month]);
  const priceByDate = useMemo(() => new Map(prices.map(item => [item.date, item])), [prices]);

  return (
    <div className="border-t border-[#eef3f1] pt-6">
      <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h3 className="text-[15px] font-semibold text-[#183c2f]">Configured Dates</h3>
          <p className="mt-1 text-[13px] leading-5 text-[#667c74]">
            Select priced calendar days to remove them, or hover a day to inspect its full date and price.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onMonthChange(addMonths(month, -1))}
            className="grid h-9 w-9 place-items-center rounded-lg border border-[#dfe8e4] text-[18px] font-semibold text-[#667c74] transition hover:border-[#2e6f57] hover:text-[#183c2f]"
            aria-label="Previous month"
          >
            {"<"}
          </button>
          <div className="grid h-9 min-w-[150px] place-items-center rounded-lg border border-[#dfe8e4] px-4 text-[13px] font-semibold text-[#183c2f]">
            {getMonthLabel(month)}
          </div>
          <button
            type="button"
            onClick={() => onMonthChange(addMonths(month, 1))}
            className="grid h-9 w-9 place-items-center rounded-lg border border-[#dfe8e4] text-[18px] font-semibold text-[#667c74] transition hover:border-[#2e6f57] hover:text-[#183c2f]"
            aria-label="Next month"
          >
            {">"}
          </button>
          <button
            type="button"
            onClick={() => onMonthChange(getMonthStart(formatLocalDate(new Date())))}
            className="h-9 rounded-lg border border-[#dfe8e4] px-3 text-[12px] font-semibold text-[#667c74] transition hover:border-[#2e6f57] hover:text-[#183c2f]"
          >
            Today
          </button>
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-3 rounded-xl border border-[#dfe8e4] bg-[#f8faf9] p-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] font-medium text-[#183c2f]">
          {selectedCount} selected
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onClearSelection}
            disabled={selectedCount === 0 || isDeleting}
            className="h-9 rounded-full border border-[#dfe8e4] px-4 text-[12px] font-semibold text-[#667c74] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Clear selection
          </button>
          <button
            type="button"
            onClick={onBulkDelete}
            disabled={selectedCount === 0 || isDeleting}
            className="h-9 rounded-full bg-red-600 px-4 text-[12px] font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Delete selected"}
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-[#dfe8e4] bg-white p-3">
        <div className="grid grid-cols-7 gap-1.5">
          {adminCalendarWeekdays.map(day => (
            <div key={day} className="grid h-8 place-items-center text-[11px] font-semibold text-[#667c74]">
              {day}
            </div>
          ))}

          {calendarDays.map(day => {
            const priceInfo = priceByDate.get(day.date);
            const hasPrice = Boolean(priceInfo);
            const isSelected = selectedDates.includes(day.date);
            const title = hasPrice ? `${day.date} - ${formatUsd(priceInfo?.price || 0)}` : `${day.date} - no price`;

            return (
              <div key={day.date} className="group relative min-w-0">
                <button
                  type="button"
                  title={title}
                  disabled={!hasPrice || isDeleting}
                  onClick={() => onToggleDate(day.date)}
                  className={[
                    "flex h-24 w-full min-w-0 flex-col items-start justify-between rounded-lg border p-2 text-left transition focus:outline-none focus:ring-2 focus:ring-[#2e6f57]/30",
                    day.isCurrentMonth ? "opacity-100" : "opacity-45",
                    hasPrice ? "border-[#a7cabb] bg-[#f1faf6] hover:border-[#2e6f57]" : "border-[#eef3f1] bg-[#fbfdfc]",
                    isSelected ? "border-[#2e6f57] bg-[#e7f4ee] text-[#183c2f] shadow-[0_8px_18px_rgba(46,111,87,0.18)]" : "",
                    !hasPrice || isDeleting ? "cursor-default" : "cursor-pointer",
                  ].join(" ")}
                >
                  <span className="text-[13px] font-bold text-[#183c2f]">
                    {day.day}
                  </span>
                  <span className={isSelected ? "w-full truncate text-[11px] font-semibold text-[#2e6f57]" : hasPrice ? "w-full truncate text-[11px] font-semibold text-[#2e6f57]" : "w-full truncate text-[10px] text-[#a2b0aa]"}>
                    {hasPrice ? formatUsd(priceInfo?.price || 0) : "No price"}
                  </span>
                </button>

                {hasPrice && (
                  <button
                    type="button"
                    disabled={isDeleting}
                    onClick={() => onDeleteDate(day.date)}
                    className="absolute bottom-2 right-2 h-6 rounded-full bg-white px-2 text-[10px] font-semibold text-red-600 opacity-0 shadow-sm transition hover:bg-red-50 focus:opacity-100 disabled:cursor-not-allowed disabled:opacity-50 group-hover:opacity-100 group-focus-within:opacity-100"
                  >
                    Delete
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {isLoading && (
          <div className="mt-3 rounded-lg bg-[#f8faf9] px-3 py-2 text-center text-[12px] text-[#8a9a94]">
            Loading prices...
          </div>
        )}

        {!isLoading && prices.length === 0 && (
          <div className="mt-3 rounded-lg bg-[#f8faf9] px-3 py-2 text-center text-[12px] text-[#8a9a94]">
            No daily prices found for this month.
          </div>
        )}
      </div>
    </div>
  );
}

function PropertyBookingsTable({
  bookings,
  isLoading,
  isError,
}: {
  bookings: AdminBookingListItem[];
  isLoading: boolean;
  isError: boolean;
}) {
  return (
    <div className="border-t border-[#eef3f1] pt-6">
      <div className="mb-4">
        <h3 className="text-[15px] font-semibold text-[#183c2f]">Bookings for this Property</h3>
        <p className="mt-1 text-[13px] leading-5 text-[#667c74]">
          Recent bookings that affect this property availability calendar.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#dfe8e4] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[14px]">
            <thead className="bg-[#f5f7f6] text-[12px] font-medium uppercase tracking-wider text-[#8a9a94]">
              <tr>
                <th className="px-4 py-3">Booking</th>
                <th className="px-4 py-3">Guest</th>
                <th className="px-4 py-3">Stay</th>
                <th className="px-4 py-3 text-right">Total</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f4f2]">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-14 text-center text-[14px] text-[#8a9a94]">
                    <span className="mr-2 inline-block size-5 animate-spin rounded-full border-2 border-[#dfe8e4] border-t-[#2e6f57]" />
                    Loading bookings...
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan={7} className="py-14 text-center text-[#183c2f]">
                    Failed to load bookings for this property.
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-14 text-center">
                    <p className="text-[15px] font-medium text-[#183c2f]">No bookings found</p>
                    <p className="mt-1 text-[13px] text-[#667c74]">This property has no bookings yet.</p>
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking.id} className="transition hover:bg-[#f5f7f6]">
                    <td className="px-4 py-3">
                      <Link href={`/admin/bookings/${booking.id}`} className="font-semibold text-[#183c2f] hover:underline">
                        {booking.bookingNumber}
                      </Link>
                      <p className="mt-0.5 text-[12px] text-[#8a9a94]">{booking.bookingTypeName}</p>
                    </td>
                    <td className="px-4 py-3 text-[#414847]">{booking.fullName}</td>
                    <td className="px-4 py-3 text-[13px] text-[#667c74]">
                      {formatAdminBookingDate(booking.checkIn)} - {formatAdminBookingDate(booking.checkOut)}
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-[#183c2f]">{formatAdminBookingMoney(booking.totalPrice)}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex rounded-full px-3 py-1 text-[12px] font-semibold ${adminBookingStatusClass(booking.statusName || "")}`}>
                        {booking.statusName}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[13px] text-[#667c74]">{formatAdminBookingDate(booking.createdAtUtc)}</td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/bookings/${booking.id}`}
                        className="inline-flex h-8 items-center rounded-lg border border-[#dfe8e4] bg-white px-3 text-[12px] font-medium text-[#2e6f57] transition hover:border-[#2e6f57] hover:bg-[#f5f7f6]"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
