"use client";

import { useEffect } from "react";
import Image from "next/image";
import { API_BASE_URL } from "@/lib/api/config";
import {
  usePropertyBuyingImages,
  useUploadPropertyBuyingImages,
  useDeletePropertyBuyingImage,
  useSetPropertyBuyingCoverImage,
} from "@/lib/hooks/usePropertyBuying";

interface Props {
  propertyId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PropertyBuyingImagesModal({ propertyId, isOpen, onClose }: Props) {
  const { data: images = [], isLoading } = usePropertyBuyingImages(propertyId || "");
  const { mutate: upload, isPending: isUploading } = useUploadPropertyBuyingImages();
  const { mutate: setCover } = useSetPropertyBuyingCoverImage();
  const { mutate: deleteImage } = useDeletePropertyBuyingImage();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !propertyId) return null;

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const formData = new FormData();
    Array.from(e.target.files).forEach(f => formData.append("images", f));
    upload({ id: propertyId, formData }, { onSuccess: () => { e.target.value = "" } });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1f4d3d]/40 p-4 backdrop-blur-sm transition-all duration-300">
      <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#dfe8e4] px-6 py-4">
          <div>
            <h2 className="text-[18px] font-semibold text-[#183c2f]">Manage Images</h2>
            <p className="mt-0.5 text-[13px] text-[#667c74]">Hover an image to set it as cover or delete it.</p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#8a9a94] transition hover:bg-[#f5f7f6] hover:text-[#183c2f]"
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[70vh] overflow-y-auto p-6">
          <div className="mb-6 flex justify-end">
            <label className={`inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#2e6f57] px-4 py-2 text-[13px] font-medium text-white transition hover:bg-[#255f49] ${isUploading ? "opacity-50" : ""}`}>
              {isUploading ? "Uploading…" : "+ Upload Images"}
              <input type="file" multiple accept="image/*" className="hidden" onChange={handleUpload} disabled={isUploading} />
            </label>
          </div>

          {isLoading ? (
            <div className="py-10 text-center text-[#8a9a94]">Loading images…</div>
          ) : images.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#dfe8e4] py-16 text-center">
              <p className="text-[14px] text-[#8a9a94]">No images uploaded yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {images.map(img => (
                <div key={img.id} className="group relative aspect-square overflow-hidden rounded-xl border border-[#dfe8e4] bg-[#f5f7f6]">
                  <Image src={`${API_BASE_URL}/${img.imageUrl}`} alt="Property" fill className="object-cover" unoptimized />
                  {img.isCover && (
                    <span className="absolute left-2 top-2 rounded bg-white/90 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#2e6f57]">Cover</span>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                    {!img.isCover && (
                      <button onClick={() => setCover({ propertyId, imageId: img.id })} className="rounded bg-white px-2 py-1 text-[11px] font-medium text-[#183c2f] hover:bg-gray-100">Set Cover</button>
                    )}
                    <button onClick={() => deleteImage({ propertyId, imageId: img.id })} className="rounded bg-red-600 px-2 py-1 text-[11px] font-medium text-white hover:bg-red-700">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-[#dfe8e4] bg-[#f5f7f6] px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-full bg-[#1f4d3d] px-5 py-2 text-[14px] font-medium text-white transition hover:bg-[#1f4d3d]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
