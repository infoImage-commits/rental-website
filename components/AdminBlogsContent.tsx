"use client";

import { useState } from "react";
import Link from "next/link";
import {
  useBlogs,
  useDeleteBlog,
  useUpdateBlog,
} from "@/lib/hooks/useBlog";
import type { BlogItem, BlogsQuery } from "@/lib/types/blog";
import { resolveApiImageUrl } from "@/lib/utils/imageUrl";
import ConfirmModal from "./ConfirmModal";

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function BlogThumb({ blog }: { blog: BlogItem }) {
  const src = resolveApiImageUrl(blog.featuredImageUrl);

  return (
    <div className="h-16 w-24 overflow-hidden rounded-xl border border-[#dfe8e4] bg-[#f5f7f6]">
      {src ? (
        <img src={src} alt={blog.title} className="h-full w-full object-cover" />
      ) : (
        <div className="grid h-full w-full place-items-center text-[#8a9a94]">
          <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6.75A2.75 2.75 0 0 1 6.75 4h10.5A2.75 2.75 0 0 1 20 6.75v10.5A2.75 2.75 0 0 1 17.25 20H6.75A2.75 2.75 0 0 1 4 17.25V6.75Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="m4 16 4.2-4.2a2 2 0 0 1 2.82 0L14 14.78l1.2-1.2a2 2 0 0 1 2.82 0L20 15.56M8.5 8.5h.01" />
          </svg>
        </div>
      )}
    </div>
  );
}

