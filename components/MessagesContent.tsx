"use client";

import { useState } from "react";
import {
  useContactMessages,
  useMarkMessageAsRead,
  useDeleteContactMessage,
} from "@/lib/hooks/useContact";
import type { ContactMessage, ContactMessagesQuery } from "@/lib/types/contact";

// ── helpers ──────────────────────────────────────────────────────────────────
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ── Detail Modal ──────────────────────────────────────────────────────────────
function MessageModal({
  message,
  onClose,
  onMarkRead,
  onDelete,
  isMarkingRead,
  isDeleting,
}: {
  message: ContactMessage;
  onClose: () => void;
  onMarkRead: (id: string) => void;
  onDelete: (id: string) => void;
  isMarkingRead: boolean;
  isDeleting: boolean;
}) {
  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-[600px] rounded-3xl bg-white shadow-[0_32px_80px_rgba(31,77,61,0.16)]">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#dfe8e4] px-6 pt-6 pb-4">
          <div className="min-w-0 flex-1 pr-4">
            {!message.isRead && (
              <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-[#fef9ec] px-2.5 py-0.5 text-[11px] font-semibold text-[#d9a441]">
                <span className="size-1.5 rounded-full bg-[#d9a441]" />
                Unread
              </span>
            )}
            <h2 className="text-[18px] font-semibold leading-snug text-[#183c2f]">
              {message.subject}
            </h2>
            <p className="mt-1 text-[13px] text-[#667c74]">
              {formatDate(message.createdAtUtc)}
            </p>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="grid size-8 shrink-0 place-items-center rounded-full text-[#8a9a94] transition hover:bg-[#f5f7f6] hover:text-[#183c2f]"
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Sender info */}
        <div className="grid grid-cols-2 gap-4 border-b border-[#dfe8e4] px-6 py-4 text-[13px]">
          <div>
            <p className="font-medium text-[#8a9a94] uppercase tracking-wider text-[11px] mb-0.5">Name</p>
            <p className="font-medium text-[#183c2f]">{message.name}</p>
          </div>
          <div>
            <p className="font-medium text-[#8a9a94] uppercase tracking-wider text-[11px] mb-0.5">Email</p>
            <a href={`mailto:${message.email}`} className="font-medium text-[#2e6f57] hover:underline break-all">
              {message.email}
            </a>
          </div>
          {message.phone && (
            <div>
              <p className="font-medium text-[#8a9a94] uppercase tracking-wider text-[11px] mb-0.5">Phone</p>
              <a href={`tel:${message.phone}`} className="font-medium text-[#183c2f] hover:underline">
                {message.phone}
              </a>
            </div>
          )}
        </div>

        {/* Message body */}
        <div className="px-6 py-5">
          <p className="text-[13px] font-medium text-[#8a9a94] uppercase tracking-wider mb-2">Message</p>
          <p className="text-[14px] leading-7 text-[#3d4d47] whitespace-pre-wrap break-words">
            {message.message}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 border-t border-[#dfe8e4] px-6 py-4">
          {!message.isRead && (
            <button
              type="button"
              disabled={isMarkingRead}
              onClick={() => onMarkRead(message.id)}
              className="inline-flex h-9 items-center gap-2 rounded-full border border-[#dfe8e4] px-4 text-[13px] font-medium text-[#2e6f57] transition hover:border-[#2e6f57] hover:bg-[#f5f7f6] disabled:opacity-50"
            >
              {isMarkingRead ? (
                <span className="size-3.5 animate-spin rounded-full border-2 border-[#2e6f57]/30 border-t-[#2e6f57]" />
              ) : (
                <svg className="size-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
              Mark as Read
            </button>
          )}
          <button
            type="button"
            disabled={isDeleting}
            onClick={() => onDelete(message.id)}
            className="inline-flex h-9 items-center gap-2 rounded-full bg-red-50 px-4 text-[13px] font-medium text-red-600 transition hover:bg-red-100 disabled:opacity-50"
          >
            {isDeleting ? (
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
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function MessagesContent() {
  const [query, setQuery] = useState<ContactMessagesQuery>({
    PageNumber: 1,
    PageSize: 10,
    IsDescending: true,
    SortBy: "createdAtUtc",
  });

  const [searchInput, setSearchInput] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data, isLoading, isError, isFetching } = useContactMessages(query);
  const { mutate: markAsRead, isPending: isMarkingRead } = useMarkMessageAsRead();
  const { mutate: deleteMessage, isPending: isDeleting } = useDeleteContactMessage();

  function applySearch() {
    setQuery((q) => ({ ...q, SearchTerm: searchInput || undefined, PageNumber: 1 }));
  }

  function handleFilterChange(isRead: "all" | "read" | "unread") {
    setQuery((q) => ({
      ...q,
      IsRead: isRead === "all" ? undefined : isRead === "read",
      PageNumber: 1,
    }));
  }

  function handleMarkRead(id: string) {
    markAsRead(id, {
      onSuccess: () => {
        if (selectedMessage?.id === id) {
          setSelectedMessage((m) => (m ? { ...m, isRead: true } : null));
        }
      },
    });
  }

  function handleDelete(id: string) {
    setDeletingId(id);
    deleteMessage(id, {
      onSuccess: () => {
        setDeletingId(null);
        if (selectedMessage?.id === id) setSelectedMessage(null);
      },
      onError: () => setDeletingId(null),
    });
  }

  const totalCount = data?.totalCount ?? 0;
  const totalPages = data?.totalPages ?? 1;
  const currentPage = query.PageNumber ?? 1;

  return (
    <div className="w-full min-w-0">
      {/* Page header */}
      <header className="mb-6">
        <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#d9a441]">
          Admin
        </p>
        <h1 className="mt-1 text-[26px] font-semibold leading-tight text-[#183c2f] lg:text-[32px]">
          Contact Messages
        </h1>
        <p className="mt-1 text-[14px] text-[#667c74]">
          Review, manage and respond to messages from website visitors.
        </p>
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
            placeholder="Search by name, email or subject…"
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

        {/* Read filter */}
        <div className="flex items-center rounded-xl border border-[#dfe8e4] bg-white p-1 text-[13px]">
          {(["all", "unread", "read"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => handleFilterChange(f)}
              className={`h-8 rounded-lg px-3 font-medium capitalize transition ${
                (f === "all" && query.IsRead === undefined) ||
                (f === "read" && query.IsRead === true) ||
                (f === "unread" && query.IsRead === false)
                  ? "bg-[#2e6f57] text-white shadow-sm"
                  : "text-[#667c74] hover:text-[#183c2f]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Total count badge */}
        {!isLoading && (
          <span className="rounded-full bg-[#f5f7f6] px-3 py-1 text-[12px] font-medium text-[#667c74]">
            {totalCount} message{totalCount !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Table */}
      <div className="w-full rounded-2xl border border-[#dfe8e4] bg-white shadow-[0_8px_24px_rgba(31,77,61,0.05)] overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-20 text-[#8a9a94] text-[14px]">
            <span className="mr-2 inline-block size-5 animate-spin rounded-full border-2 border-[#dfe8e4] border-t-[#2e6f57]" />
            Loading messages…
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-[15px] font-medium text-[#183c2f]">Failed to load messages</p>
            <p className="mt-1 text-[13px] text-[#667c74]">Check your connection and try again.</p>
          </div>
        ) : !data?.items.length ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <svg className="size-12 text-[#dfe8e4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
            <p className="mt-4 text-[15px] font-medium text-[#183c2f]">No messages found</p>
            <p className="mt-1 text-[13px] text-[#667c74]">Try adjusting your filters.</p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <table className="hidden w-full min-w-[640px] lg:table">
              <thead>
                <tr className="border-b border-[#dfe8e4] bg-[#f5f7f6]">
                  {["Sender", "Subject", "Date", "Status", ""].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-[#8a9a94]"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0f4f2]">
                {data.items.map((msg) => (
                  <tr
                    key={msg.id}
                    className={`group cursor-pointer transition hover:bg-[#f5f7f6] ${!msg.isRead ? "bg-[#fefdf9]" : ""}`}
                    onClick={() => setSelectedMessage(msg)}
                  >
                    <td className="px-5 py-4">
                      <p className={`text-[14px] ${!msg.isRead ? "font-semibold text-[#183c2f]" : "font-medium text-[#3d4d47]"}`}>
                        {msg.name}
                      </p>
                      <p className="text-[12px] text-[#8a9a94]">{msg.email}</p>
                    </td>
                    <td className="px-5 py-4 max-w-[220px]">
                      <p className={`truncate text-[13px] ${!msg.isRead ? "font-semibold text-[#183c2f]" : "text-[#3d4d47]"}`}>
                        {msg.subject}
                      </p>
                      <p className="mt-0.5 truncate text-[12px] text-[#8a9a94]">
                        {msg.message.slice(0, 60)}{msg.message.length > 60 ? "…" : ""}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-[12px] text-[#8a9a94] whitespace-nowrap">
                      {formatDate(msg.createdAtUtc)}
                    </td>
                    <td className="px-5 py-4">
                      {msg.isRead ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#f5f7f6] px-2.5 py-0.5 text-[11px] font-medium text-[#2e6f57]">
                          <span className="size-1.5 rounded-full bg-[#2e6f57]" />
                          Read
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#fef9ec] px-2.5 py-0.5 text-[11px] font-medium text-[#d9a441]">
                          <span className="size-1.5 rounded-full bg-[#d9a441]" />
                          Unread
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 opacity-0 transition group-hover:opacity-100">
                        {!msg.isRead && (
                          <button
                            type="button"
                            title="Mark as read"
                            disabled={isMarkingRead}
                            onClick={(e) => { e.stopPropagation(); handleMarkRead(msg.id); }}
                            className="grid size-7 place-items-center rounded-full border border-[#dfe8e4] text-[#2e6f57] transition hover:bg-[#f5f7f6] disabled:opacity-50"
                          >
                            <svg className="size-3.5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </button>
                        )}
                        <button
                          type="button"
                          title="Delete"
                          disabled={deletingId === msg.id}
                          onClick={(e) => { e.stopPropagation(); handleDelete(msg.id); }}
                          className="grid size-7 place-items-center rounded-full border border-[#fecaca] text-red-400 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                        >
                          {deletingId === msg.id ? (
                            <span className="size-3 animate-spin rounded-full border-2 border-red-300 border-t-red-500" />
                          ) : (
                            <svg className="size-3.5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile card list */}
            <div className="grid gap-0 lg:hidden divide-y divide-[#f0f4f2]">
              {data.items.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => setSelectedMessage(msg)}
                  className={`cursor-pointer px-4 py-4 transition hover:bg-[#f5f7f6] ${!msg.isRead ? "bg-[#fefdf9]" : ""}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className={`text-[14px] ${!msg.isRead ? "font-semibold text-[#183c2f]" : "font-medium text-[#3d4d47]"}`}>
                        {msg.name}
                      </p>
                      <p className="text-[12px] text-[#8a9a94]">{msg.email}</p>
                    </div>
                    {!msg.isRead ? (
                      <span className="mt-0.5 shrink-0 size-2 rounded-full bg-[#d9a441]" />
                    ) : null}
                  </div>
                  <p className={`mt-1 truncate text-[13px] ${!msg.isRead ? "font-semibold text-[#183c2f]" : "text-[#3d4d47]"}`}>
                    {msg.subject}
                  </p>
                  <p className="mt-0.5 text-[12px] text-[#667c74]">
                    {formatDate(msg.createdAtUtc)}
                  </p>
                </div>
              ))}
            </div>
          </>
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

      {/* Detail modal */}
      {selectedMessage && (
        <MessageModal
          message={selectedMessage}
          onClose={() => setSelectedMessage(null)}
          onMarkRead={handleMarkRead}
          onDelete={handleDelete}
          isMarkingRead={isMarkingRead}
          isDeleting={deletingId === selectedMessage.id}
        />
      )}
    </div>
  );
}
