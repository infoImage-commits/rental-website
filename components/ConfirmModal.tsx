export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  isPending = false,
}: {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isPending?: boolean;
}) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/40 transition-opacity"
        onClick={() => {
          if (!isPending) onCancel();
        }}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-6 shadow-2xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="grid size-12 shrink-0 place-items-center rounded-full bg-red-50 text-red-600">
            <svg
              className="size-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-[18px] font-semibold text-[#183c2f]">
              {title}
            </h3>
          </div>
        </div>

        <p className="mb-6 text-[14px] leading-relaxed text-[#667c74]">
          {message}
        </p>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            disabled={isPending}
            onClick={onCancel}
            className="rounded-full px-4 py-2 text-[14px] font-medium text-[#667c74] transition hover:bg-[#f5f7f6] disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            type="button"
            disabled={isPending}
            onClick={onConfirm}
            className="inline-flex min-w-[90px] items-center justify-center rounded-full bg-red-600 px-4 py-2 text-[14px] font-medium text-white transition hover:bg-red-700 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </>
  );
}
