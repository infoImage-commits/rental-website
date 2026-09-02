"use client";

import { useState, useEffect } from "react";
import {
  useLocations,
  useCreateLocation,
  useUpdateLocation,
  useDeleteLocation,
} from "@/lib/hooks/useLocation";
import type { LocationItem, LocationsQuery } from "@/lib/types/location";
import ConfirmModal from "./ConfirmModal";

// ── Form Panel Component ──────────────────────────────────────────────────────
function LocationFormPanel({
  location,
  isOpen,
  onClose,
  onSaved,
}: {
  location: LocationItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEditing = !!location;
  const { mutate: createLocation, isPending: isCreating } = useCreateLocation();
  const { mutate: updateLocation, isPending: isUpdating } = useUpdateLocation();

  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState(true);

  // Sync state when panel opens/location changes
  useEffect(() => {
    if (!isOpen) return;

    const timeoutId = window.setTimeout(() => {
      setName(location?.name ?? "");
      setIsActive(location?.isActive ?? true);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [isOpen, location]);

  if (!isOpen) return null;

  const isSaving = isCreating || isUpdating;

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    const payload = {
      name: name.trim(),
      isActive,
    };

    if (isEditing && location) {
      updateLocation(
        { id: location.id, payload },
        {
          onSuccess: () => {
            onSaved();
          },
        }
      );
    } else {
      createLocation(payload, {
        onSuccess: () => {
          onSaved();
        },
      });
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 transition-opacity"
        onClick={onClose}
      />

      {/* Slide-in Panel */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl transition-transform duration-300 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#dfe8e4] px-6 py-4">
          <h2 className="text-[18px] font-semibold text-[#183c2f]">
            {isEditing ? "Edit Location" : "Create Location"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="grid size-8 place-items-center rounded-full text-[#8a9a94] transition hover:bg-[#f5f7f6] hover:text-[#183c2f]"
          >
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto px-6 py-6">
          <div className="space-y-6">
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">
                Location Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="E.g., Cairo, Alexandria..."
                className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none transition focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]"
              />
            </div>

            <div className="flex items-center justify-between rounded-xl border border-[#dfe8e4] p-4">
              <div>
                <p className="text-[14px] font-medium text-[#183c2f]">Active Status</p>
                <p className="text-[12px] text-[#8a9a94]">Make this location available for properties.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsActive(!isActive)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#2e6f57] focus:ring-offset-2 ${
                  isActive ? "bg-[#2e6f57]" : "bg-[#dfe8e4]"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    isActive ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="border-t border-[#dfe8e4] p-6 bg-[#f5f7f6]">
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="rounded-full px-5 py-2.5 text-[14px] font-medium text-[#667c74] transition hover:bg-[#dfe8e4] disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving || !name.trim()}
              className="inline-flex min-w-[100px] items-center justify-center gap-2 rounded-full bg-[#2e6f57] px-5 py-2.5 text-[14px] font-medium text-white transition hover:bg-[#255f49] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                "Save Location"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Main Page Content ─────────────────────────────────────────────────────────
export default function LocationsContent() {
  const [query, setQuery] = useState<LocationsQuery>({
    pageNumber: 1,
    pageSize: 10,
  });

  const [searchInput, setSearchInput] = useState("");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<LocationItem | null>(null);
  
  const [locationToDelete, setLocationToDelete] = useState<LocationItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data, isLoading, isError, isFetching } = useLocations(query);
  const { mutate: updateLocation } = useUpdateLocation();
  const { mutate: deleteLocation } = useDeleteLocation();

  function applySearch() {
    setQuery((q) => ({ ...q, searchTerm: searchInput || undefined, pageNumber: 1 }));
  }

  function openCreatePanel() {
    setEditingLocation(null);
    setIsPanelOpen(true);
  }

  function openEditPanel(location: LocationItem) {
    setEditingLocation(location);
    setIsPanelOpen(true);
  }

  function handleToggleActive(location: LocationItem) {
    const payload = {
      name: location.name,
      isActive: !location.isActive,
    };
    updateLocation({ id: location.id, payload });
  }

  function confirmDelete(id: string) {
    setDeletingId(id);
    deleteLocation(id, {
      onSettled: () => {
        setDeletingId(null);
        setLocationToDelete(null);
      },
    });
  }

  const totalCount = data?.totalCount ?? 0;
  const totalPages = data?.totalPages ?? 1;
  const currentPage = query.pageNumber ?? 1;

  return (
    <div className="w-full min-w-0">
      {/* Header */}
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#d9a441]">
            Management
          </p>
          <h1 className="mt-1 text-[26px] font-semibold leading-tight text-[#183c2f] lg:text-[32px]">
            Locations
          </h1>
          <p className="mt-1 text-[14px] text-[#667c74]">
            Manage geographical locations where properties are available.
          </p>
        </div>
        <button
          onClick={openCreatePanel}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#2e6f57] px-5 text-[14px] font-medium text-white transition hover:bg-[#255f49] shadow-sm hover:shadow"
        >
          <svg className="size-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
          </svg>
          Add Location
        </button>
      </header>

      {/* Toolbar */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="flex min-w-[200px] flex-1 items-center gap-2 rounded-xl border border-[#dfe8e4] bg-white px-3 focus-within:border-[#2e6f57] focus-within:ring-2 focus-within:ring-[#2e6f57]/10 transition">
          <svg className="size-4 shrink-0 text-[#8a9a94]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.35-4.35" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search locations..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && applySearch()}
            className="h-10 flex-1 bg-transparent text-[13px] text-[#183c2f] outline-none placeholder:text-[#aab4b0]"
          />
          <button
            type="button"
            onClick={applySearch}
            className="shrink-0 rounded-lg bg-[#2e6f57] px-3 py-1.5 text-[12px] font-medium text-white transition hover:bg-[#255f49]"
          >
            Search
          </button>
        </div>

        {/* Count Badge */}
        {!isLoading && (
          <span className="rounded-full bg-[#f5f7f6] px-3 py-1 text-[12px] font-medium text-[#667c74]">
            {totalCount} Location{totalCount !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Main List Area */}
      <div className="w-full rounded-2xl border border-[#dfe8e4] bg-white shadow-[0_8px_24px_rgba(31,77,61,0.05)] overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-20 text-[#8a9a94] text-[14px]">
            <span className="mr-2 inline-block size-5 animate-spin rounded-full border-2 border-[#dfe8e4] border-t-[#2e6f57]" />
            Loading locations...
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-[15px] font-medium text-[#183c2f]">Failed to load locations</p>
            <p className="mt-1 text-[13px] text-[#667c74]">Check your connection and try again.</p>
          </div>
        ) : !data?.items.length ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="grid size-16 place-items-center rounded-full bg-[#f5f7f6] text-[#8a9a94] mb-4">
              <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <p className="text-[16px] font-medium text-[#183c2f]">No locations found</p>
            <p className="mt-1 mb-6 text-[14px] text-[#667c74] max-w-sm">
              Get started by adding your first location where properties can be listed.
            </p>
             <button
              onClick={openCreatePanel}
              className="inline-flex h-9 items-center justify-center gap-2 rounded-full bg-[#2e6f57] px-4 text-[13px] font-medium text-white transition hover:bg-[#255f49] shadow-sm"
            >
              Add your first location
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead className="bg-[#f5f7f6] text-[12px] font-semibold uppercase tracking-[0.08em] text-[#667c74]">
                <tr>
                  <th className="px-5 py-3">Location</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f4f2] text-[14px]">
                {data.items.map((location) => (
                  <tr key={location.id} className="transition hover:bg-[#f8faf9]">
                    <td className="px-5 py-4">
                      <div className="flex min-w-[240px] items-center gap-3">
                        <div className="grid size-10 place-items-center rounded-lg bg-[#f5f7f6] text-[#2e6f57]">
                          <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                        </div>
                        <span className="font-semibold text-[#183c2f]">{location.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => handleToggleActive(location)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-medium transition hover:shadow-sm ${
                          location.isActive
                            ? "bg-[#ecf7f1] text-[#2e6f57]"
                            : "bg-[#f5f7f6] text-[#667c74]"
                        }`}
                      >
                        <span className={`size-1.5 rounded-full ${location.isActive ? "bg-[#2e6f57]" : "bg-[#8a9a94]"}`} />
                        {location.isActive ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEditPanel(location)}
                          className="inline-flex h-8 items-center rounded-lg border border-[#dfe8e4] bg-white px-3 text-[12px] font-medium text-[#2e6f57] transition hover:border-[#2e6f57] hover:bg-[#f5f7f6]"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => setLocationToDelete(location)}
                          disabled={deletingId === location.id}
                          className="inline-flex h-8 items-center rounded-lg border border-[#fecaca] bg-white px-3 text-[12px] font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                        >
                          {deletingId === location.id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between text-[13px]">
          <p className="text-[#667c74]">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={!data?.hasPreviousPage || isFetching}
              onClick={() => setQuery((q) => ({ ...q, pageNumber: (q.pageNumber ?? 1) - 1 }))}
              className="h-8 rounded-lg border border-[#dfe8e4] px-3 font-medium text-[#667c74] transition hover:border-[#2e6f57] hover:text-[#2e6f57] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Prev
            </button>
            <button
              type="button"
              disabled={!data?.hasNextPage || isFetching}
              onClick={() => setQuery((q) => ({ ...q, pageNumber: (q.pageNumber ?? 1) + 1 }))}
              className="h-8 rounded-lg border border-[#dfe8e4] px-3 font-medium text-[#667c74] transition hover:border-[#2e6f57] hover:text-[#2e6f57] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Create/Edit Panel */}
      <LocationFormPanel
        isOpen={isPanelOpen}
        location={editingLocation}
        onClose={() => setIsPanelOpen(false)}
        onSaved={() => setIsPanelOpen(false)}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!locationToDelete}
        title="Delete Location"
        message={`Are you sure you want to delete "${locationToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete Location"
        onConfirm={() => locationToDelete && confirmDelete(locationToDelete.id)}
        onCancel={() => setLocationToDelete(null)}
        isPending={deletingId === locationToDelete?.id}
      />
    </div>
  );
}
