"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useBlogById,
  useCreateBlogSection,
  useDeleteBlogSection,
  useUpdateBlog,
  useUpdateBlogSection,
} from "@/lib/hooks/useBlog";
import type { BlogSection } from "@/lib/types/blog";
import { resolveApiImageUrl } from "@/lib/utils/imageUrl";
import ConfirmModal from "./ConfirmModal";

function SectionFormPanel({
  blogId,
  section,
  isOpen,
  nextDisplayOrder,
  onClose,
  onSaved,
}: {
  blogId: string;
  section: BlogSection | null;
  isOpen: boolean;
  nextDisplayOrder: number;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEditing = !!section;
  const { mutate: createSection, isPending: isCreating } = useCreateBlogSection();
  const { mutate: updateSection, isPending: isUpdating } = useUpdateBlogSection();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [displayOrder, setDisplayOrder] = useState<number>(1);
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [removeImage, setRemoveImage] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTitle(section?.title ?? "");
      setContent(section?.content ?? "");
      setDisplayOrder(section?.displayOrder ?? nextDisplayOrder);
      setImage(null);
      setRemoveImage(false);
    }
  }, [isOpen, nextDisplayOrder, section]);

  useEffect(() => {
    if (!image) {
      setPreviewUrl("");
      return;
    }

    const url = URL.createObjectURL(image);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);

  if (!isOpen) return null;

  const isSaving = isCreating || isUpdating;
  const existingImageUrl = !removeImage ? resolveApiImageUrl(section?.imageUrl) : "";
  const isValid = title.trim().length > 0 && content.trim().length > 0;

  function handleSave(event: React.FormEvent) {
    event.preventDefault();
    if (!isValid) return;

    const payload = {
      title: title.trim(),
      content: content.trim(),
      image,
      removeImage,
      displayOrder,
      sectionType: "text",
    };

    if (isEditing && section) {
      updateSection(
        { blogId, sectionId: section.id, payload },
        { onSuccess: onSaved }
      );
      return;
    }

    createSection(
      { blogId, payload },
      { onSuccess: onSaved }
    );
  }

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xl flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#dfe8e4] px-6 py-4">
          <h2 className="text-[18px] font-semibold text-[#183c2f]">
            {isEditing ? "Edit Section" : "New Section"}
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

        <form onSubmit={handleSave} className="flex-1 space-y-5 overflow-y-auto px-6 py-6">
          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none transition focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">
              Content <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={7}
              value={content}
              onChange={(event) => setContent(event.target.value)}
              className="w-full resize-y rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] leading-6 outline-none transition focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Display Order</label>
            <input
              type="number"
              min={0}
              value={displayOrder}
              onChange={(event) => setDisplayOrder(Number(event.target.value) || 0)}
              className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none transition focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Section Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => {
                setImage(event.target.files?.[0] ?? null);
                setRemoveImage(false);
              }}
              className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none file:mr-4 file:rounded-full file:border-0 file:bg-[#f5f7f6] file:px-4 file:py-1.5 file:text-[13px] file:font-medium file:text-[#2e6f57] focus:border-[#2e6f57]"
            />
            {(previewUrl || existingImageUrl) && (
              <div className="mt-3 overflow-hidden rounded-xl border border-[#dfe8e4] bg-[#f5f7f6]">
                <img
                  src={previewUrl || existingImageUrl}
                  alt="Section image preview"
                  className="h-40 w-full object-cover"
                />
              </div>
            )}
            <div className="mt-2 flex items-center gap-4">
              {image && (
                <button
                  type="button"
                  onClick={() => setImage(null)}
                  className="text-[12px] font-medium text-red-600 hover:underline"
                >
                  Remove selected image
                </button>
              )}
              {isEditing && section?.imageUrl && !removeImage && (
                <button
                  type="button"
                  onClick={() => {
                    setImage(null);
                    setRemoveImage(true);
                  }}
                  className="text-[12px] font-medium text-red-600 hover:underline"
                >
                  Remove current image
                </button>
              )}
              {removeImage && (
                <button
                  type="button"
                  onClick={() => setRemoveImage(false)}
                  className="text-[12px] font-medium text-[#2e6f57] hover:underline"
                >
                  Keep current image
                </button>
              )}
            </div>
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
              type="button"
              onClick={handleSave}
              disabled={isSaving || !isValid}
              className="inline-flex min-w-[120px] items-center justify-center gap-2 rounded-full bg-[#2e6f57] px-5 py-2.5 text-[14px] font-medium text-white transition hover:bg-[#255f49] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSaving ? (
                <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : isEditing ? (
                "Save Section"
              ) : (
                "Create Section"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function BlogEditContent({ id }: { id: string }) {
  const router = useRouter();
  const { data: blog, isLoading, isError } = useBlogById(id, false);
  const { mutate: updateBlog, isPending: isUpdatingBlog } = useUpdateBlog();
  const { mutate: deleteSection } = useDeleteBlogSection();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [removeFeaturedImage, setRemoveFeaturedImage] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [displayOrder, setDisplayOrder] = useState<number>(1);
  const [isSectionPanelOpen, setIsSectionPanelOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<BlogSection | null>(null);
  const [sectionToDelete, setSectionToDelete] = useState<BlogSection | null>(null);
  const [deletingSectionId, setDeletingSectionId] = useState<string | null>(null);
  const [initializedBlogId, setInitializedBlogId] = useState<string | null>(null);

  useEffect(() => {
    if (!blog) return;
    if (initializedBlogId === blog.id) return;
    setTitle(blog.title);
    setSummary(blog.summary ?? "");
    setContent(blog.content ?? "");
    setIsPublished(blog.isPublished);
    setDisplayOrder(blog.displayOrder);
    setFeaturedImage(null);
    setRemoveFeaturedImage(false);
    setInitializedBlogId(blog.id);
  }, [blog, initializedBlogId]);

  useEffect(() => {
    if (!featuredImage) {
      setPreviewUrl("");
      return;
    }

    const url = URL.createObjectURL(featuredImage);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [featuredImage]);

  const sections = useMemo(() => {
    return [...(blog?.blogSections ?? [])].sort((a, b) => a.displayOrder - b.displayOrder);
  }, [blog?.blogSections]);
  const nextSectionOrder = sections.reduce((max, section) => Math.max(max, section.displayOrder), 0) + 1;

  const currentFeaturedUrl = !removeFeaturedImage ? resolveApiImageUrl(blog?.featuredImageUrl) : "";
  const isBlogValid = title.trim().length > 0;

  function handleSaveBlog(event: React.FormEvent) {
    event.preventDefault();
    if (!isBlogValid) return;

    updateBlog(
      {
        id,
        payload: {
          title: title.trim(),
          summary: summary.trim() || undefined,
          content: content.trim() || undefined,
          featuredImage,
          removeFeaturedImage,
          isPublished,
          displayOrder,
        },
      },
      {
        onSuccess: () => router.push("/admin/blog"),
      }
    );
  }

  function openCreateSection() {
    setEditingSection(null);
    setIsSectionPanelOpen(true);
  }

  function openEditSection(section: BlogSection) {
    setEditingSection(section);
    setIsSectionPanelOpen(true);
  }

  function confirmDeleteSection(sectionId: string) {
    setDeletingSectionId(sectionId);
    deleteSection(
      { blogId: id, sectionId },
      {
        onSettled: () => {
          setDeletingSectionId(null);
          setSectionToDelete(null);
        },
      }
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24 text-[14px] text-[#8a9a94]">
        <span className="mr-2 inline-block size-5 animate-spin rounded-full border-2 border-[#dfe8e4] border-t-[#2e6f57]" />
        Loading blog...
      </div>
    );
  }

  if (isError || !blog) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-[#dfe8e4] bg-white p-8 text-center shadow-[0_8px_24px_rgba(31,77,61,0.05)]">
        <p className="text-[18px] font-semibold text-[#183c2f]">Blog not found</p>
        <p className="mt-2 text-[14px] text-[#667c74]">The selected blog could not be loaded.</p>
        <Link
          href="/admin/blog"
          className="mt-6 inline-flex h-10 items-center justify-center rounded-full bg-[#2e6f57] px-5 text-[14px] font-medium text-white transition hover:bg-[#255f49]"
        >
          Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl min-w-0">
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link href="/admin/blog" className="mb-4 inline-flex items-center gap-2 text-[13px] font-medium text-[#667c74] hover:text-[#183c2f]">
            <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19 3 12m0 0 7-7m-7 7h18" />
            </svg>
            Back to Blogs
          </Link>
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#d9a441]">
            Content
          </p>
          <h1 className="mt-1 text-[26px] font-semibold leading-tight text-[#183c2f] lg:text-[32px]">
            Edit Blog
          </h1>
          <p className="mt-1 text-[14px] text-[#667c74]">
            Update article details and manage content sections.
          </p>
        </div>
        <span className={`inline-flex rounded-full px-3 py-1 text-[12px] font-medium ${blog.isPublished ? "bg-[#f5f7f6] text-[#2e6f57]" : "bg-[#f5f7f6] text-[#667c74]"}`}>
          {blog.isPublished ? "Published" : "Draft"}
        </span>
      </header>

      <form
        id="blog-edit-form"
        onSubmit={handleSaveBlog}
        className="rounded-2xl border border-[#dfe8e4] bg-white p-6 shadow-[0_8px_24px_rgba(31,77,61,0.05)] sm:p-8"
      >
        <div className="grid gap-6">
          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none transition focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Summary</label>
            <textarea
              rows={3}
              value={summary}
              onChange={(event) => setSummary(event.target.value)}
              className="w-full resize-y rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none transition focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Main Content</label>
            <textarea
              rows={9}
              value={content}
              onChange={(event) => setContent(event.target.value)}
              className="w-full resize-y rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] leading-6 outline-none transition focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]"
            />
          </div>

          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-start">
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Featured Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  setFeaturedImage(event.target.files?.[0] ?? null);
                  setRemoveFeaturedImage(false);
                }}
                className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none file:mr-4 file:rounded-full file:border-0 file:bg-[#f5f7f6] file:px-4 file:py-1.5 file:text-[13px] file:font-medium file:text-[#2e6f57] focus:border-[#2e6f57]"
              />
              <div className="mt-2 flex flex-wrap gap-4">
                {featuredImage && (
                  <button
                    type="button"
                    onClick={() => setFeaturedImage(null)}
                    className="text-[12px] font-medium text-red-600 hover:underline"
                  >
                    Remove selected image
                  </button>
                )}
                {blog.featuredImageUrl && !removeFeaturedImage && (
                  <button
                    type="button"
                    onClick={() => {
                      setFeaturedImage(null);
                      setRemoveFeaturedImage(true);
                    }}
                    className="text-[12px] font-medium text-red-600 hover:underline"
                  >
                    Remove current image
                  </button>
                )}
                {removeFeaturedImage && (
                  <button
                    type="button"
                    onClick={() => setRemoveFeaturedImage(false)}
                    className="text-[12px] font-medium text-[#2e6f57] hover:underline"
                  >
                    Keep current image
                  </button>
                )}
              </div>
            </div>

            <div className="h-40 overflow-hidden rounded-xl border border-[#dfe8e4] bg-[#f5f7f6]">
              {previewUrl || currentFeaturedUrl ? (
                <img
                  src={previewUrl || currentFeaturedUrl}
                  alt="Featured image preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="grid h-full w-full place-items-center text-[13px] text-[#8a9a94]">
                  No featured image
                </div>
              )}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Display Order</label>
              <input
                type="number"
                min={0}
                value={displayOrder}
                onChange={(event) => setDisplayOrder(Number(event.target.value) || 0)}
                className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none transition focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]"
              />
            </div>

            <div className="flex items-center justify-between rounded-xl border border-[#dfe8e4] p-4">
              <div>
                <p className="text-[14px] font-medium text-[#183c2f]">Published</p>
                <p className="text-[12px] text-[#8a9a94]">Controls visibility for this blog.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsPublished((value) => !value)}
                className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition focus:outline-none focus:ring-2 focus:ring-[#2e6f57] focus:ring-offset-2 ${
                  isPublished ? "bg-[#2e6f57]" : "bg-[#dfe8e4]"
                }`}
              >
                <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition ${isPublished ? "translate-x-6" : "translate-x-1"}`} />
              </button>
            </div>
          </div>
        </div>

      </form>

      <section className="mt-8 rounded-2xl border border-[#dfe8e4] bg-white shadow-[0_8px_24px_rgba(31,77,61,0.05)]">
        <div className="flex flex-col gap-4 border-b border-[#dfe8e4] p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-[20px] font-semibold text-[#183c2f]">Sections</h2>
            <p className="mt-1 text-[14px] text-[#667c74]">
              Add supporting blocks for long-form content.
            </p>
          </div>
          <button
            type="button"
            onClick={openCreateSection}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#2e6f57] px-5 text-[14px] font-medium text-white shadow-sm transition hover:bg-[#255f49] hover:shadow"
          >
            <svg className="size-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 3a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H4a1 1 0 1 1 0-2h5V4a1 1 0 0 1 1-1Z" />
            </svg>
            Add Section
          </button>
        </div>

        {sections.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="mb-4 grid size-14 place-items-center rounded-full bg-[#f5f7f6] text-[#8a9a94]">
              <svg className="size-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6.75A2.75 2.75 0 0 1 6.75 4h10.5A2.75 2.75 0 0 1 20 6.75v10.5A2.75 2.75 0 0 1 17.25 20H6.75A2.75 2.75 0 0 1 4 17.25V6.75Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 9h8M8 12h5" />
              </svg>
            </div>
            <p className="text-[16px] font-medium text-[#183c2f]">No sections yet</p>
            <p className="mt-1 text-[14px] text-[#667c74]">Add the first section to build out the article.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#f0f4f2]">
            {sections.map((section) => {
              const sectionImageUrl = resolveApiImageUrl(section.imageUrl);

              return (
                <div key={section.id} className="group flex flex-col gap-4 p-5 transition hover:bg-[#f5f7f6] lg:flex-row lg:items-start">
                  <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#f5f7f6] text-[13px] font-semibold text-[#2e6f57]">
                    #{section.displayOrder}
                  </div>

                  {sectionImageUrl && (
                    <img
                      src={sectionImageUrl}
                      alt={section.title}
                      className="h-20 w-28 shrink-0 rounded-xl border border-[#dfe8e4] object-cover"
                    />
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-[15px] font-semibold text-[#183c2f]">{section.title}</h3>
                    </div>
                    <p className="mt-1 line-clamp-2 text-[14px] leading-relaxed text-[#667c74]">
                      {section.content}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2 lg:opacity-0 lg:transition-opacity lg:group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={() => openEditSection(section)}
                      className="flex h-8 items-center gap-1.5 rounded-lg border border-[#dfe8e4] bg-white px-3 text-[12px] font-medium text-[#2e6f57] transition hover:border-[#2e6f57] hover:bg-[#f5f7f6]"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => setSectionToDelete(section)}
                      disabled={deletingSectionId === section.id}
                      className="flex h-8 items-center gap-1.5 rounded-lg border border-[#fecaca] bg-white px-3 text-[12px] font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                    >
                      {deletingSectionId === section.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <SectionFormPanel
        blogId={id}
        section={editingSection}
        isOpen={isSectionPanelOpen}
        nextDisplayOrder={nextSectionOrder}
        onClose={() => setIsSectionPanelOpen(false)}
        onSaved={() => setIsSectionPanelOpen(false)}
      />

      <div className="mt-8 rounded-2xl border border-[#dfe8e4] bg-white p-5 shadow-[0_8px_24px_rgba(31,77,61,0.05)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          <Link
            href="/admin/blog"
            className="inline-flex h-10 items-center justify-center rounded-full px-5 text-[14px] font-medium text-[#667c74] transition hover:bg-[#f5f7f6]"
          >
            Cancel
          </Link>
          <button
            type="submit"
            form="blog-edit-form"
            disabled={isUpdatingBlog || !isBlogValid}
            className="inline-flex h-10 min-w-[140px] items-center justify-center gap-2 rounded-full bg-[#2e6f57] px-5 text-[14px] font-medium text-white transition hover:bg-[#255f49] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isUpdatingBlog ? (
              <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              "Save Blog"
            )}
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={!!sectionToDelete}
        title="Delete Section"
        message={`Are you sure you want to delete "${sectionToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete Section"
        onConfirm={() => sectionToDelete && confirmDeleteSection(sectionToDelete.id)}
        onCancel={() => setSectionToDelete(null)}
        isPending={deletingSectionId === sectionToDelete?.id}
      />
    </div>
  );
}
