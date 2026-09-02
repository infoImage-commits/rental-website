"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  usePropertyBuyingById,
  useUpdatePropertyBuying,
} from "@/lib/hooks/usePropertyBuying";
import { useCategories } from "@/lib/hooks/useCategory";
import { usePropertyBuyingCategoryItems } from "@/lib/hooks/usePropertyBuyingCategoryItem";
import { usePropertyBuyingCategories } from "@/lib/hooks/usePropertyBuyingCategory";
import { PropertyBuyingRequest, PropertyBuyingStatus } from "@/lib/types/propertyBuying";

export default function PropertyBuyingEditContent({ id }: { id: string }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const { data: property, isLoading } = usePropertyBuyingById(id);
  
  const { data: locationCategories = [] } = useCategories();
  const { data: includeCategories = [] } = usePropertyBuyingCategories();
  const { data: items = [] } = usePropertyBuyingCategoryItems();
  const { mutate: updateProperty, isPending } = useUpdatePropertyBuying();

  const [formData, setFormData] = useState<PropertyBuyingRequest | null>(null);

  useEffect(() => {
    if (property && !formData) {
      setFormData({
        id: property.id,
        categoryId: property.category?.id || "00000000-0000-0000-0000-000000000000",
        title: property.title || "",
        description: property.description || "",
        price: property.price || 0,
        currency: property.currency || "USD",
        propertyTypeId: property.propertyTypeId || 1,
        status: property.status || 1,
        bedrooms: property.bedrooms || 0,
        bathrooms: property.bathrooms || 0,
        floors: property.floors || 0,
        garage: property.garage || 0,
        area: property.area || 0,
        yearBuilt: property.yearBuilt || 0,
        latitude: property.latitude || 0,
        longitude: property.longitude || 0,
        videoUrl: property.videoUrl || "",
        virtualTourUrl: property.virtualTourUrl || "",
        address: {
          country: property.address?.country || "",
          state: "state", // Backend expectation
          city: property.address?.city || "",
          area: property.address?.area || "",
          zipCode: property.address?.zipCode || "",
          street: property.address?.street || "",
        },
        categoryValues: (property.sections || []).flatMap((s: any) =>
          (s.items || []).map((i: any) => ({ itemId: i.itemId }))
        ),
      });
    }
  }, [property, formData]);

  const updateForm = (updates: Partial<PropertyBuyingRequest>) => {
    setFormData((prev) => prev ? { ...prev, ...updates } : null);
  };

  const updateAddress = (updates: Partial<PropertyBuyingRequest["address"]>) => {
    setFormData((prev) => prev ? { ...prev, address: { ...prev.address, ...updates } } : null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    
    if (step === 3 && formData) {
      updateProperty(
        { id, payload: formData },
        {
          onSuccess: () => {
            router.push("/admin/property-buyings");
          }
        }
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20 text-[14px] text-[#8a9a94]">
        <span className="mr-2 inline-block size-5 animate-spin rounded-full border-2 border-[#dfe8e4] border-t-[#2e6f57]" />
        Loading property…
      </div>
    );
  }

  if (!property || !formData) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-[18px] font-semibold text-[#183c2f]">Property not found</h2>
        <Link href="/admin/property-buyings" className="mt-4 inline-block text-[#2e6f57] hover:underline">Back to list</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl min-w-0">
      <header className="mb-8">
        <Link href="/admin/property-buyings" className="mb-4 inline-flex items-center gap-2 text-[13px] font-medium text-[#667c74] hover:text-[#183c2f]">
          <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Buy Properties
        </Link>
        <h1 className="text-[26px] font-semibold leading-tight text-[#183c2f] lg:text-[32px]">
          Edit: {property.title}
        </h1>
        <p className="mt-1 text-[14px] text-[#667c74]">
          Step {step} of 3 — {property.propertyNumber}
        </p>
      </header>

      {/* Progress Bar & Tab Headers */}
      <div className="mb-8">
        <div className="flex gap-2">
          {[1, 2, 3].map((s) => (
            <button 
              key={s} 
              type="button"
              onClick={() => setStep(s)}
              className={`h-2 flex-1 rounded-full transition-colors ${s <= step ? "bg-[#2e6f57]" : "bg-[#dfe8e4]"}`} 
            />
          ))}
        </div>
        <div className="mt-3 flex justify-between text-[12px] font-medium text-[#667c74]">
          <span className={step === 1 ? "text-[#2e6f57] font-bold" : "cursor-pointer hover:text-[#183c2f]"} onClick={() => setStep(1)}>Basic Info</span>
          <span className={step === 2 ? "text-[#2e6f57] font-bold" : "cursor-pointer hover:text-[#183c2f]"} onClick={() => setStep(2)}>Location</span>
          <span className={step === 3 ? "text-[#2e6f57] font-bold" : "cursor-pointer hover:text-[#183c2f]"} onClick={() => setStep(3)}>Amenities</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-[#dfe8e4] bg-white p-6 shadow-[0_8px_24px_rgba(31,77,61,0.05)] sm:p-8">
          
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-[18px] font-semibold text-[#183c2f]">1. Basic Information</h2>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Property Title *</label>
                  <input required type="text" value={formData.title} onChange={e => updateForm({ title: e.target.value })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57]" />
                </div>
                <div>
                  <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Location Category *</label>
                  <select required value={formData.categoryId} onChange={e => updateForm({ categoryId: e.target.value })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57]">
                    <option value="" disabled>Select Location Category</option>
                    {(locationCategories as any[]).map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Description *</label>
                <textarea required rows={4} value={formData.description} onChange={e => updateForm({ description: e.target.value })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57]" />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
                <div>
                  <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Property Type</label>
                  <select value={formData.propertyTypeId} onChange={e => updateForm({ propertyTypeId: Number(e.target.value) })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57]">
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
                  <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Status</label>
                  <select value={formData.status} onChange={e => updateForm({ status: Number(e.target.value) })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57]">
                    <option value={PropertyBuyingStatus.Available}>Available</option>
                    <option value={PropertyBuyingStatus.Reserved}>Reserved</option>
                    <option value={PropertyBuyingStatus.Sold}>Sold</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Price</label>
                  <input type="number" min={0} required value={formData.price} onChange={e => updateForm({ price: Number(e.target.value) })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57]" />
                </div>
                <div>
                  <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Currency</label>
                  <input type="text" value={formData.currency} onChange={e => updateForm({ currency: e.target.value })} placeholder="e.g. USD, EGP" className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57]" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 sm:grid-cols-5">
                <div>
                  <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Bedrooms</label>
                  <input type="number" min={0} value={formData.bedrooms} onChange={e => updateForm({ bedrooms: Number(e.target.value) })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57]" />
                </div>
                <div>
                  <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Bathrooms</label>
                  <input type="number" min={0} value={formData.bathrooms} onChange={e => updateForm({ bathrooms: Number(e.target.value) })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57]" />
                </div>
                <div>
                  <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Floors</label>
                  <input type="number" min={0} value={formData.floors} onChange={e => updateForm({ floors: Number(e.target.value) })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57]" />
                </div>
                <div>
                  <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Garage</label>
                  <input type="number" min={0} value={formData.garage} onChange={e => updateForm({ garage: Number(e.target.value) })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57]" />
                </div>
                <div>
                  <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Area (m²)</label>
                  <input type="number" min={1} value={formData.area} onChange={e => updateForm({ area: Number(e.target.value) })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57]" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div>
                  <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Year Built</label>
                  <input type="number" min={1800} value={formData.yearBuilt} onChange={e => updateForm({ yearBuilt: Number(e.target.value) })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57]" />
                </div>
                <div>
                  <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Video URL</label>
                  <input type="text" value={formData.videoUrl} onChange={e => updateForm({ videoUrl: e.target.value })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57]" />
                </div>
                <div>
                  <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Virtual Tour URL</label>
                  <input type="text" value={formData.virtualTourUrl} onChange={e => updateForm({ virtualTourUrl: e.target.value })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57]" />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Location */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-[18px] font-semibold text-[#183c2f]">2. Location</h2>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Country</label>
                  <input type="text" value={formData.address.country} onChange={e => updateAddress({ country: e.target.value })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57]" />
                </div>
                <div>
                  <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">City</label>
                  <input type="text" value={formData.address.city} onChange={e => updateAddress({ city: e.target.value })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57]" />
                </div>
                <div>
                  <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Area / District</label>
                  <input type="text" value={formData.address.area} onChange={e => updateAddress({ area: e.target.value })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57]" />
                </div>
                <div>
                  <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Zip Code</label>
                  <input type="text" value={formData.address.zipCode} onChange={e => updateAddress({ zipCode: e.target.value })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57]" />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Street</label>
                  <input type="text" value={formData.address.street} onChange={e => updateAddress({ street: e.target.value })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57]" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 pt-4 border-t border-[#dfe8e4]">
                <div>
                  <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Latitude</label>
                  <input type="number" step="any" value={formData.latitude} onChange={e => updateForm({ latitude: Number(e.target.value) })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57]" />
                </div>
                <div>
                  <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Longitude</label>
                  <input type="number" step="any" value={formData.longitude} onChange={e => updateForm({ longitude: Number(e.target.value) })} className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none focus:border-[#2e6f57]" />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Amenities & Features */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-[18px] font-semibold text-[#183c2f]">3. Amenities & Features</h2>
              <p className="text-[13px] text-[#667c74]">Select the items that are included in this property.</p>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {includeCategories.map((cat) => {
                  const catItems = items.filter(i => i.propertyBuyingCategoryId === cat.id);
                  if (catItems.length === 0) return null;
                  
                  return (
                    <div key={cat.id} className="rounded-xl border border-[#dfe8e4] bg-[#f5f7f6] p-4">
                      <h3 className="mb-3 text-[14px] font-semibold text-[#183c2f]">{cat.name}</h3>
                      <div className="flex flex-col gap-2">
                        {catItems.map(item => {
                          const isChecked = formData.categoryValues.some(v => v.itemId === item.id);
                          return (
                            <label key={item.id} className="flex items-center gap-2">
                              <input 
                                type="checkbox" 
                                checked={isChecked}
                                onChange={(e) => {
                                  const checked = e.target.checked;
                                  setFormData(prev => prev ? ({
                                    ...prev,
                                    categoryValues: checked 
                                      ? [...prev.categoryValues, { itemId: item.id }]
                                      : prev.categoryValues.filter(v => v.itemId !== item.id)
                                  }) : null);
                                }}
                                className="size-4 rounded border-gray-300 text-[#2e6f57] focus:ring-[#2e6f57]" 
                              />
                              <span className="text-[13px] text-[#667c74]">{item.name}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between border-t border-[#dfe8e4] pt-6">
            {step > 1 ? (
              <button type="button" onClick={() => setStep(step - 1)} className="rounded-full px-5 py-2.5 text-[14px] font-medium text-[#667c74] transition hover:bg-[#f5f7f6]">
                Back
              </button>
            ) : (
              <div /> 
            )}
            
            <button type="submit" disabled={isPending} className="inline-flex min-w-[120px] items-center justify-center gap-2 rounded-full bg-[#2e6f57] px-6 py-2.5 text-[14px] font-medium text-white transition hover:bg-[#255f49] disabled:opacity-70">
              {isPending ? (
                 <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : step < 3 ? (
                "Next"
              ) : (
                "Save Changes & Continue"
              )}
            </button>
          </div>
        </form>
    </div>
  );
}
