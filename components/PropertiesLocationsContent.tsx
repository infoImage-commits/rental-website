"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from "@/lib/hooks/useCategory";
import type { CategoryItem } from "@/lib/types/category";
import { API_BASE_URL } from "@/lib/api/config";
import ConfirmModal from "./ConfirmModal";

// ── Form Panel Component ──────────────────────────────────────────────────────
function CategoryFormPanel({
  category,
  isOpen,
  onClose,
  onSaved,
}: {
  category: CategoryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEditing = !!category;
  const { mutate: createCategory, isPending: isCreating } = useCreateCategory();
  const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory();

  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const timeoutId = window.setTimeout(() => {
      setName(category?.name ?? "");
      setImageFile(null);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [isOpen, category]);

  if (!isOpen) return null;

  const isSaving = isCreating || isUpdating;
  const isFormValid = name.trim().length > 0;

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!isFormValid) return;

    const formData = new FormData();
    formData.append("Name", name);
    if (imageFile) {
      formData.append("Image", imageFile);
    }

    if (isEditing && category) {
      formData.append("Id", category.id);
      updateCategory(
        { id: category.id, payload: formData },
        {
          onSuccess: () => {
            onSaved();
          },
        }
      );
    } else {
      createCategory(formData, {
        onSuccess: () => {
          onSaved();
        },
      });
    }
  }

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/40 transition-opacity"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl transition-transform duration-300 flex flex-col">
        <div className="flex items-center justify-between border-b border-[#dfe8e4] px-6 py-4">
          <h2 className="text-[18px] font-semibold text-[#183c2f]">
            {isEditing ? "Edit Properties Location" : "Create Properties Location"}
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
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto px-6 py-6">
          <div className="space-y-5">
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. North Coast"
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
              {isEditing && category?.imageUrl && !imageFile && (
                <p className="mt-2 text-[12px] text-[#667c74]">Current image: {category.imageUrl.split('/').pop()}</p>
              )}
            </div>
          </div>
        </form>
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
function getCategoryImageUrl(imageUrl: string | null) {
  if (!imageUrl) return "";
  if (imageUrl.startsWith("http")) return imageUrl;
  return `${API_BASE_URL}/${imageUrl}`;
}

export default function PropertiesLocationsContent() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  
  const [categoryToDelete, setCategoryToDelete] = useState<CategoryItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data: categories = [], isLoading, isError } = useCategories();
  const { mutate: deleteCategory } = useDeleteCategory();

  function openCreatePanel() {
    setEditingCategory(null);
    setIsPanelOpen(true);
  }

  function openEditPanel(category: CategoryItem) {
    setEditingCategory(category);
    setIsPanelOpen(true);
  }

  function confirmDelete(id: string) {
    setDeletingId(id);
    deleteCategory(id, {
      onSettled: () => {
        setDeletingId(null);
        setCategoryToDelete(null);
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
            Properties Locations
          </h1>
          <p className="mt-1 text-[14px] text-[#667c74]">
            Manage the locations (categories) for properties displayed on the homepage.
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

      <div className="mb-4 flex flex-wrap items-center gap-3">
        {!isLoading && (
          <span className="rounded-full bg-[#f5f7f6] px-3 py-1 text-[12px] font-medium text-[#667c74]">
            {categories.length} Location{categories.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

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
        ) : categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="grid size-16 place-items-center rounded-full bg-[#f5f7f6] text-[#8a9a94] mb-4">
              <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                 <circle cx="12" cy="12" r="10" />
                 <path d="M12 8v8M8 12h8" />
              </svg>
            </div>
            <p className="text-[16px] font-medium text-[#183c2f]">No locations found</p>
            <p className="mt-1 mb-6 text-[14px] text-[#667c74] max-w-sm">
              Get started by adding a properties location to display on your homepage.
            </p>
             <button
              onClick={openCreatePanel}
              className="inline-flex h-9 items-center justify-center gap-2 rounded-full bg-[#2e6f57] px-4 text-[13px] font-medium text-white transition hover:bg-[#255f49] shadow-sm"
            >
              Create your first location
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] border-collapse text-left">
              <thead className="bg-[#f5f7f6] text-[12px] font-semibold uppercase tracking-[0.08em] text-[#667c74]">
                <tr>
                  <th className="px-5 py-3">Property Location</th>
                  <th className="px-5 py-3">Rent Properties</th>
                  <th className="px-5 py-3">Buy Properties</th>
                  <th className="px-5 py-3">Total</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f4f2] text-[14px]">
                {categories.map((category) => {
                  const imageSrc = getCategoryImageUrl(category.imageUrl);

                  return (
                    <tr key={category.id} className="transition hover:bg-[#f8faf9]">
                      <td className="px-5 py-4">
                        <div className="flex min-w-[260px] items-center gap-3">
                          {imageSrc ? (
                            <Image
                              src={imageSrc}
                              alt={category.name}
                              width={48}
                              height={48}
                              className="size-12 rounded-lg border border-[#dfe8e4] object-cover"
                            />
                          ) : (
                            <div className="grid size-12 place-items-center rounded-lg bg-[#f5f7f6] text-[#8a9a94]">
                              <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                          <span className="font-semibold text-[#183c2f]">{category.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-[#667c74]">{category.propertiesCount}</td>
                      <td className="px-5 py-4 text-[#667c74]">{category.propertyBuyingsCount}</td>
                      <td className="px-5 py-4 font-semibold text-[#183c2f]">{category.totalCount}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => openEditPanel(category)}
                            className="inline-flex h-8 items-center rounded-lg border border-[#dfe8e4] bg-white px-3 text-[12px] font-medium text-[#2e6f57] transition hover:border-[#2e6f57] hover:bg-[#f5f7f6]"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => setCategoryToDelete(category)}
                            disabled={deletingId === category.id}
                            className="inline-flex h-8 items-center rounded-lg border border-[#fecaca] bg-white px-3 text-[12px] font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                          >
                            {deletingId === category.id ? "Deleting..." : "Delete"}
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

      <CategoryFormPanel
        isOpen={isPanelOpen}
        category={editingCategory}
        onClose={() => setIsPanelOpen(false)}
        onSaved={() => setIsPanelOpen(false)}
      />

      <ConfirmModal
        isOpen={!!categoryToDelete}
        title="Delete Location"
        message={`Are you sure you want to delete "${categoryToDelete?.name}"?`}
        confirmText="Delete Location"
        onConfirm={() => categoryToDelete && confirmDelete(categoryToDelete.id)}
        onCancel={() => setCategoryToDelete(null)}
        isPending={deletingId === categoryToDelete?.id}
      />
    </div>
  );
}
