"use client";

import { useState, useEffect } from "react";
import {
  useFaqs,
  useCreateFaq,
  useUpdateFaq,
  useDeleteFaq,
} from "@/lib/hooks/useFaq";
import type { FaqItem, FaqsQuery } from "@/lib/types/faq";
import ConfirmModal from "./ConfirmModal";

// ── Form Panel Component ──────────────────────────────────────────────────────
function FaqFormPanel({
  faq,
  isOpen,
  onClose,
  onSaved,
}: {
  faq: FaqItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEditing = !!faq;
  const { mutate: createFaq, isPending: isCreating } = useCreateFaq();
  const { mutate: updateFaq, isPending: isUpdating } = useUpdateFaq();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [displayOrder, setDisplayOrder] = useState<number>(1);
  const [isPublished, setIsPublished] = useState(false);

  // Sync state when panel opens/faq changes
  useEffect(() => {
    if (isOpen) {
      setQuestion(faq?.question ?? "");
      setAnswer(faq?.answer ?? "");
      setDisplayOrder(faq?.displayOrder ?? 1);
      setIsPublished(faq?.isPublished ?? false);
    }
  }, [isOpen, faq]);

  if (!isOpen) return null;

  const isSaving = isCreating || isUpdating;

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;

    const payload = {
      question: question.trim(),
      answer: answer.trim(),
      displayOrder,
      isPublished,
    };

    if (isEditing && faq) {
      updateFaq(
        { id: faq.id, payload },
        {
          onSuccess: () => {
            onSaved();
          },
        }
      );
    } else {
      createFaq(payload, {
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
            {isEditing ? "Edit FAQ" : "Create FAQ"}
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
                Question <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="E.g., How do I book a cleaning?"
                className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none transition focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">
                Answer <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows={5}
                placeholder="Enter the detailed answer here..."
                className="w-full resize-y rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none transition focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">
                Display Order
              </label>
              <input
                type="number"
                min="1"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 1)}
                className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none transition focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]"
              />
              <p className="mt-1 text-[12px] text-[#8a9a94]">
                Lower numbers appear first.
              </p>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-[#dfe8e4] p-4">
              <div>
                <p className="text-[14px] font-medium text-[#183c2f]">Publish immediately</p>
                <p className="text-[12px] text-[#8a9a94]">Make this FAQ visible to visitors.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsPublished(!isPublished)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#2e6f57] focus:ring-offset-2 ${
                  isPublished ? "bg-[#2e6f57]" : "bg-[#dfe8e4]"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    isPublished ? "translate-x-6" : "translate-x-1"
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
              disabled={isSaving || !question.trim() || !answer.trim()}
              className="inline-flex min-w-[100px] items-center justify-center gap-2 rounded-full bg-[#2e6f57] px-5 py-2.5 text-[14px] font-medium text-white transition hover:bg-[#255f49] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                "Save FAQ"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Main Page Content ─────────────────────────────────────────────────────────
export default function FaqContent() {
  const [query, setQuery] = useState<FaqsQuery>({
    PageNumber: 1,
    PageSize: 10,
    SortBy: "displayOrder",
    IsDescending: false,
  });

  const [searchInput, setSearchInput] = useState("");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [faqToDelete, setFaqToDelete] = useState<FaqItem | null>(null);

  const { data, isLoading, isError, isFetching } = useFaqs(query);
  const { mutate: updateFaq } = useUpdateFaq();
  const { mutate: deleteFaq } = useDeleteFaq();

  function applySearch() {
    setQuery((q) => ({ ...q, SearchTerm: searchInput || undefined, PageNumber: 1 }));
  }

  function handleFilterChange(filter: "all" | "published" | "drafts") {
    setQuery((q) => ({
      ...q,
      IsPublished: filter === "all" ? undefined : filter === "published",
      PageNumber: 1,
    }));
  }

  function openCreatePanel() {
    setEditingFaq(null);
    setIsPanelOpen(true);
  }

  function openEditPanel(faq: FaqItem) {
    setEditingFaq(faq);
    setIsPanelOpen(true);
  }

  function handleTogglePublish(faq: FaqItem) {
    const payload = {
      question: faq.question,
      answer: faq.answer,
      displayOrder: faq.displayOrder,
      isPublished: !faq.isPublished,
    };
    updateFaq({ id: faq.id, payload });
  }

  function confirmDelete(id: string) {
    setDeletingId(id);
    deleteFaq(id, {
      onSettled: () => {
        setDeletingId(null);
        setFaqToDelete(null);
      },
    });
  }

  const totalCount = data?.totalCount ?? 0;
  const totalPages = data?.totalPages ?? 1;
  const currentPage = query.PageNumber ?? 1;

  return (
    <div className="w-full min-w-0">
      {/* Header */}
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#d9a441]">
            Content
          </p>
          <h1 className="mt-1 text-[26px] font-semibold leading-tight text-[#183c2f] lg:text-[32px]">
            FAQs
          </h1>
          <p className="mt-1 text-[14px] text-[#667c74]">
            Manage frequently asked questions and their visibility.
          </p>
        </div>
        <button
          onClick={openCreatePanel}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#2e6f57] px-5 text-[14px] font-medium text-white transition hover:bg-[#255f49] shadow-sm hover:shadow"
        >
          <svg className="size-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
          </svg>
          Add FAQ
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
            placeholder="Search questions..."
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

        {/* Filter Tabs */}
        <div className="flex items-center rounded-xl border border-[#dfe8e4] bg-white p-1 text-[13px]">
          {(["all", "published", "drafts"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => handleFilterChange(f)}
              className={`h-8 rounded-lg px-3 font-medium capitalize transition ${
                (f === "all" && query.IsPublished === undefined) ||
                (f === "published" && query.IsPublished === true) ||
                (f === "drafts" && query.IsPublished === false)
                  ? "bg-[#2e6f57] text-white shadow-sm"
                  : "text-[#667c74] hover:text-[#183c2f]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Count Badge */}
        {!isLoading && (
          <span className="rounded-full bg-[#f5f7f6] px-3 py-1 text-[12px] font-medium text-[#667c74]">
            {totalCount} FAQ{totalCount !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Main List Area */}
      <div className="w-full rounded-2xl border border-[#dfe8e4] bg-white shadow-[0_8px_24px_rgba(31,77,61,0.05)] overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-20 text-[#8a9a94] text-[14px]">
            <span className="mr-2 inline-block size-5 animate-spin rounded-full border-2 border-[#dfe8e4] border-t-[#2e6f57]" />
            Loading FAQs...
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-[15px] font-medium text-[#183c2f]">Failed to load FAQs</p>
            <p className="mt-1 text-[13px] text-[#667c74]">Check your connection and try again.</p>
          </div>
        ) : !data?.items.length ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="grid size-16 place-items-center rounded-full bg-[#f5f7f6] text-[#8a9a94] mb-4">
               <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
            </div>
            <p className="text-[16px] font-medium text-[#183c2f]">No FAQs found</p>
            <p className="mt-1 mb-6 text-[14px] text-[#667c74] max-w-sm">
              Get started by adding your first frequently asked question to help users understand your platform better.
            </p>
             <button
              onClick={openCreatePanel}
              className="inline-flex h-9 items-center justify-center gap-2 rounded-full bg-[#2e6f57] px-4 text-[13px] font-medium text-white transition hover:bg-[#255f49] shadow-sm"
            >
              Add your first FAQ
            </button>
          </div>
        ) : (
          <div className="divide-y divide-[#f0f4f2]">
            {data.items.map((faq) => (
              <div
                key={faq.id}
                className="group flex flex-col gap-4 p-5 sm:flex-row sm:items-start transition hover:bg-[#f5f7f6]"
              >
                {/* Order Badge */}
                <div className="hidden sm:flex mt-1 shrink-0">
                  <div className="grid size-8 place-items-center rounded-lg bg-[#f5f7f6] text-[13px] font-semibold text-[#2e6f57]">
                    #{faq.displayOrder}
                  </div>
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="sm:hidden font-semibold text-[#2e6f57] text-[13px]">#{faq.displayOrder}</span>
                    <h3 className="text-[15px] font-semibold text-[#183c2f] leading-snug">
                      {faq.question}
                    </h3>
                    {/* Status Badge (clickable to toggle) */}
                     <button
                        onClick={() => handleTogglePublish(faq)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium transition hover:shadow-sm ${
                          faq.isPublished
                            ? "bg-[#f5f7f6] text-[#2e6f57] hover:bg-[#dfe8e4]"
                            : "bg-[#f5f7f6] text-[#667c74] hover:bg-[#dfe8e4]"
                        }`}
                        title="Click to toggle status"
                      >
                        <span className={`size-1.5 rounded-full ${faq.isPublished ? 'bg-[#2e6f57]' : 'bg-[#8a9a94]'}`} />
                        {faq.isPublished ? "Published" : "Draft"}
                      </button>
                  </div>
                  <p className="text-[14px] text-[#667c74] leading-relaxed line-clamp-2 pr-4">
                    {faq.answer}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 items-center gap-2 sm:opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() => openEditPanel(faq)}
                    className="flex h-8 items-center gap-1.5 rounded-lg border border-[#dfe8e4] bg-white px-3 text-[12px] font-medium text-[#2e6f57] transition hover:bg-[#f5f7f6] hover:border-[#2e6f57]"
                  >
                     <svg className="size-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={() => setFaqToDelete(faq)}
                    disabled={deletingId === faq.id}
                    className="flex h-8 items-center gap-1.5 rounded-lg border border-[#fecaca] bg-white px-3 text-[12px] font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                  >
                     {deletingId === faq.id ? (
                        <span className="size-3.5 animate-spin rounded-full border-2 border-red-300 border-t-red-600" />
                      ) : (
                        <svg className="size-3.5" viewBox="0 0 20 20" fill="currentColor">
                           <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      )}
                    Delete
                  </button>
                </div>
              </div>
            ))}
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
              onClick={() => setQuery((q) => ({ ...q, PageNumber: (q.PageNumber ?? 1) - 1 }))}
              className="h-8 rounded-lg border border-[#dfe8e4] px-3 font-medium text-[#667c74] transition hover:border-[#2e6f57] hover:text-[#2e6f57] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ← Prev
            </button>
            <button
              type="button"
              disabled={!data?.hasNextPage || isFetching}
              onClick={() => setQuery((q) => ({ ...q, PageNumber: (q.PageNumber ?? 1) + 1 }))}
              className="h-8 rounded-lg border border-[#dfe8e4] px-3 font-medium text-[#667c74] transition hover:border-[#2e6f57] hover:text-[#2e6f57] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* Create/Edit Panel */}
      <FaqFormPanel
        isOpen={isPanelOpen}
        faq={editingFaq}
        onClose={() => setIsPanelOpen(false)}
        onSaved={() => setIsPanelOpen(false)}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!faqToDelete}
        title="Delete FAQ"
        message={`Are you sure you want to delete "${faqToDelete?.question}"? This action cannot be undone.`}
        confirmText="Delete FAQ"
        onConfirm={() => faqToDelete && confirmDelete(faqToDelete.id)}
        onCancel={() => setFaqToDelete(null)}
        isPending={deletingId === faqToDelete?.id}
      />
    </div>
  );
}
