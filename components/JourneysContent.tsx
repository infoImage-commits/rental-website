"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import {
  useJourneys,
  useCreateJourney,
  useUpdateJourney,
  useDeleteJourney,
} from "@/lib/hooks/useJourney";
import { useLocations } from "@/lib/hooks/useLocation";
import type { JourneyItem, JourneysQuery } from "@/lib/types/journey";
import { API_BASE_URL } from "@/lib/api/config";
import ConfirmModal from "./ConfirmModal";

// ── Form Panel Component ──────────────────────────────────────────────────────
function JourneyFormPanel({
  journey,
  isOpen,
  onClose,
  onSaved,
}: {
  journey: JourneyItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEditing = !!journey;
  const { mutate: createJourney, isPending: isCreating } = useCreateJourney();
  const { mutate: updateJourney, isPending: isUpdating } = useUpdateJourney();
  
  // Fetch active locations for the dropdowns
  const { data: locationsData } = useLocations({ pageNumber: 1, pageSize: 100 });
  const activeLocations = locationsData?.items?.filter(loc => loc.isActive) || [];

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [fromLocationId, setFromLocationId] = useState("");
  const [toLocationId, setToLocationId] = useState("");
  const [basePrice, setBasePrice] = useState<number>(0);
  const [estimatedDurationMinutes, setEstimatedDurationMinutes] = useState<number>(0);
  const [isActive, setIsActive] = useState(true);

  // Sync state when panel opens/journey changes
  useEffect(() => {
    if (!isOpen) return;

    const timeoutId = window.setTimeout(() => {
      setName(journey?.name ?? "");
      setDescription(journey?.description ?? "");
      setImageFile(null); // Reset file input
      setFromLocationId(journey?.fromLocationId ?? "");
      setToLocationId(journey?.toLocationId ?? "");
      setBasePrice(journey?.basePrice ?? 0);
      setEstimatedDurationMinutes(journey?.estimatedDurationMinutes ?? 0);
      setIsActive(journey?.isActive ?? true);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [isOpen, journey]);

  if (!isOpen) return null;

  const isSaving = isCreating || isUpdating;
  const isFormValid = name.trim() && fromLocationId && toLocationId && fromLocationId !== toLocationId && basePrice >= 0 && estimatedDurationMinutes > 0;

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!isFormValid) return;

    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Description", description);
    if (imageFile) {
      formData.append("Image", imageFile);
    }
    formData.append("FromLocationId", fromLocationId);
    formData.append("ToLocationId", toLocationId);
    formData.append("BasePrice", basePrice.toString());
    formData.append("EstimatedDurationMinutes", estimatedDurationMinutes.toString());
    formData.append("IsActive", isActive.toString());

    if (isEditing && journey) {
      updateJourney(
        { id: journey.id, payload: formData },
        {
          onSuccess: () => {
            onSaved();
          },
        }
      );
    } else {
      createJourney(formData, {
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
            {isEditing ? "Edit Journey" : "Create Journey"}
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
          <div className="space-y-5">
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">
                Journey Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Cairo to Alex VIP"
                className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none transition focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]"
              />
            </div>
            
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Details about this journey..."
                rows={3}
                className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none transition focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">
                Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="block w-full text-sm text-[#8a9a94] file:mr-4 file:rounded-full file:border-0 file:bg-[#f5f7f6] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#183c2f] hover:file:bg-[#dfe8e4] focus:outline-none"
              />
              {isEditing && journey?.imageUrl && !imageFile && (
                <p className="mt-2 text-[12px] text-[#667c74]">Current image: {journey.imageUrl.split('/').pop()}</p>
              )}
            </div>

            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">
                From Location <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={fromLocationId}
                onChange={(e) => setFromLocationId(e.target.value)}
                className="w-full appearance-none rounded-xl border border-[#dfe8e4] bg-white px-4 py-2.5 text-[14px] outline-none transition focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]"
              >
                <option value="" disabled>Select origin...</option>
                {activeLocations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">
                To Location <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={toLocationId}
                onChange={(e) => setToLocationId(e.target.value)}
                className="w-full appearance-none rounded-xl border border-[#dfe8e4] bg-white px-4 py-2.5 text-[14px] outline-none transition focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]"
              >
                <option value="" disabled>Select destination...</option>
                {activeLocations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}
                  </option>
                ))}
              </select>
              {fromLocationId === toLocationId && fromLocationId !== "" && (
                <p className="mt-1.5 text-[12px] font-medium text-red-500">
                  Origin and destination must be different.
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">
                     Base Price ($) <span className="text-red-500">*</span>
                  </label>
                  <input
                     type="number"
                     min="0"
                     step="0.01"
                     required
                     value={basePrice}
                     onChange={(e) => setBasePrice(parseFloat(e.target.value) || 0)}
                     className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none transition focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]"
                  />
               </div>
               <div>
                  <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">
                     Duration (mins) <span className="text-red-500">*</span>
                  </label>
                  <input
                     type="number"
                     min="1"
                     required
                     value={estimatedDurationMinutes}
                     onChange={(e) => setEstimatedDurationMinutes(parseInt(e.target.value) || 0)}
                     className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none transition focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]"
                  />
               </div>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-[#dfe8e4] p-4">
              <div>
                <p className="text-[14px] font-medium text-[#183c2f]">Active Status</p>
                <p className="text-[12px] text-[#8a9a94]">Make this journey available for bookings.</p>
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
              disabled={isSaving || !isFormValid}
              className="inline-flex min-w-[100px] items-center justify-center gap-2 rounded-full bg-[#2e6f57] px-5 py-2.5 text-[14px] font-medium text-white transition hover:bg-[#255f49] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                "Save Journey"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Main Page Content ─────────────────────────────────────────────────────────
function getJourneyImageUrl(imageUrl: string | null) {
  if (!imageUrl) return "";
  if (imageUrl.startsWith("http")) return imageUrl;
  return `${API_BASE_URL}/${imageUrl}`;
}

function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  if (!hours) return `${remainder}m`;
  if (!remainder) return `${hours}h`;
  return `${hours}h ${remainder}m`;
}

export default function JourneysContent() {
  const [query, setQuery] = useState<JourneysQuery>({
    pageNumber: 1,
    pageSize: 10,
  });

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editingJourney, setEditingJourney] = useState<JourneyItem | null>(null);
  
  const [journeyToDelete, setJourneyToDelete] = useState<JourneyItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data, isLoading, isError, isFetching } = useJourneys(query);
  const { mutate: updateJourney } = useUpdateJourney();
  const { mutate: deleteJourney } = useDeleteJourney();

  function openCreatePanel() {
    setEditingJourney(null);
    setIsPanelOpen(true);
  }

  function openEditPanel(journey: JourneyItem) {
    setEditingJourney(journey);
    setIsPanelOpen(true);
  }

  function handleToggleActive(journey: JourneyItem) {
    const formData = new FormData();
    formData.append("Name", journey.name || "");
    formData.append("Description", journey.description || "");
    formData.append("FromLocationId", journey.fromLocationId);
    formData.append("ToLocationId", journey.toLocationId);
    formData.append("BasePrice", journey.basePrice.toString());
    formData.append("EstimatedDurationMinutes", journey.estimatedDurationMinutes.toString());
    formData.append("IsActive", (!journey.isActive).toString());

    updateJourney({ id: journey.id, payload: formData });
  }

  function confirmDelete(id: string) {
    setDeletingId(id);
    deleteJourney(id, {
      onSettled: () => {
        setDeletingId(null);
        setJourneyToDelete(null);
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
            Journeys
          </h1>
          <p className="mt-1 text-[14px] text-[#667c74]">
            Manage available travel routes, pricing, and estimated durations.
          </p>
        </div>
        <button
          onClick={openCreatePanel}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#2e6f57] px-5 text-[14px] font-medium text-white transition hover:bg-[#255f49] shadow-sm hover:shadow"
        >
          <svg className="size-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
          </svg>
          Add Journey
        </button>
      </header>

      {/* Toolbar */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        {/* Count Badge */}
        {!isLoading && (
          <span className="rounded-full bg-[#f5f7f6] px-3 py-1 text-[12px] font-medium text-[#667c74]">
            {totalCount} Route{totalCount !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Main List Area */}
      <div className="w-full rounded-2xl border border-[#dfe8e4] bg-white shadow-[0_8px_24px_rgba(31,77,61,0.05)] overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-20 text-[#8a9a94] text-[14px]">
            <span className="mr-2 inline-block size-5 animate-spin rounded-full border-2 border-[#dfe8e4] border-t-[#2e6f57]" />
            Loading journeys...
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-[15px] font-medium text-[#183c2f]">Failed to load journeys</p>
            <p className="mt-1 text-[13px] text-[#667c74]">Check your connection and try again.</p>
          </div>
        ) : !data?.items.length ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="grid size-16 place-items-center rounded-full bg-[#f5f7f6] text-[#8a9a94] mb-4">
              <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                 <circle cx="6" cy="19" r="3" />
                 <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
                 <circle cx="18" cy="5" r="3" />
              </svg>
            </div>
            <p className="text-[16px] font-medium text-[#183c2f]">No journeys found</p>
            <p className="mt-1 mb-6 text-[14px] text-[#667c74] max-w-sm">
              Get started by connecting two locations to create an available route.
            </p>
             <button
              onClick={openCreatePanel}
              className="inline-flex h-9 items-center justify-center gap-2 rounded-full bg-[#2e6f57] px-4 text-[13px] font-medium text-white transition hover:bg-[#255f49] shadow-sm"
            >
              Create your first journey
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] border-collapse text-left">
              <thead className="bg-[#f5f7f6] text-[12px] font-semibold uppercase tracking-[0.08em] text-[#667c74]">
                <tr>
                  <th className="px-5 py-3">Journey</th>
                  <th className="px-5 py-3">From</th>
                  <th className="px-5 py-3">To</th>
                  <th className="px-5 py-3">Base Price</th>
                  <th className="px-5 py-3">Duration</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f4f2] text-[14px]">
                {data.items.map((journey) => {
                  const imageSrc = getJourneyImageUrl(journey.imageUrl);

                  return (
                    <tr key={journey.id} className="transition hover:bg-[#f8faf9]">
                      <td className="px-5 py-4">
                        <div className="flex min-w-[220px] items-center gap-3">
                          {imageSrc ? (
                            <Image
                              src={imageSrc}
                              alt={journey.name || "Transfer journey"}
                              width={44}
                              height={44}
                              className="size-11 rounded-lg border border-[#dfe8e4] object-cover"
                            />
                          ) : (
                            <div className="grid size-11 place-items-center rounded-lg bg-[#f5f7f6] text-[#8a9a94]">
                              <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                                <circle cx="6" cy="19" r="3" />
                                <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
                                <circle cx="18" cy="5" r="3" />
                              </svg>
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="truncate font-semibold text-[#183c2f]">{journey.name || "Untitled journey"}</p>
                            {journey.description && (
                              <p className="mt-1 max-w-[260px] truncate text-[12px] text-[#8a9a94]">{journey.description}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 font-medium text-[#3d4d47]">{journey.fromLocationName}</td>
                      <td className="px-5 py-4 font-medium text-[#2e6f57]">{journey.toLocationName}</td>
                      <td className="px-5 py-4 font-semibold text-[#183c2f]">${journey.basePrice.toFixed(2)}</td>
                      <td className="px-5 py-4 text-[#667c74]">{formatDuration(journey.estimatedDurationMinutes)}</td>
                      <td className="px-5 py-4">
                        <button
                          type="button"
                          onClick={() => handleToggleActive(journey)}
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-medium transition hover:shadow-sm ${
                            journey.isActive
                              ? "bg-[#ecf7f1] text-[#2e6f57]"
                              : "bg-[#f5f7f6] text-[#667c74]"
                          }`}
                        >
                          <span className={`size-1.5 rounded-full ${journey.isActive ? "bg-[#2e6f57]" : "bg-[#8a9a94]"}`} />
                          {journey.isActive ? "Active" : "Inactive"}
                        </button>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => openEditPanel(journey)}
                            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#dfe8e4] bg-white px-3 text-[12px] font-medium text-[#2e6f57] transition hover:border-[#2e6f57] hover:bg-[#f5f7f6]"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => setJourneyToDelete(journey)}
                            disabled={deletingId === journey.id}
                            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-[#fecaca] bg-white px-3 text-[12px] font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                          >
                            {deletingId === journey.id ? "Deleting..." : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
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
      <JourneyFormPanel
        isOpen={isPanelOpen}
        journey={editingJourney}
        onClose={() => setIsPanelOpen(false)}
        onSaved={() => setIsPanelOpen(false)}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!journeyToDelete}
        title="Delete Journey"
        message={`Are you sure you want to delete the journey from ${journeyToDelete?.fromLocationName} to ${journeyToDelete?.toLocationName}?`}
        confirmText="Delete Journey"
        onConfirm={() => journeyToDelete && confirmDelete(journeyToDelete.id)}
        onCancel={() => setJourneyToDelete(null)}
        isPending={deletingId === journeyToDelete?.id}
      />
    </div>
  );
}
