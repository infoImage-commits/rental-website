"use client";

import { useState, useMemo, useEffect } from "react";
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
  usePropertyPrices,
  useCreatePropertyPrices,
  useUpdatePropertyPrice,
  useDeletePropertyPrice,
} from "@/lib/hooks/useProperties";
import { useCategories } from "@/lib/hooks/useCategory";
import { usePropertyCategoryItems } from "@/lib/hooks/usePropertyCategoryItem";
import { usePropertyCategories } from "@/lib/hooks/usePropertyCategory";
import { API_BASE_URL } from "@/lib/api/config";
import Image from "next/image";
import { BedType } from "@/lib/types/property";

type Tab = "basic" | "features" | "beds" | "address" | "details" | "images" | "prices";

const DAY_NAMES = ["", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const hiddenListingDefaults = {
  extraPeople: "",
  extraPeopleFee: 0,
};

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

// ── 7. Prices — POST /api/properties/{id}/prices + DELETE + PUT ──────────────
function PricesTab({ property }: { property: any }) {
  const { data: prices, isLoading } = usePropertyPrices(property.id);
  const { mutateAsync: createPrices } = useCreatePropertyPrices();
  const { mutateAsync: updatePrice } = useUpdatePropertyPrice();
  const { mutateAsync: deletePrice } = useDeletePropertyPrice();
  
  const [isSaving, setIsSaving] = useState(false);
  const [dayOverrides, setDayOverrides] = useState<Record<number, { enabled: boolean; price: number }>>({});

  // Initialize state when prices load
  useEffect(() => {
    if (!prices) return;
    const init: Record<number, { enabled: boolean; price: number }> = {};
    for (let i = 1; i <= 7; i++) {
      const existing = prices.find((p: any) => p.dayNo === i);
      init[i] = {
        enabled: !!existing,
        price: existing ? existing.price : property.basePrice,
      };
    }
    setDayOverrides(init);
  }, [prices, property.basePrice]);

  const toggleDay = (day: number) =>
    setDayOverrides(prev => ({ ...prev, [day]: { ...prev[day], enabled: !prev[day].enabled } }));

  const setDayPrice = (day: number, price: number) =>
    setDayOverrides(prev => ({ ...prev, [day]: { ...prev[day], price } }));

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Collect operations
      const pricesToCreate: { dayNo: number; price: number }[] = [];
      const updatePromises: Promise<any>[] = [];
      const deletePromises: Promise<any>[] = [];

      for (let i = 1; i <= 7; i++) {
        const state = dayOverrides[i];
        const existing = (prices || []).find((p: any) => p.dayNo === i);

        if (state.enabled && !existing) {
          // Checked but no existing price -> Collect for bulk create
          pricesToCreate.push({ dayNo: i, price: state.price });
        } else if (!state.enabled && existing) {
          // Unchecked but price exists -> Delete
          deletePromises.push(deletePrice({ propertyId: property.id, priceId: existing.id }));
        } else if (state.enabled && existing && state.price !== existing.price) {
          // Checked, exists, but price changed -> Update
          updatePromises.push(updatePrice({
            propertyId: property.id,
            priceId: existing.id,
            payload: { dayNo: i, price: state.price }
          }));
        }
      }

      // Execute operations
      const allPromises: Promise<any>[] = [...updatePromises, ...deletePromises];
      
      // Bulk create prices if any
      if (pricesToCreate.length > 0) {
        allPromises.push(createPrices({ propertyId: property.id, prices: pricesToCreate }));
      }

      await Promise.all(allPromises);
    } catch (error) {
      console.error("Failed to save prices", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || Object.keys(dayOverrides).length === 0) {
    return <div className="py-10 text-center text-[#8a9a94]">Loading prices…</div>;
  }

  return (
    <div className="space-y-6 animate-in fade-in">
      <div>
        <h2 className="mb-1 text-[15px] font-semibold text-[#183c2f]">Daily Rates</h2>
        <p className="mb-5 text-[13px] text-[#667c74]">
          Set specific pricing for different days of the week. Unchecked days will fall back to the base price (${property.basePrice}).
        </p>
        <div className="space-y-2">
          {DAY_NAMES.slice(1).map((name, i) => {
            const day = i + 1;
            const { enabled, price } = dayOverrides[day] || { enabled: false, price: property.basePrice };
            
            return (
              <div key={day} className={`flex items-center gap-4 rounded-xl border px-4 py-3 transition ${enabled ? "border-[#2e6f57] bg-[#f5f7f6]" : "border-[#dfe8e4] bg-white"}`}>
                <label className="flex min-w-[150px] items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={enabled} onChange={() => toggleDay(day)} className="size-4 rounded border-gray-300 text-[#2e6f57] focus:ring-[#2e6f57]" />
                  <span className={`text-[14px] font-medium ${enabled ? "text-[#183c2f]" : "text-[#8a9a94]"}`}>{name}</span>
                </label>
                <div className={`flex flex-1 items-center gap-2 transition-opacity ${enabled ? "opacity-100" : "opacity-30 pointer-events-none"}`}>
                  <span className="text-[13px] text-[#667c74]">$</span>
                  <input type="number" min={0} value={price} onChange={e => setDayPrice(day, Number(e.target.value))} disabled={!enabled}
                    className="w-full max-w-[140px] rounded-lg border border-[#dfe8e4] px-3 py-1.5 text-[14px] outline-none focus:border-[#2e6f57]" />
                  <span className="text-[13px] text-[#667c74]">/ night</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-6 flex justify-end">
          <button onClick={handleSave} disabled={isSaving}
            className="rounded-full bg-[#2e6f57] px-6 py-2.5 text-[14px] font-medium text-white transition hover:bg-[#255f49] disabled:opacity-50">
            {isSaving ? "Saving…" : "Save Pricing Overrides"}
          </button>
        </div>
      </div>
    </div>
  );
}