export default function AdminBlogsContent() {
  const [query, setQuery] = useState<BlogsQuery>({
    PageNumber: 1,
    PageSize: 10,
    SortBy: "displayOrder",
    IsDescending: false,
  });
  const [searchInput, setSearchInput] = useState("");
  const [blogToDelete, setBlogToDelete] = useState<BlogItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data, isLoading, isError, isFetching } = useBlogs(query);
  const { mutate: updateBlog } = useUpdateBlog();
  const { mutate: deleteBlog } = useDeleteBlog();

  const blogs = data?.items ?? [];
  const totalCount = data?.totalCount ?? 0;
  const totalPages = data?.totalPages ?? 1;
  const currentPage = query.PageNumber ?? 1;

  function applySearch() {
    setQuery((current) => ({
      ...current,
      SearchTerm: searchInput.trim() || undefined,
      PageNumber: 1,
    }));
  }

  function handleFilterChange(filter: "all" | "published" | "drafts") {
    setQuery((current) => ({
      ...current,
      IsPublished: filter === "all" ? undefined : filter === "published",
      PageNumber: 1,
    }));
  }

  function handleTogglePublish(blog: BlogItem) {
    updateBlog({
      id: blog.id,
      payload: {
        title: blog.title,
        summary: blog.summary ?? undefined,
        content: blog.content ?? undefined,
        isPublished: !blog.isPublished,
        displayOrder: blog.displayOrder,
      },
    });
  }

  function confirmDelete(id: string) {
    setDeletingId(id);
    deleteBlog(id, {
      onSettled: () => {
        setDeletingId(null);
        setBlogToDelete(null);
      },
    });
  }

  return (
    <div className="w-full min-w-0">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#d9a441]">
            Content
          </p>
          <h1 className="mt-1 text-[26px] font-semibold leading-tight text-[#183c2f] lg:text-[32px]">
            Blogs
          </h1>
          <p className="mt-1 text-[14px] text-[#667c74]">
            Manage blog posts, publishing, featured images, and article sections.
          </p>
        </div>
        <Link
          href="/admin/blog/create"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#2e6f57] px-5 text-[14px] font-medium text-white shadow-sm transition hover:bg-[#255f49] hover:shadow"
        >
          <svg className="size-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 3a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H4a1 1 0 1 1 0-2h5V4a1 1 0 0 1 1-1Z" />
          </svg>
          Add Blog
        </Link>
      </header>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex min-w-[220px] flex-1 items-center gap-2 rounded-xl border border-[#dfe8e4] bg-white px-3 transition focus-within:border-[#2e6f57] focus-within:ring-2 focus-within:ring-[#2e6f57]/10">
          <svg className="size-4 shrink-0 text-[#8a9a94]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.35-4.35" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && applySearch()}
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

        <div className="flex items-center rounded-xl border border-[#dfe8e4] bg-white p-1 text-[13px]">
          {(["all", "published", "drafts"] as const).map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => handleFilterChange(filter)}
              className={`h-8 rounded-lg px-3 font-medium capitalize transition ${
                (filter === "all" && query.IsPublished === undefined) ||
                (filter === "published" && query.IsPublished === true) ||
                (filter === "drafts" && query.IsPublished === false)
                  ? "bg-[#2e6f57] text-white shadow-sm"
                  : "text-[#667c74] hover:text-[#183c2f]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {!isLoading && (
          <span className="rounded-full bg-[#f5f7f6] px-3 py-1 text-[12px] font-medium text-[#667c74]">
            {totalCount} Blog{totalCount !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      <div className="w-full overflow-hidden rounded-2xl border border-[#dfe8e4] bg-white shadow-[0_8px_24px_rgba(31,77,61,0.05)]">
        {isLoading ? (
          <div className="flex items-center justify-center py-20 text-[14px] text-[#8a9a94]">
            <span className="mr-2 inline-block size-5 animate-spin rounded-full border-2 border-[#dfe8e4] border-t-[#2e6f57]" />
            Loading blogs...
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-[15px] font-medium text-[#183c2f]">Failed to load blogs</p>
            <p className="mt-1 text-[13px] text-[#667c74]">Check your connection and try again.</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-4 grid size-16 place-items-center rounded-full bg-[#f5f7f6] text-[#8a9a94]">
              <svg className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-7A2.25 2.25 0 0 0 17.25 5H6.75A2.25 2.25 0 0 0 4.5 7.25v9.5A2.25 2.25 0 0 0 6.75 19h6.5M8 9h8M8 12h5" />
                <path strokeLinecap="round" strokeLinejoin="round" d="m16 18 2 2 3.5-4" />
              </svg>
            </div>
            <p className="text-[16px] font-medium text-[#183c2f]">No blogs found</p>
            <p className="mb-6 mt-1 max-w-sm text-[14px] text-[#667c74]">
              Create the first article and add sections once the post exists.
            </p>
            <Link
              href="/admin/blog/create"
              className="inline-flex h-9 items-center justify-center gap-2 rounded-full bg-[#2e6f57] px-4 text-[13px] font-medium text-white shadow-sm transition hover:bg-[#255f49]"
            >
              Create first blog
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-[#f0f4f2]">
            {blogs.map((blog) => (
              <div key={blog.id} className="group flex flex-col gap-4 p-5 transition hover:bg-[#f5f7f6] lg:flex-row lg:items-center">
                <BlogThumb blog={blog} />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/admin/blog/${blog.id}`}
                      className="text-[16px] font-semibold leading-snug text-[#183c2f] transition hover:text-[#2e6f57] hover:underline"
                    >
                      {blog.title}
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleTogglePublish(blog)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium transition hover:shadow-sm ${
                        blog.isPublished
                          ? "bg-[#f5f7f6] text-[#2e6f57] hover:bg-[#dfe8e4]"
                          : "bg-[#f5f7f6] text-[#667c74] hover:bg-[#dfe8e4]"
                      }`}
                    >
                      <span className={`size-1.5 rounded-full ${blog.isPublished ? "bg-[#2e6f57]" : "bg-[#8a9a94]"}`} />
                      {blog.isPublished ? "Published" : "Draft"}
                    </button>
                  </div>
                  <p className="mt-1 line-clamp-2 text-[14px] leading-relaxed text-[#667c74]">
                    {blog.summary || blog.content || "No summary yet."}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-3 text-[12px] text-[#8a9a94]">
                    <span>Order #{blog.displayOrder}</span>
                    <span>{blog.viewCount} views</span>
                    <span>{blog.blogSections.length} sections</span>
                    <span>Created {formatDate(blog.createdAtUtc)}</span>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2 lg:opacity-0 lg:transition-opacity lg:group-hover:opacity-100">
                  <Link
                    href={`/admin/blog/${blog.id}`}
                    className="flex h-8 items-center gap-1.5 rounded-lg border border-[#dfe8e4] bg-white px-3 text-[12px] font-medium text-[#2e6f57] transition hover:border-[#2e6f57] hover:bg-[#f5f7f6]"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => setBlogToDelete(blog)}
                    disabled={deletingId === blog.id}
                    className="flex h-8 items-center gap-1.5 rounded-lg border border-[#fecaca] bg-white px-3 text-[12px] font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                  >
                    {deletingId === blog.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between text-[13px]">
          <p className="text-[#667c74]">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={!data?.hasPreviousPage || isFetching}
              onClick={() => setQuery((current) => ({ ...current, PageNumber: (current.PageNumber ?? 1) - 1 }))}
              className="h-8 rounded-lg border border-[#dfe8e4] px-3 font-medium text-[#667c74] transition hover:border-[#2e6f57] hover:text-[#2e6f57] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Prev
            </button>
            <button
              type="button"
              disabled={!data?.hasNextPage || isFetching}
              onClick={() => setQuery((current) => ({ ...current, PageNumber: (current.PageNumber ?? 1) + 1 }))}
              className="h-8 rounded-lg border border-[#dfe8e4] px-3 font-medium text-[#667c74] transition hover:border-[#2e6f57] hover:text-[#2e6f57] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={!!blogToDelete}
        title="Delete Blog"
        message={`Are you sure you want to delete "${blogToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete Blog"
        onConfirm={() => blogToDelete && confirmDelete(blogToDelete.id)}
        onCancel={() => setBlogToDelete(null)}
        isPending={deletingId === blogToDelete?.id}
      />
    </div>
  );
}
