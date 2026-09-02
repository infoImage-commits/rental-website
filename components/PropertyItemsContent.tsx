"use client";

import { useState, useEffect } from "react";
import IconSelectorModal from "@/components/admin/IconSelectorModal";
import {
  usePropertyCategoryItems,
  useCreatePropertyCategoryItem,
  useUpdatePropertyCategoryItem,
  useDeletePropertyCategoryItem,
  useUpdatePropertyCategoryItemStatus,
} from "@/lib/hooks/usePropertyCategoryItem";
import { usePropertyCategories } from "@/lib/hooks/usePropertyCategory";
import type { PropertyCategoryItem, PropertyCategoryItemRequest } from "@/lib/types/propertyCategory";
import ConfirmModal from "./ConfirmModal";

// ── Form slide-over panel ─────────────────────────────────────────────────────
function ItemFormPanel({
  item,
  isOpen,
  onClose,
  onSaved,
}: {
  item: PropertyCategoryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEditing = !!item;
  const { data: categories = [] } = usePropertyCategories();
  const { mutate: createItem, isPending: isCreating } = useCreatePropertyCategoryItem();
  const { mutate: updateItem, isPending: isUpdating } = useUpdatePropertyCategoryItem();

  const [propertyCategoryId, setPropertyCategoryId] = useState("");
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("amenities-title");
  const [isIconSelectorOpen, setIsIconSelectorOpen] = useState(false);
  const [isDefaultIconSelectorOpen, setIsDefaultIconSelectorOpen] = useState(false);
  const [displayOrder, setDisplayOrder] = useState<number | "">("");

  useEffect(() => {
    if (isOpen) {
      setPropertyCategoryId(item?.propertyCategoryId ?? (categories[0]?.id || ""));
      setName(item?.name ?? "");
      setIcon(item?.icon ?? "amenities-title");
      setDisplayOrder(item?.displayOrder ?? "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, item, categories.length]);

  if (!isOpen) return null;

  const isSaving = isCreating || isUpdating;
  const isFormValid = name.trim().length > 0 && propertyCategoryId;

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!isFormValid) return;

    const payload: PropertyCategoryItemRequest = {
      propertyCategoryId,
      name: name.trim(),
      icon: icon.trim() || undefined,
      displayOrder: displayOrder !== "" ? Number(displayOrder) : undefined,
    };

    if (isEditing && item) {
      payload.id = item.id;
      updateItem({ id: item.id, payload }, { onSuccess: onSaved });
    } else {
      createItem(payload, { onSuccess: onSaved });
    }
  }

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#dfe8e4] px-6 py-4">
          <h2 className="text-[18px] font-semibold text-[#183c2f]">
            {isEditing ? "Edit Item" : "New Item"}
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
          {/* Category */}
          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={propertyCategoryId}
              onChange={(e) => setPropertyCategoryId(e.target.value)}
              className="w-full rounded-xl border border-[#dfe8e4] bg-white px-4 py-2.5 text-[14px] outline-none transition focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]"
            >
              <option value="" disabled>Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

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
              placeholder="e.g. WiFi"
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
                "Create Item"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Main content ──────────────────────────────────────────────────────────────
export default function PropertyItemsContent() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PropertyCategoryItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<PropertyCategoryItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { data: items = [], isLoading: itemsLoading, isError: itemsError } = usePropertyCategoryItems();
  const { data: categories = [], isLoading: categoriesLoading } = usePropertyCategories();
  const { mutate: deleteItem } = useDeletePropertyCategoryItem();
  const { mutate: updateStatus } = useUpdatePropertyCategoryItemStatus();

  function openCreatePanel() {
    setEditingItem(null);
    setIsPanelOpen(true);
  }

  function openEditPanel(item: PropertyCategoryItem) {
    setEditingItem(item);
    setIsPanelOpen(true);
  }

  function confirmDelete(id: string) {
    setDeletingId(id);
    deleteItem(id, {
      onSettled: () => {
        setDeletingId(null);
        setItemToDelete(null);
      },
    });
  }

  const isLoading = itemsLoading || categoriesLoading;
  const filteredItems = selectedCategory === "all" ? items : items.filter(item => item.propertyCategoryId === selectedCategory);

  return (
    <div className="w-full min-w-0">
      {/* Page header */}
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#d9a441]">
            Management
          </p>
          <h1 className="mt-1 text-[26px] font-semibold leading-tight text-[#183c2f] lg:text-[32px]">
            Rent Includes Items
          </h1>
          <p className="mt-1 text-[14px] text-[#667c74]">
            Manage individual items like WiFi, Sea View, or Pool that belong to a category.
          </p>
        </div>
        <button
          onClick={openCreatePanel}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#2e6f57] px-5 text-[14px] font-medium text-white shadow-sm transition hover:bg-[#255f49] hover:shadow"
        >
          <svg className="size-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
          </svg>
          Add Item
        </button>
      </header>

      {/* Filter and count */}
      {!isLoading && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-[14px] font-medium text-[#183c2f]">Filter by Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-lg border border-[#dfe8e4] bg-white px-3 py-1.5 text-[13px] outline-none focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <span className="rounded-full bg-[#f5f7f6] px-3 py-1 text-[12px] font-medium text-[#667c74]">
            {filteredItems.length} Item{filteredItems.length !== 1 ? "s" : ""}
          </span>
        </div>
      )}

      {/* Table card */}
      <div className="w-full overflow-hidden rounded-2xl border border-[#dfe8e4] bg-white shadow-[0_8px_24px_rgba(31,77,61,0.05)]">
        {isLoading ? (
          <div className="flex items-center justify-center py-20 text-[14px] text-[#8a9a94]">
            <span className="mr-2 inline-block size-5 animate-spin rounded-full border-2 border-[#dfe8e4] border-t-[#2e6f57]" />
            Loading items…
          </div>
        ) : itemsError ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-[15px] font-medium text-[#183c2f]">Failed to load items</p>
            <p className="mt-1 text-[13px] text-[#667c74]">Check your connection and try again.</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-4 grid size-16 place-items-center rounded-full bg-[#f5f7f6] text-[#8a9a94]">
              <svg className="size-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
              </svg>
            </div>
            <p className="text-[16px] font-medium text-[#183c2f]">No items found</p>
            <p className="mb-6 mt-1 max-w-sm text-[14px] text-[#667c74]">
              Get started by creating a new item for a category.
            </p>
            <button
              onClick={openCreatePanel}
              className="inline-flex h-9 items-center justify-center gap-2 rounded-full bg-[#2e6f57] px-4 text-[13px] font-medium text-white shadow-sm transition hover:bg-[#255f49]"
            >
              Create first item
            </button>
          </div>
        ) : (
          <table className="w-full text-left text-[14px]">
            <thead className="bg-[#f5f7f6] text-[12px] font-medium uppercase tracking-wider text-[#8a9a94]">
              <tr>
                <th className="px-6 py-4">Item</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f4f2]">
              {filteredItems.map((item) => {
                const category = categories.find(c => c.id === item.propertyCategoryId);
                
                return (
                  <tr key={item.id} className="transition hover:bg-[#f5f7f6]">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 min-w-[60px] items-center justify-center rounded-lg bg-[#f5f7f6] font-mono text-[11px] text-[#2e6f57]">
                          {item.icon ? (
                          <div className="flex justify-center">
                            <img src={`/icons/amenities/${item.icon}.svg`} alt="icon" className="h-5 w-5 object-contain" />
                          </div>
                        ) : (
                          "—"
                        )}
                        </span>
                        <div>
                          <p className="font-semibold text-[#183c2f]">{item.name}</p>
                          {item.isDefault && (
                            <span className="mt-1 inline-block rounded-full bg-[#fff8ec] px-2 py-0.5 text-[10px] font-semibold text-[#d9a441]">
                              Default
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#667c74]">
                      {category?.name || "Unknown"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <label 
                        className="relative inline-flex cursor-pointer items-center" 
                      >
                        <input
                          type="checkbox"
                          className="peer sr-only"
                          checked={item.isActive}
                          onChange={(e) => updateStatus({ id: item.id, isActive: e.target.checked })}
                        />
                        <div className="peer h-5 w-9 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#2e6f57] peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#2e6f57]/20"></div>
                      </label>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditPanel(item)}
                          className="flex h-8 items-center gap-1.5 rounded-lg border border-[#dfe8e4] bg-white px-3 text-[12px] font-medium text-[#2e6f57] transition hover:border-[#2e6f57] hover:bg-[#f5f7f6]"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setItemToDelete(item)}
                          disabled={deletingId === item.id}
                          className="flex h-8 items-center gap-1.5 rounded-lg border border-[#fecaca] bg-white px-3 text-[12px] font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                        >
                          {deletingId === item.id ? "Deleting…" : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Slide-over */}
      <ItemFormPanel
        isOpen={isPanelOpen}
        item={editingItem}
        onClose={() => setIsPanelOpen(false)}
        onSaved={() => setIsPanelOpen(false)}
      />

      {/* Delete confirmation */}
      <ConfirmModal
        isOpen={!!itemToDelete}
        title="Delete Item"
        message={`Are you sure you want to delete "${itemToDelete?.name}"? This cannot be undone.`}
        confirmText="Delete Item"
        onConfirm={() => itemToDelete && confirmDelete(itemToDelete.id)}
        onCancel={() => setItemToDelete(null)}
        isPending={deletingId === itemToDelete?.id}
      />
    </div>
  );
}
