"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCreateProperty } from "@/lib/hooks/useProperties";
import { useCategories } from "@/lib/hooks/useCategory";
import { usePropertyCategories } from "@/lib/hooks/usePropertyCategory";
import { usePropertyCategoryItems } from "@/lib/hooks/usePropertyCategoryItem";
import { PropertyRequest, PropertyType, PropertyStatus, BedType } from "@/lib/types/property";

const defaultPayload: PropertyRequest = {
  categoryId: "",
  code: "",
  name: "",
  description: "",
  bedroomNo: 1,
  bathroomNo: 1,
  roomNo: 1,
  capacity: 2,
  size: 50,
  basePrice: 100,
  propertyType: PropertyType.Apartment,
  propertyStatus: PropertyStatus.Clean,
  isAvailable: true,
  isFeatured: false,
  hasSeaView: false,
  hasPoolView: false,
  hasGardenView: false,
  hasMountainView: false,
  hasCityView: false,
  latitude: 0,
  longitude: 0,
  rulesCancellation: "",
  notes: "",
  address: {
    country: "",
    city: "",
    area: "",
    zipCode: "",
    street: "",
  },
  listingDetails: {
    lateCheckIn: "",
    outdoorFacility: "",
    originalService: "",
    cancellation: "",
    extraPeopleFee: 0,
    extraPeople: "",
    privatebathroom: false,
    checkInHour: "14:00:00",
    checkOutHour: "12:00:00",
    familyFriendly: false,
    privateEntrance: false,
  },
  sleepingArrangements: [
    {
      name: "Master Bedroom",
      displayOrder: 1,
      beds: [{ bedType: BedType.Double, quantity: 1 }],
    },
  ],
  propertyCategoryItemIds: [],
};

const hiddenListingDefaults = {
  extraPeople: "",
  extraPeopleFee: 0,
};

