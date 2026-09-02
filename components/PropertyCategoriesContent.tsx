"use client";

import { useState, useEffect } from "react";
import IconSelectorModal from "@/components/admin/IconSelectorModal";
import {
  usePropertyCategories,
  usePropertyCategoryById,
  useCreatePropertyCategory,
  useUpdatePropertyCategory,
  useDeletePropertyCategory,
  useUpdatePropertyCategoryStatus,
} from "@/lib/hooks/usePropertyCategory";
import type { PropertyCategory, PropertyCategoryRequest } from "@/lib/types/propertyCategory";
import ConfirmModal from "./ConfirmModal";

// ── Expanded items row (lazy-loaded) ──────────────────────────────────────────
function CategoryItemsRow({ categoryId }: { categoryId: string }) {
  const { data: category, isLoading } = usePropertyCategoryById(categoryId);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 px-6 py-3 text-[13px] text-[#8a9a94]">
        <span className="size-3.5 animate-spin rounded-full border-2 border-[#dfe8e4] border-t-[#2e6f57]" />
        Loading items…
      </div>
    );
  }

  if (!category || category.items.length === 0) {
    return (
      <div className="px-6 py-3 text-[13px] text-[#8a9a94]">
        No items in this category.
      </div>
    );
  }

  return (
    <div className="divide-y divide-[#f5f7f6] border-t border-[#dfe8e4] bg-[#f5f7f6]">
      {category.items.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-4 px-8 py-2.5"
        >
          {/* Icon badge */}
          <span className="flex h-7 min-w-[60px] items-center justify-center rounded-md bg-[#f5f7f6] px-2 font-mono text-[11px] text-[#2e6f57]">
            {item.icon ?? "—"}
          </span>
          <span className="text-[13px] font-medium text-[#183c2f]">{item.name}</span>
          <span className="ml-auto flex items-center gap-2">
            <span
              className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                item.isActive
                  ? "bg-[#f5f7f6] text-[#2e6f57]"
                  : "bg-[#f5f5f5] text-[#8a9a94]"
              }`}
            >
              {item.isActive ? "Active" : "Inactive"}
            </span>
            {item.isDefault && (
              <span className="rounded-full bg-[#fff8ec] px-2 py-0.5 text-[11px] font-semibold text-[#d9a441]">
                Default
              </span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Form slide-over panel ─────────────────────────────────────────────────────
function CategoryFormPanel({
  category,
  isOpen,
  onClose,
  onSaved,
}: {
  category: PropertyCategory | null;
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEditing = !!category;
  const { mutate: createCategory, isPending: isCreating } = useCreatePropertyCategory();
  const { mutate: updateCategory, isPending: isUpdating } = useUpdatePropertyCategory();

  const [name, setName] = useState("");
  const [icon, setIcon] = useState("amenities-title");
  const [isIconSelectorOpen, setIsIconSelectorOpen] = useState(false);
  const [isDefaultIconSelectorOpen, setIsDefaultIconSelectorOpen] = useState(false);
  const [defaultIcon, setDefaultIcon] = useState("amenities-title");
  const [displayOrder, setDisplayOrder] = useState<number | "">("");

  useEffect(() => {
    if (isOpen) {
      setName(category?.name ?? "");
      setIcon(category?.icon ?? "amenities-title");
      setDefaultIcon(category?.defaultIcon ?? "amenities-title");
      setDisplayOrder(category?.displayOrder ?? "");
    }
  }, [isOpen, category]);

  if (!isOpen) return null;

  const isSaving = isCreating || isUpdating;
  const isFormValid = name.trim().length > 0;

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!isFormValid) return;

    const payload: PropertyCategoryRequest = {
      name: name.trim(),
      icon: icon.trim() || undefined,
      defaultIcon: defaultIcon.trim() || undefined,
      displayOrder: displayOrder !== "" ? Number(displayOrder) : undefined,
    };

    if (isEditing && category) {
      payload.id = category.id;
      updateCategory({ id: category.id, payload }, { onSuccess: onSaved });
    } else {
      createCategory(payload, { onSuccess: onSaved });
    }
  }

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#dfe8e4] px-6 py-4">
          <h2 className="text-[18px] font-semibold text-[#183c2f]">
            {isEditing ? "Edit Category" : "New Category"}
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

        {/* Form body */}
        <form onSubmit={handleSave} className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
          {/* Name */}
          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Amenities"
              className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none transition focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]"
            />
          </div>

          {/* Icon */}
          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">
              Icon <span className="text-[11px] font-normal text-[#8a9a94]">(Select an amenity icon)</span>
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsIconSelectorOpen(true)}
                className="flex h-10 items-center justify-center rounded-lg border border-[#dfe8e4] bg-[#f4f7f6] px-4 text-[14px] font-medium text-[#183c2f] transition hover:bg-[#e8efeb]"
              >
                Select Icon
              </button>
              {icon && (
                <div className="flex items-center gap-2 rounded-full border border-[#dfe8e4] bg-white px-3 py-1">
                  <img src={`/icons/amenities/${icon}.svg`} alt="icon" className="h-5 w-5 object-contain" />
                  <span className="text-[12px] text-[#667c74]">{icon}</span>
                  <button type="button" onClick={() => setIcon("")} className="ml-1 text-[#8a9a94] hover:text-red-500">✕</button>
                </div>
              )}
            </div>
            <IconSelectorModal
              isOpen={isIconSelectorOpen}
              onClose={() => setIsIconSelectorOpen(false)}
              currentIcon={icon}
              onSelect={(selected) => {
                setIcon(selected);
                setIsIconSelectorOpen(false);
              }}
            />
          </div>

          {/* Default icon */}
          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">
              Default Icon <span className="text-[11px] font-normal text-[#8a9a94]">(Fallback icon if item has none)</span>
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsDefaultIconSelectorOpen(true)}
                className="flex h-10 items-center justify-center rounded-lg border border-[#dfe8e4] bg-[#f4f7f6] px-4 text-[14px] font-medium text-[#183c2f] transition hover:bg-[#e8efeb]"
              >
                Select Default Icon
              </button>
              {defaultIcon && (
                <div className="flex items-center gap-2 rounded-full border border-[#dfe8e4] bg-white px-3 py-1">
                  <img src={`/icons/amenities/${defaultIcon}.svg`} alt="icon" className="h-5 w-5 object-contain" />
                  <span className="text-[12px] text-[#667c74]">{defaultIcon}</span>
                  <button type="button" onClick={() => setDefaultIcon("")} className="ml-1 text-[#8a9a94] hover:text-red-500">✕</button>
                </div>
              )}
            </div>
            <IconSelectorModal
              isOpen={isDefaultIconSelectorOpen}
              onClose={() => setIsDefaultIconSelectorOpen(false)}
              currentIcon={defaultIcon}
              onSelect={(selected) => {
                setDefaultIcon(selected);
                setIsDefaultIconSelectorOpen(false);
              }}
            />
          </div>

          {/* Display order */}
          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">
              Display Order
            </label>
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

        {/* Footer */}
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
              className="inline-flex min-w-[100px] items-center justify-center gap-2 rounded-full bg-[#2e6f57] px-5 py-2.5 text-[14px] font-medium text-white transition hover:bg-[#255f49] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSaving ? (
                <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : isEditing ? (
                "Save Changes"
              ) : (
                "Create Category"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Main content ──────────────────────────────────────────────────────────────
export default function PropertyCategoriesContent() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<PropertyCategory | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<PropertyCategory | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data: categories = [], isLoading, isError } = usePropertyCategories();
  const { mutate: deleteCategory } = useDeletePropertyCategory();
  const { mutate: updateStatus } = useUpdatePropertyCategoryStatus();

  function openCreatePanel() {
    setEditingCategory(null);
    setIsPanelOpen(true);
  }

  function openEditPanel(cat: PropertyCategory) {
    setEditingCategory(cat);
    setIsPanelOpen(true);
  }

  function toggleExpand(id: string) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  function confirmDelete(id: string) {
    setDeletingId(id);
    deleteCategory(id, {
      onSettled: () => {
        setDeletingId(null);
        setCategoryToDelete(null);
        if (expandedId === id) setExpandedId(null);
      },
    });
  }

  return (
    <div className="w-full min-w-0">
      {/* Page header */}
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#d9a441]">
            Management
          </p>
          <h1 className="mt-1 text-[26px] font-semibold leading-tight text-[#183c2f] lg:text-[32px]">
            Rent Includes Categories
          </h1>
          <p className="mt-1 text-[14px] text-[#667c74]">
            Manage the included categories (features, amenities, etc.) available for properties.
          </p>
        </div>
        <button
          onClick={openCreatePanel}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#2e6f57] px-5 text-[14px] font-medium text-white shadow-sm transition hover:bg-[#255f49] hover:shadow"
        >
          <svg className="size-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
          </svg>
          Add Category
        </button>
      </header>

      {/* Count chip */}
      {!isLoading && (
        <div className="mb-4">
          <span className="rounded-full bg-[#f5f7f6] px-3 py-1 text-[12px] font-medium text-[#667c74]">
            {categories.length} Categor{categories.length !== 1 ? "ies" : "y"}
          </span>
        </div>
      )}

      {/* Table card */}
      <div className="w-full overflow-hidden rounded-2xl border border-[#dfe8e4] bg-white shadow-[0_8px_24px_rgba(31,77,61,0.05)]">
        {isLoading ? (
          <div className="flex items-center justify-center py-20 text-[14px] text-[#8a9a94]">
            <span className="mr-2 inline-block size-5 animate-spin rounded-full border-2 border-[#dfe8e4] border-t-[#2e6f57]" />
            Loading categories…
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-[15px] font-medium text-[#183c2f]">Failed to load categories</p>
            <p className="mt-1 text-[13px] text-[#667c74]">Check your connection and try again.</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-4 grid size-16 place-items-center rounded-full bg-[#f5f7f6] text-[#8a9a94]">
              <svg className="size-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
              </svg>
            </div>
            <p className="text-[16px] font-medium text-[#183c2f]">No categories yet</p>
            <p className="mb-6 mt-1 max-w-sm text-[14px] text-[#667c74]">
              Get started by creating your first property included category.
            </p>
            <button
              onClick={openCreatePanel}
              className="inline-flex h-9 items-center justify-center gap-2 rounded-full bg-[#2e6f57] px-4 text-[13px] font-medium text-white shadow-sm transition hover:bg-[#255f49]"
            >
              Create first category
            </button>
          </div>
        ) : (
          <div className="divide-y divide-[#f0f4f2]">
            {categories.map((cat) => {
              const isExpanded = expandedId === cat.id;

              return (
                <div key={cat.id}>
                  {/* Category row — clicking anywhere expands/collapses items */}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => toggleExpand(cat.id)}
                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggleExpand(cat.id)}
                    className="group flex cursor-pointer flex-col gap-4 p-5 transition hover:bg-[#f5f7f6] sm:flex-row sm:items-center sm:justify-between"
                  >
                    {/* Left: expand indicator + info */}
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      {/* Chevron indicator (not a button — row is the click target) */}
                      <span
                        className="grid size-7 shrink-0 place-items-center rounded-full text-[#8a9a94]"
                        aria-hidden="true"
                      >
                        <svg
                          className={`size-4 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>

                      {/* Icon chip */}
                      <span className="flex h-8 min-w-[68px] items-center justify-center rounded-lg bg-[#f5f7f6] font-mono text-[11px] text-[#2e6f57]">
                        {cat.defaultIcon || cat.icon ? (
                          <div className="flex justify-center">
                            <img src={`/icons/amenities/${cat.defaultIcon || cat.icon}.svg`} alt="icon" className="h-5 w-5 object-contain" />
                          </div>
                        ) : (
                          "—"
                        )}
                      </span>

                      {/* Name + badges */}
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-[15px] font-semibold text-[#183c2f]">{cat.name}</h3>
                          {cat.isDefault && (
                            <span className="rounded-full bg-[#fff8ec] px-2 py-0.5 text-[11px] font-semibold text-[#d9a441]">
                              Default
                            </span>
                          )}
                          <label 
                            className="relative inline-flex cursor-pointer items-center ml-2" 
                            onClick={(e) => e.stopPropagation()}
                          >
                            <input
                              type="checkbox"
                              className="peer sr-only"
                              checked={cat.isActive}
                              onChange={(e) => updateStatus({ id: cat.id, isActive: e.target.checked })}
                            />
                            <div className="peer h-5 w-9 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#2e6f57] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#2e6f57]/20"></div>
                            <span className="ml-2 text-[11px] font-medium text-[#667c74]">
                              {cat.isActive ? "Active" : "Inactive"}
                            </span>
                          </label>
                        </div>
                        <p className="mt-0.5 text-[13px] text-[#8a9a94]">
                          Display order: {cat.displayOrder}
                        </p>
                      </div>
                    </div>

                    {/* Right: actions — stop propagation so clicks don't toggle expand */}
                    <div
                      className="flex shrink-0 items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => openEditPanel(cat)}
                        className="flex h-8 items-center gap-1.5 rounded-lg border border-[#dfe8e4] bg-white px-3 text-[12px] font-medium text-[#2e6f57] transition hover:border-[#2e6f57] hover:bg-[#f5f7f6]"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setCategoryToDelete(cat)}
                        disabled={deletingId === cat.id}
                        className="flex h-8 items-center gap-1.5 rounded-lg border border-[#fecaca] bg-white px-3 text-[12px] font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                      >
                        {deletingId === cat.id ? "Deleting…" : "Delete"}
                      </button>
                    </div>
                  </div>

                  {/* Expanded items sub-panel */}
                  {isExpanded && <CategoryItemsRow categoryId={cat.id} />}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Slide-over */}
      <CategoryFormPanel
        isOpen={isPanelOpen}
        category={editingCategory}
        onClose={() => setIsPanelOpen(false)}
        onSaved={() => setIsPanelOpen(false)}
      />

      {/* Delete confirmation */}
      <ConfirmModal
        isOpen={!!categoryToDelete}
        title="Delete Category"
        message={`Are you sure you want to delete "${categoryToDelete?.name}"? This cannot be undone.`}
        confirmText="Delete Category"
        onConfirm={() => categoryToDelete && confirmDelete(categoryToDelete.id)}
        onCancel={() => setCategoryToDelete(null)}
        isPending={deletingId === categoryToDelete?.id}
      />
    </div>
  );
}
