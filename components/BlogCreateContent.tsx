"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useBlogs, useCreateBlog } from "@/lib/hooks/useBlog";

export default function BlogCreateContent() {
  const router = useRouter();
  const { mutate: createBlog, isPending } = useCreateBlog();
  const { data: blogsCount } = useBlogs({ PageNumber: 1, PageSize: 1 });

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [displayOrder, setDisplayOrder] = useState<number>(1);
  const [hasDisplayOrderDefault, setHasDisplayOrderDefault] = useState(false);

  useEffect(() => {
    if (hasDisplayOrderDefault || !blogsCount) return;
    setDisplayOrder((blogsCount.totalCount ?? 0) + 1);
    setHasDisplayOrderDefault(true);
  }, [blogsCount, hasDisplayOrderDefault]);

  useEffect(() => {
    if (!featuredImage) {
      setPreviewUrl("");
      return;
    }

    const url = URL.createObjectURL(featuredImage);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [featuredImage]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!title.trim()) return;

    createBlog(
      {
        title: title.trim(),
        summary: summary.trim() || undefined,
        content: content.trim() || undefined,
        featuredImage,
        isPublished,
        displayOrder,
      },
      {
        onSuccess: (response) => {
          const id = response.data?.id;
          router.push(id ? `/admin/blog/${id}` : "/admin/blog");
        },
      }
    );
  }

  return (
    <div className="mx-auto max-w-4xl min-w-0">
      <header className="mb-8">
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
          Add New Blog
        </h1>
        <p className="mt-1 text-[14px] text-[#667c74]">
          Create the main article first, then add sections from the edit page.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-[#dfe8e4] bg-white p-6 shadow-[0_8px_24px_rgba(31,77,61,0.05)] sm:p-8">
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
              placeholder="E.g. How to choose the right rental home"
              className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none transition focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Summary</label>
            <textarea
              rows={3}
              value={summary}
              onChange={(event) => setSummary(event.target.value)}
              placeholder="Short intro shown in the admin list and public cards later."
              className="w-full resize-y rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none transition focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Main Content</label>
            <textarea
              rows={9}
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="Main article content before any extra sections."
              className="w-full resize-y rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] leading-6 outline-none transition focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]"
            />
          </div>

          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-start">
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">Featured Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => setFeaturedImage(event.target.files?.[0] ?? null)}
                className="w-full rounded-xl border border-[#dfe8e4] px-4 py-2.5 text-[14px] outline-none file:mr-4 file:rounded-full file:border-0 file:bg-[#f5f7f6] file:px-4 file:py-1.5 file:text-[13px] file:font-medium file:text-[#2e6f57] focus:border-[#2e6f57]"
              />
              {featuredImage && (
                <button
                  type="button"
                  onClick={() => setFeaturedImage(null)}
                  className="mt-2 text-[12px] font-medium text-red-600 hover:underline"
                >
                  Remove selected image
                </button>
              )}
            </div>

            <div className="h-36 overflow-hidden rounded-xl border border-[#dfe8e4] bg-[#f5f7f6]">
              {previewUrl ? (
                <img src={previewUrl} alt="Featured image preview" className="h-full w-full object-cover" />
              ) : (
                <div className="grid h-full w-full place-items-center text-[13px] text-[#8a9a94]">
                  No image selected
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
                <p className="text-[14px] font-medium text-[#183c2f]">Publish immediately</p>
                <p className="text-[12px] text-[#8a9a94]">Make this blog visible when public pages are connected.</p>
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

        <div className="mt-8 flex items-center justify-end gap-3 border-t border-[#dfe8e4] pt-6">
          <Link
            href="/admin/blog"
            className="rounded-full px-5 py-2.5 text-[14px] font-medium text-[#667c74] transition hover:bg-[#f5f7f6]"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isPending || !title.trim()}
            className="inline-flex min-w-[120px] items-center justify-center gap-2 rounded-full bg-[#2e6f57] px-5 py-2.5 text-[14px] font-medium text-white transition hover:bg-[#255f49] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPending ? (
              <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              "Create Blog"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