export default function PropertyCreateContent() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<PropertyRequest>(defaultPayload);

  const { data: locationCategories = [] } = useCategories();
  const { data: includeCategories = [] } = usePropertyCategories();
  const { data: items = [] } = usePropertyCategoryItems();
  const { mutate: createProperty, isPending } = useCreateProperty();

  const updateForm = (updates: Partial<PropertyRequest>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const updateAddress = (updates: Partial<typeof defaultPayload.address>) => {
    setFormData((prev) => ({ ...prev, address: { ...prev.address!, ...updates } }));
  };

  const updateListing = (updates: Partial<typeof defaultPayload.listingDetails>) => {
    setFormData((prev) => ({ ...prev, listingDetails: { ...prev.listingDetails!, ...updates } }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 5) {
      setStep(step + 1);
      return;
    }

    createProperty({
      ...formData,
      listingDetails: {
        ...formData.listingDetails!,
        ...hiddenListingDefaults,
      },
    }, {
      onSuccess: (data) => {
        if (data.data) {
          router.push(`/admin/properties/${data.data.id}?created=true`);
        } else {
          router.push("/admin/properties");
        }
      },
    });
  };

  return (
    <div className="mx-auto max-w-4xl min-w-0">
      <header className="mb-8">
        <Link href="/admin/properties" className="mb-4 inline-flex items-center gap-2 text-[13px] font-medium text-[#667c74] hover:text-[#183c2f]">
          <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Properties
        </Link>
        <h1 className="text-[26px] font-semibold leading-tight text-[#183c2f] lg:text-[32px]">
          Add New Property
        </h1>
        <p className="mt-1 text-[14px] text-[#667c74]">
          Step {step} of 5 — Fill out the details below to create a new property listing.
        </p>
      </header>

      {/* Progress Bar */}
      <div className="mb-8 flex gap-2">
        {[1, 2, 3, 4, 5].map((s) => (
          <div key={s} className={`h-2 flex-1 rounded-full ${s <= step ? "bg-[#2e6f57]" : "bg-[#dfe8e4]"}`} />
        ))}
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-[#dfe8e4] bg-white p-6 shadow-[0_8px_24px_rgba(31,77,61,0.05)] sm:p-8">
        
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-[18px] font-semibold text-[#183c2f]">1. Basic Information</h2>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Property Name *</label>
                <input required type="text" value={formData.name} onChange={e => updateForm({ name: e.target.value })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]" />
              </div>
              <div>
                <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Property Code *</label>
                <input required type="text" value={formData.code} onChange={e => updateForm({ code: e.target.value })} placeholder="e.g. PRO-123" className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]" />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Description *</label>
              <textarea required rows={4} value={formData.description} onChange={e => updateForm({ description: e.target.value })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]" />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Property Type</label>
                <select value={formData.propertyType} onChange={e => updateForm({ propertyType: Number(e.target.value) })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]">
                  <option value={1}>Apartment</option>
                  <option value={2}>Villa</option>
                  <option value={3}>Studio</option>
                  <option value={4}>Chalet</option>
                  <option value={5}>TwinHouse</option>
                  <option value={6}>TownHouse</option>
                  <option value={7}>Duplex</option>
                  <option value={8}>Penthouse</option>
                  <option value={9}>Cabin</option>
                  <option value={10}>Hotel</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Location Category *</label>
                <select required value={formData.categoryId} onChange={e => updateForm({ categoryId: e.target.value })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]">
                  <option value="" disabled>Select Location Category</option>
                  {(locationCategories as any[]).map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Base Price / Night</label>
                <input type="number" min={0} value={formData.basePrice} onChange={e => updateForm({ basePrice: Number(e.target.value) })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Property Status</label>
                <select value={formData.propertyStatus} onChange={e => updateForm({ propertyStatus: Number(e.target.value) })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]">
                  <option value={1}>Clean</option>
                  <option value={2}>Dirty</option>
                  <option value={3}>Maintenance</option>
                </select>
              </div>
              <div className="flex items-center gap-3 pt-6">
                <input type="checkbox" checked={formData.isAvailable} onChange={e => updateForm({ isAvailable: e.target.checked })} className="size-5 rounded border-gray-300 text-[#2e6f57] focus:ring-[#2e6f57]" />
                <span className="text-[14px] font-medium text-[#183c2f]">Available</span>
              </div>
              <div className="flex items-center gap-3 pt-6">
                <input type="checkbox" checked={formData.isFeatured} onChange={e => updateForm({ isFeatured: e.target.checked })} className="size-5 rounded border-gray-300 text-[#2e6f57] focus:ring-[#2e6f57]" />
                <span className="text-[14px] font-medium text-[#183c2f]">Featured Property</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-5">
              <div>
                <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Bedrooms</label>
                <input type="number" min={0} value={formData.bedroomNo} onChange={e => updateForm({ bedroomNo: Number(e.target.value) })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]" />
              </div>
              <div>
                <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Bathrooms</label>
                <input type="number" min={0} value={formData.bathroomNo} onChange={e => updateForm({ bathroomNo: Number(e.target.value) })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]" />
              </div>
              <div>
                <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Rooms</label>
                <input type="number" min={0} value={formData.roomNo} onChange={e => updateForm({ roomNo: Number(e.target.value) })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]" />
              </div>
              <div>
                <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Capacity</label>
                <input type="number" min={1} value={formData.capacity} onChange={e => updateForm({ capacity: Number(e.target.value) })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]" />
              </div>
              <div>
                <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Size (m²)</label>
                <input type="number" min={1} value={formData.size} onChange={e => updateForm({ size: Number(e.target.value) })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]" />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Location & Views */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-[18px] font-semibold text-[#183c2f]">2. Location & Views</h2>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Country</label>
                <input type="text" value={formData.address?.country} onChange={e => updateAddress({ country: e.target.value })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]" />
              </div>
              <div>
                <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">City</label>
                <input type="text" value={formData.address?.city} onChange={e => updateAddress({ city: e.target.value })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]" />
              </div>
              <div>
                <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Area / District</label>
                <input type="text" value={formData.address?.area} onChange={e => updateAddress({ area: e.target.value })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]" />
              </div>
              <div>
                <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Zip Code</label>
                <input type="text" value={formData.address?.zipCode} onChange={e => updateAddress({ zipCode: e.target.value })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]" />
              </div>
              <div>
                <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Street</label>
                <input type="text" value={formData.address?.street} onChange={e => updateAddress({ street: e.target.value })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Latitude</label>
                <input type="number" step="any" value={formData.latitude} onChange={e => updateForm({ latitude: Number(e.target.value) })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]" />
              </div>
              <div>
                <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Longitude</label>
                <input type="number" step="any" value={formData.longitude} onChange={e => updateForm({ longitude: Number(e.target.value) })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 pt-4 border-t border-[#dfe8e4]">
              <label className="flex items-center gap-3">
                <input type="checkbox" checked={formData.hasSeaView} onChange={e => updateForm({ hasSeaView: e.target.checked })} className="size-4 rounded border-gray-300 text-[#2e6f57] focus:ring-[#2e6f57]" />
                <span className="text-[14px] font-medium text-[#183c2f]">Sea View</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" checked={formData.hasPoolView} onChange={e => updateForm({ hasPoolView: e.target.checked })} className="size-4 rounded border-gray-300 text-[#2e6f57] focus:ring-[#2e6f57]" />
                <span className="text-[14px] font-medium text-[#183c2f]">Pool View</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" checked={formData.hasGardenView} onChange={e => updateForm({ hasGardenView: e.target.checked })} className="size-4 rounded border-gray-300 text-[#2e6f57] focus:ring-[#2e6f57]" />
                <span className="text-[14px] font-medium text-[#183c2f]">Garden View</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" checked={formData.hasMountainView} onChange={e => updateForm({ hasMountainView: e.target.checked })} className="size-4 rounded border-gray-300 text-[#2e6f57] focus:ring-[#2e6f57]" />
                <span className="text-[14px] font-medium text-[#183c2f]">Mountain View</span>
              </label>
            </div>
          </div>
        )}

        {/* Step 3: Includes Categories */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-[18px] font-semibold text-[#183c2f]">3. Features & Amenities</h2>
            <p className="text-[13px] text-[#667c74]">Select the items that are included in this property.</p>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {includeCategories.map((cat) => {
                const catItems = items.filter(i => i.propertyCategoryId === cat.id);
                if (catItems.length === 0) return null;
                
                return (
                  <div key={cat.id} className="rounded-xl border border-[#dfe8e4] bg-[#f5f7f6] p-4">
                    <h3 className="mb-3 text-[14px] font-semibold text-[#183c2f]">{cat.name}</h3>
                    <div className="flex flex-col gap-2">
                      {catItems.map(item => (
                        <label key={item.id} className="flex items-center gap-2">
                          <input 
                            type="checkbox" 
                            checked={formData.propertyCategoryItemIds?.includes(item.id)}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              setFormData(prev => ({
                                ...prev,
                                propertyCategoryItemIds: checked 
                                  ? [...(prev.propertyCategoryItemIds || []), item.id]
                                  : (prev.propertyCategoryItemIds || []).filter(id => id !== item.id)
                              }));
                            }}
                            className="size-4 rounded border-gray-300 text-[#2e6f57] focus:ring-[#2e6f57]" 
                          />
                          <span className="text-[13px] text-[#667c74]">{item.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 4: Listing Details */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-[18px] font-semibold text-[#183c2f]">4. Listing Details</h2>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Check-In Hour</label>
                <input type="time" step="1" value={formData.listingDetails?.checkInHour} onChange={e => updateListing({ checkInHour: e.target.value })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]" />
              </div>
              <div>
                <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Check-Out Hour</label>
                <input type="time" step="1" value={formData.listingDetails?.checkOutHour} onChange={e => updateListing({ checkOutHour: e.target.value })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]" />
              </div>
              <div>
                <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Late Check-In Policy</label>
                <input type="text" value={formData.listingDetails?.lateCheckIn} onChange={e => updateListing({ lateCheckIn: e.target.value })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]" />
              </div>
              <div>
                <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Cancellation Policy</label>
                <input type="text" value={formData.listingDetails?.cancellation} onChange={e => updateListing({ cancellation: e.target.value })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]" />
              </div>
              <div>
                <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Outdoor Facility</label>
                <input type="text" value={formData.listingDetails?.outdoorFacility} onChange={e => updateListing({ outdoorFacility: e.target.value })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]" />
              </div>
              <div>
                <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Original Service</label>
                <input type="text" value={formData.listingDetails?.originalService} onChange={e => updateListing({ originalService: e.target.value })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]" />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Cancellation Rules</label>
                <textarea rows={3} value={formData.rulesCancellation} onChange={e => updateForm({ rulesCancellation: e.target.value })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]" />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Notes</label>
                <textarea rows={3} value={formData.notes} onChange={e => updateForm({ notes: e.target.value })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]" />
              </div>
            </div>

            <div className="flex flex-wrap gap-6 rounded-xl border border-[#dfe8e4] bg-[#f5f7f6] p-4">
              <label className="flex items-center gap-3">
                <input type="checkbox" checked={formData.listingDetails?.familyFriendly} onChange={e => updateListing({ familyFriendly: e.target.checked })} className="size-4 rounded border-gray-300 text-[#2e6f57] focus:ring-[#2e6f57]" />
                <span className="text-[14px] font-medium text-[#183c2f]">Family Friendly</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" checked={formData.listingDetails?.privatebathroom} onChange={e => updateListing({ privatebathroom: e.target.checked })} className="size-4 rounded border-gray-300 text-[#2e6f57] focus:ring-[#2e6f57]" />
                <span className="text-[14px] font-medium text-[#183c2f]">Private Bathroom</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" checked={formData.listingDetails?.privateEntrance} onChange={e => updateListing({ privateEntrance: e.target.checked })} className="size-4 rounded border-gray-300 text-[#2e6f57] focus:ring-[#2e6f57]" />
                <span className="text-[14px] font-medium text-[#183c2f]">Private Entrance</span>
              </label>
            </div>
          </div>
        )}

        {/* Step 5: Sleeping Arrangements */}
        {step === 5 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-[18px] font-semibold text-[#183c2f]">5. Sleeping Arrangements</h2>
            
            <div className="space-y-4">
              {formData.sleepingArrangements?.map((room, roomIndex) => (
                <div key={roomIndex} className="rounded-xl border border-[#dfe8e4] p-5">
                  <div className="flex items-center justify-between mb-4">
                    <input 
                      type="text" 
                      value={room.name} 
                      onChange={e => {
                        const newRooms = [...formData.sleepingArrangements!];
                        newRooms[roomIndex].name = e.target.value;
                        setFormData({ ...formData, sleepingArrangements: newRooms });
                      }}
                      className="font-semibold text-[#183c2f] outline-none border-b border-transparent focus:border-[#2e6f57] bg-transparent"
                    />
                    {formData.sleepingArrangements!.length > 1 && (
                      <button 
                        type="button"
                        onClick={() => {
                          const newRooms = formData.sleepingArrangements!.filter((_, i) => i !== roomIndex);
                          setFormData({ ...formData, sleepingArrangements: newRooms });
                        }}
                        className="text-red-500 text-[13px] hover:underline"
                      >
                        Remove Room
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    {room.beds.map((bed, bedIndex) => (
                      <div key={bedIndex} className="flex items-center gap-4">
                        <select
                          value={bed.bedType}
                          onChange={e => {
                            const newRooms = [...formData.sleepingArrangements!];
                            newRooms[roomIndex].beds[bedIndex].bedType = Number(e.target.value);
                            setFormData({ ...formData, sleepingArrangements: newRooms });
                          }}
                          className="flex-1 rounded-lg border border-[#dfe8e4] px-3 py-2 text-[13px] outline-none focus:border-[#2e6f57]"
                        >
                          <option value={0}>Single</option>
                          <option value={1}>Twin</option>
                          <option value={2}>Double</option>
                          <option value={3}>Queen</option>
                          <option value={4}>King</option>
                          <option value={5}>Sofa Bed</option>
                          <option value={6}>Bunk Bed</option>
                          <option value={7}>Baby Crib</option>
                          <option value={8}>Futon</option>
                        </select>
                        <input
                          type="number"
                          min={1}
                          value={bed.quantity}
                          onChange={e => {
                            const newRooms = [...formData.sleepingArrangements!];
                            newRooms[roomIndex].beds[bedIndex].quantity = Number(e.target.value);
                            setFormData({ ...formData, sleepingArrangements: newRooms });
                          }}
                          className="w-24 rounded-lg border border-[#dfe8e4] px-3 py-2 text-[13px] outline-none focus:border-[#2e6f57]"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newRooms = [...formData.sleepingArrangements!];
                            newRooms[roomIndex].beds = newRooms[roomIndex].beds.filter((_, i) => i !== bedIndex);
                            setFormData({ ...formData, sleepingArrangements: newRooms });
                          }}
                          className="text-[#8a9a94] hover:text-red-500"
                        >
                          <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      </div>
                    ))}
                    
                    <button
                      type="button"
                      onClick={() => {
                        const newRooms = [...formData.sleepingArrangements!];
                        newRooms[roomIndex].beds.push({ bedType: BedType.Single, quantity: 1 });
                        setFormData({ ...formData, sleepingArrangements: newRooms });
                      }}
                      className="text-[13px] font-medium text-[#2e6f57] hover:underline"
                    >
                      + Add Bed
                    </button>
                  </div>
                </div>
              ))}
              
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    ...formData,
                    sleepingArrangements: [
                      ...formData.sleepingArrangements!,
                      { name: `Room ${formData.sleepingArrangements!.length + 1}`, displayOrder: formData.sleepingArrangements!.length + 1, beds: [{ bedType: BedType.Double, quantity: 1 }] }
                    ]
                  });
                }}
                className="w-full rounded-xl border border-dashed border-[#dfe8e4] py-4 text-[14px] font-medium text-[#667c74] transition hover:bg-[#f5f7f6]"
              >
                + Add Room
              </button>
            </div>
          </div>
        )}

        <div className="mt-8 flex items-center justify-between border-t border-[#dfe8e4] pt-6">
          {step > 1 ? (
            <button type="button" onClick={() => setStep(step - 1)} className="rounded-full px-5 py-2.5 text-[14px] font-medium text-[#667c74] transition hover:bg-[#f5f7f6]">
              Back
            </button>
          ) : (
            <div /> // placeholder for spacing
          )}
          
          <button type="submit" disabled={isPending} className="inline-flex min-w-[120px] items-center justify-center gap-2 rounded-full bg-[#2e6f57] px-6 py-2.5 text-[14px] font-medium text-white transition hover:bg-[#255f49] disabled:opacity-70">
            {isPending ? (
               <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : step < 5 ? (
              "Next Step"
            ) : (
              "Create Property"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
