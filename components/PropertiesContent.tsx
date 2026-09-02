"use client";

import { useState } from "react";
import Link from "next/link";
import {
  useProperties,
  useDeleteProperty,
  useUpdatePropertyAvailability,
  useUpdatePropertyFeatured,
  useUpdatePropertyStatus,
} from "@/lib/hooks/useProperties";
import ConfirmModal from "./ConfirmModal";
import PropertyImagesModal from "./PropertyImagesModal";
import { API_BASE_URL } from "@/lib/api/config";
import { PropertyStatus } from "@/lib/types/property";
import { getPropertyTypeLabel } from "@/lib/utils/propertyUtils"; // we will create this util

export default function PropertiesContent() {
  const [page, setPage] = useState(1);
  const { data: response, isLoading, isError } = useProperties({ pageNumber: page, pageSize: 10 });
  const { mutate: updateAvailability } = useUpdatePropertyAvailability();
  const { mutate: updateFeatured } = useUpdatePropertyFeatured();
  const { mutate: updateStatus } = useUpdatePropertyStatus();
  const { mutate: deleteProperty } = useDeleteProperty();

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [propertyToDelete, setPropertyToDelete] = useState<{ id: string; name: string } | null>(null);
  const [imagesPropertyId, setImagesPropertyId] = useState<string | null>(null);

  const items = response?.items ?? [];

  function confirmDelete(id: string) {
    setDeletingId(id);
    deleteProperty(id, {
      onSettled: () => {
        setDeletingId(null);
        setPropertyToDelete(null);
      },
    });
  }

  return (
    <div className="w-full min-w-0">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#d9a441]">
            Management
          </p>
          <h1 className="mt-1 text-[26px] font-semibold leading-tight text-[#183c2f] lg:text-[32px]">
            Rent Properties
          </h1>
          <p className="mt-1 text-[14px] text-[#667c74]">
            Manage your property listings, availability, and featured status.
          </p>
        </div>
        <Link
          href="/admin/properties/create"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#2e6f57] px-5 text-[14px] font-medium text-white shadow-sm transition hover:bg-[#255f49] hover:shadow"
        >
          <svg className="size-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
          </svg>
          Add Property
        </Link>
      </header>

      <div className="w-full overflow-hidden rounded-2xl border border-[#dfe8e4] bg-white shadow-[0_8px_24px_rgba(31,77,61,0.05)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[14px]">
            <thead className="bg-[#f5f7f6] text-[12px] font-medium uppercase tracking-wider text-[#8a9a94]">
              <tr>
                <th className="w-24 px-6 py-4">Image</th>
                <th className="px-6 py-4">Property</th>
                <th className="px-6 py-4 text-center">Featured</th>
                <th className="px-6 py-4 text-center">Available</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f4f2]">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-20 text-center text-[14px] text-[#8a9a94]">
                    <span className="mr-2 inline-block size-5 animate-spin rounded-full border-2 border-[#dfe8e4] border-t-[#2e6f57]" />
                    Loading properties…
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan={6} className="py-20 text-center text-[#183c2f]">
                    Failed to load properties.
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-24 text-center">
                    <p className="text-[16px] font-medium text-[#183c2f]">No properties found</p>
                    <p className="mb-6 mt-1 text-[14px] text-[#667c74]">Get started by adding a new property.</p>
                  </td>
                </tr>
              ) : (
                items.map((prop) => (
                  <tr key={prop.id} className="transition hover:bg-[#f5f7f6]">
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setImagesPropertyId(prop.id)}
                        className="group relative block h-14 w-20 overflow-hidden rounded-lg border border-[#dfe8e4] bg-[#f5f7f6] transition hover:border-[#2e6f57]"
                      >
                        {prop.coverImageUrl ? (
                          <img
                            src={`${API_BASE_URL}/${prop.coverImageUrl}`}
                            alt={prop.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-[#8a9a94]">
                            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                          <span className="text-[10px] font-medium text-white">Edit</span>
                        </div>
                      </button>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div>
                        <Link href={`/admin/properties/${prop.id}`} className="font-semibold text-[#183c2f] hover:underline">
                          {prop.name}
                        </Link>
                        <p className="mt-0.5 text-[12px] text-[#8a9a94]">
                          {prop.code} &bull; {getPropertyTypeLabel(prop.propertyType)}
                        </p>
                        <p className="mt-0.5 text-[12px] text-[#8a9a94]">
                          {prop.bedroomNo} Bed &bull; {prop.bathroomNo} Bath &bull; Up to {prop.capacity} guests
                        </p>
                      </div>
                    </td>
                    
                    {/* Featured Toggle */}
                    <td className="px-6 py-4 text-center">
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          className="peer sr-only"
                          checked={prop.isFeatured}
                          onChange={(e) => updateFeatured({ id: prop.id, isFeatured: e.target.checked })}
                        />
                        <div className="peer h-5 w-9 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#2e6f57] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#2e6f57]/20"></div>
                      </label>
                    </td>

                    {/* Available Toggle */}
                    <td className="px-6 py-4 text-center">
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          className="peer sr-only"
                          checked={prop.isAvailable}
                          onChange={(e) => updateAvailability({ id: prop.id, isAvailable: e.target.checked })}
                        />
                        <div className="peer h-5 w-9 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#2e6f57] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#2e6f57]/20"></div>
                      </label>
                    </td>

                    {/* Status Select */}
                    <td className="px-6 py-4 text-center">
                       {/* Note: List item JSON doesn't contain propertyStatus by default. If it exists, render it. */}
                       {("propertyStatus" in prop) ? (
                         <select
                           value={(prop as any).propertyStatus}
                           onChange={(e) => updateStatus({ id: prop.id, status: Number(e.target.value) })}
                           className="rounded-lg border border-[#dfe8e4] bg-[#f5f7f6] px-2 py-1 text-[12px] font-medium text-[#183c2f] outline-none transition focus:border-[#2e6f57]"
                         >
                           <option value={PropertyStatus.Clean}>Clean</option>
                           <option value={PropertyStatus.Dirty}>Dirty</option>
                           <option value={PropertyStatus.Maintenance}>Maintenance</option>
                         </select>
                       ) : (
                         <span className="text-[12px] text-[#8a9a94]">N/A</span>
                       )}
                    </td>
                    
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/properties/${prop.id}`}
                          className="flex h-8 items-center gap-1.5 rounded-lg border border-[#dfe8e4] bg-white px-3 text-[12px] font-medium text-[#2e6f57] transition hover:border-[#2e6f57] hover:bg-[#f5f7f6]"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => setPropertyToDelete({ id: prop.id, name: prop.name })}
                          disabled={deletingId === prop.id}
                          className="flex h-8 items-center gap-1.5 rounded-lg border border-[#fecaca] bg-white px-3 text-[12px] font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                        >
                          {deletingId === prop.id ? "Deleting…" : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {response && response.totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={!response.hasPreviousPage}
            className="flex h-8 items-center justify-center rounded-lg border border-[#dfe8e4] bg-white px-3 text-[13px] font-medium text-[#667c74] transition hover:bg-[#f5f7f6] disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-[13px] font-medium text-[#667c74]">
            Page {response.pageNumber} of {response.totalPages}
          </span>
          <button
            onClick={() => setPage(p => p + 1)}
            disabled={!response.hasNextPage}
            className="flex h-8 items-center justify-center rounded-lg border border-[#dfe8e4] bg-white px-3 text-[13px] font-medium text-[#667c74] transition hover:bg-[#f5f7f6] disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      <ConfirmModal
        isOpen={!!propertyToDelete}
        title="Delete Property"
        message={`Are you sure you want to delete "${propertyToDelete?.name}"? All associated images, prices, and settings will be permanently lost.`}
        confirmText="Delete Property"
        onConfirm={() => propertyToDelete && confirmDelete(propertyToDelete.id)}
        onCancel={() => setPropertyToDelete(null)}
        isPending={deletingId === propertyToDelete?.id}
      />

      <PropertyImagesModal
        propertyId={imagesPropertyId}
        isOpen={!!imagesPropertyId}
        onClose={() => setImagesPropertyId(null)}
      />
    </div>
  );
}
