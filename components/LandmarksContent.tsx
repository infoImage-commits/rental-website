"use client";

import { useState } from "react";
import {
  useCreateAttributeGroupItem,
  useDeleteAttributeGroupItem,
  useLandmarks,
  useUpdateAttributeGroupItem,
} from "@/lib/hooks/useAttributeGroupItem";
import type { AttributeGroupItem, AttributeGroupItemRequest } from "@/lib/types/attributeGroupItem";
import ConfirmModal from "./ConfirmModal";

function LandmarkFormPanel({
  landmark,
  isOpen,
  onClose,
  onSaved,
}: {
  landmark: AttributeGroupItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEditing = Boolean(landmark);
  const { mutate: createLandmark, isPending: isCreating } = useCreateAttributeGroupItem();
  const { mutate: updateLandmark, isPending: isUpdating } = useUpdateAttributeGroupItem();

  const [key, setKey] = useState(landmark?.key ?? "");
  const [value, setValue] = useState(landmark?.value ?? "");
  const [displayOrder, setDisplayOrder] = useState<number | "">(landmark?.displayOrder ?? "");

  if (!isOpen) return null;

  const isSaving = isCreating || isUpdating;
  const isFormValid = key.trim().length > 0 && value.trim().length > 0;

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!isFormValid) return;

    const payload: AttributeGroupItemRequest = {
      key: key.trim(),
      value: value.trim(),
      displayOrder: displayOrder !== "" ? Number(displayOrder) : undefined,
      attributeGroupId: landmark?.attributeGroupId,
    };

    if (landmark) {
      updateLandmark({ id: landmark.id, payload }, { onSuccess: onSaved });
    } else {
      createLandmark(payload, { onSuccess: onSaved });
    }
  }

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#dfe8e4] px-6 py-4">
          <h2 className="text-[18px] font-semibold text-[#183c2f]">
            {isEditing ? "Edit Info Area" : "New Info Area"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close panel"
            className="grid size-8 place-items-center rounded-full text-[#8a9a94] transition hover:bg-[#f5f7f6] hover:text-[#183c2f]"
          >
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSave} className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">
              Info Area Name <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="e.g. Abo 3shar super market"
              className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none transition focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">
              Distance <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="e.g. 50 m"
              className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none transition focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Display Order</label>
            <input
              type="number"
              min={1}
              value={displayOrder}
              onChange={(e) => setDisplayOrder(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder="e.g. 1"
              className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none transition focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]"
            />
          </div>
        </form>

        <div className="border-t border-[#dfe8e4] bg-[#f5f7f6] p-6">
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
              className="inline-flex min-w-[110px] items-center justify-center gap-2 rounded-full bg-[#2e6f57] px-5 py-2.5 text-[14px] font-medium text-white transition hover:bg-[#255f49] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSaving ? (
                <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : isEditing ? (
                "Save Changes"
              ) : (
                "Create Info Area"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function LandmarksContent() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editingLandmark, setEditingLandmark] = useState<AttributeGroupItem | null>(null);
  const [landmarkToDelete, setLandmarkToDelete] = useState<AttributeGroupItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data: landmarks = [], isLoading, isError } = useLandmarks();
  const { mutate: deleteLandmark } = useDeleteAttributeGroupItem();

  const sortedLandmarks = [...landmarks].sort(
    (a, b) => (a.displayOrder || 0) - (b.displayOrder || 0) || a.key.localeCompare(b.key)
  );

  function openCreatePanel() {
    setEditingLandmark(null);
    setIsPanelOpen(true);
  }

  function openEditPanel(landmark: AttributeGroupItem) {
    setEditingLandmark(landmark);
    setIsPanelOpen(true);
  }

  function confirmDelete(id: string) {
    setDeletingId(id);
    deleteLandmark(id, {
      onSettled: () => {
        setDeletingId(null);
        setLandmarkToDelete(null);
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
            Info Area
          </h1>
          <p className="mt-1 text-[14px] text-[#667c74]">
            Manage nearby places and distances that can be attached to rental properties.
          </p>
        </div>
        <button
          onClick={openCreatePanel}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#2e6f57] px-5 text-[14px] font-medium text-white shadow-sm transition hover:bg-[#255f49] hover:shadow"
        >
          <svg className="size-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
          </svg>
          Add Info Area
        </button>
      </header>

      {!isLoading && (
        <div className="mb-4">
          <span className="rounded-full bg-[#f5f7f6] px-3 py-1 text-[12px] font-medium text-[#667c74]">
            {sortedLandmarks.length} Info Area{sortedLandmarks.length !== 1 ? "s" : ""}
          </span>
        </div>
      )}

      <div className="w-full overflow-hidden rounded-2xl border border-[#dfe8e4] bg-white shadow-[0_8px_24px_rgba(31,77,61,0.05)]">
        {isLoading ? (
          <div className="flex items-center justify-center py-20 text-[14px] text-[#8a9a94]">
            <span className="mr-2 inline-block size-5 animate-spin rounded-full border-2 border-[#dfe8e4] border-t-[#2e6f57]" />
            Loading info areas...
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-[15px] font-medium text-[#183c2f]">Failed to load info areas</p>
            <p className="mt-1 text-[13px] text-[#667c74]">Check your connection and try again.</p>
          </div>
        ) : sortedLandmarks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-4 grid size-16 place-items-center rounded-full bg-[#f5f7f6] text-[#8a9a94]">
              <svg className="size-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <p className="text-[16px] font-medium text-[#183c2f]">No info areas yet</p>
            <p className="mb-6 mt-1 max-w-sm text-[14px] text-[#667c74]">
              Add nearby places so admins can attach them to rental properties.
            </p>
            <button
              onClick={openCreatePanel}
              className="inline-flex h-9 items-center justify-center gap-2 rounded-full bg-[#2e6f57] px-4 text-[13px] font-medium text-white shadow-sm transition hover:bg-[#255f49]"
            >
              Create first info area
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[14px]">
              <thead className="bg-[#f5f7f6] text-[12px] font-medium uppercase tracking-wider text-[#8a9a94]">
                <tr>
                  <th className="px-6 py-4">Info Area</th>
                  <th className="px-6 py-4">Distance</th>
                  <th className="px-6 py-4 text-center">Order</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f4f2]">
                {sortedLandmarks.map((landmark) => (
                  <tr key={landmark.id} className="transition hover:bg-[#f5f7f6]">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#f5f7f6] text-[#2e6f57]">
                          <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                        </span>
                        <p className="font-semibold text-[#183c2f]">{landmark.key}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-[#667c74]">{landmark.value}</td>
                    <td className="px-6 py-4 text-center text-[#667c74]">{landmark.displayOrder}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditPanel(landmark)}
                          className="flex h-8 items-center rounded-lg border border-[#dfe8e4] bg-white px-3 text-[12px] font-medium text-[#2e6f57] transition hover:border-[#2e6f57] hover:bg-[#f5f7f6]"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setLandmarkToDelete(landmark)}
                          disabled={deletingId === landmark.id}
                          className="flex h-8 items-center rounded-lg border border-[#fecaca] bg-white px-3 text-[12px] font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                        >
                          {deletingId === landmark.id ? "Deleting..." : "Delete"}
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

      {isPanelOpen && (
        <LandmarkFormPanel
          key={editingLandmark?.id ?? "new"}
          isOpen={isPanelOpen}
          landmark={editingLandmark}
          onClose={() => setIsPanelOpen(false)}
          onSaved={() => setIsPanelOpen(false)}
        />
      )}

      <ConfirmModal
        isOpen={Boolean(landmarkToDelete)}
        title="Delete Info Area"
        message={`Are you sure you want to delete "${landmarkToDelete?.key}"? This cannot be undone.`}
        confirmText="Delete Info Area"
        onConfirm={() => landmarkToDelete && confirmDelete(landmarkToDelete.id)}
        onCancel={() => setLandmarkToDelete(null)}
        isPending={deletingId === landmarkToDelete?.id}
      />
    </div>
  );
}
