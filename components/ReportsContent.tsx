"use client";

import { useEffect, useMemo, useState } from "react";
import { useDownloadReport, useReportPreview, useCancelledBookingsPreview } from "@/lib/hooks/useReports";
import { formatUsd } from "@/lib/utils/currency";
import type { FormEvent } from "react";
import type {
  ReportDownloadRequest,
  ReportFormat,
  ReportOption,
  ReportPreviewRequest,
  ReportType,
  CancelledBookingItem,
} from "@/lib/types/report";

const PAGE_SIZE = 50;

const reportOptions: ReportOption[] = [
  {
    value: "arrival",
    label: "Arrival",
    helper: "Bookings with check-in on this date.",
    dateLabel: "Arrival Date",
  },
  {
    value: "departure",
    label: "Departure",
    helper: "Bookings with check-out on this date.",
    dateLabel: "Departure Date",
  },
  {
    value: "in-house",
    label: "In-House",
    helper: "Actual checked-in guests who have not checked out during this range.",
  },
  {
    value: "cancelled",
    label: "Cancelled Bookings",
    helper: "All bookings cancelled within the selected date range.",
  },
];

const formatOptions: Array<{ value: ReportFormat; label: string }> = [
  { value: "excel", label: "Excel" },
  { value: "pdf", label: "PDF" },
];

function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}

function formatDate(value?: string | null) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("en", { year: "numeric", month: "short", day: "2-digit" }).format(new Date(value));
}

function money(value: number) {
  return formatUsd(value);
}

export default function ReportsContent() {
  const today = useMemo(() => getTodayDate(), []);
  const [reportType, setReportType] = useState<ReportType>("arrival");
  const [format, setFormat] = useState<ReportFormat>("excel");
  const [date, setDate] = useState(today);
  const [from, setFrom] = useState(today);
  const [to, setTo] = useState(today);
  const [message, setMessage] = useState("");
  const [previewRequest, setPreviewRequest] = useState<ReportPreviewRequest | null>(null);
  const [cancelledPreviewParams, setCancelledPreviewParams] = useState<{ fromDate: string; toDate: string } | null>(null);

  const { mutate: downloadReport, isPending: isDownloading, reset } = useDownloadReport();
  const { data: preview, isLoading: isLoadingPreview, isError: isPreviewError } = useReportPreview(reportType !== "cancelled" ? previewRequest : null);
  const { data: cancelledPreview, isLoading: isLoadingCancelled, isError: isCancelledError } = useCancelledBookingsPreview(reportType === "cancelled" ? cancelledPreviewParams : null);

  const isRangeReport = reportType === "in-house" || reportType === "cancelled";
  const isCancelledReport = reportType === "cancelled";

  useEffect(() => {
    if (!message || !message.includes("downloading")) return;
    const timer = window.setTimeout(() => {
      setMessage("");
    }, 4000);
    return () => window.clearTimeout(timer);
  }, [message]);

  const selectedReport = reportOptions.find((option) => option.value === reportType) ?? reportOptions[0];
  const rows = preview?.items ?? [];
  const cancelledRows = cancelledPreview?.items ?? [];

  function validateForm() {
    if (!reportType) return "Choose a report type.";
    if (isRangeReport) {
      if (!from) return "Choose a from date.";
      if (!to) return "Choose a to date.";
      if (to <= from) return "The to date must be after the from date.";
      return "";
    }

    if (!date) return "Choose a report date.";
    return "";
  }

  function buildPreviewRequest(pageNumber = 1): ReportPreviewRequest {
    if (isRangeReport) {
      return { type: reportType as "in-house" | "cancelled", from, to, pageNumber, pageSize: PAGE_SIZE };
    }
    return { type: reportType as "arrival" | "departure", date, pageNumber, pageSize: PAGE_SIZE };
  }

  function buildDownloadRequest(): ReportDownloadRequest {
    if (isRangeReport) {
      return { type: reportType as "in-house" | "cancelled", format, from, to };
    }
    return { type: reportType as "arrival" | "departure", format, date };
  }

  function handlePreview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    const validationMessage = validateForm();
    if (validationMessage) { setMessage(validationMessage); return; }

    if (isCancelledReport) {
      setCancelledPreviewParams({ fromDate: from, toDate: to });
    } else {
      setPreviewRequest(buildPreviewRequest(1));
    }
  }

  function handleDownload() {
    reset();
    setMessage("");

    const validationMessage = validateForm();
    if (validationMessage) {
      setMessage(validationMessage);
      return;
    }

    downloadReport(buildDownloadRequest(), {
      onSuccess: ({ filename }) => {
        setMessage(`${filename} is downloading.`);
      },
      onError: (error) => {
        setMessage(error.message);
      },
    });
  }

  function goToPage(pageNumber: number) {
    setPreviewRequest((current) => {
      const nextBase = current ?? buildPreviewRequest(pageNumber);
      return { ...nextBase, pageNumber };
    });
  }

  return (
    <div className="w-full min-w-0">
      <header className="mb-6">
        <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#d9a441]">
          Management
        </p>
        <h1 className="mt-1 text-[26px] font-semibold leading-tight text-[#183c2f] lg:text-[32px]">
          Reports
        </h1>
        <p className="mt-1 max-w-2xl text-[14px] leading-6 text-[#667c74]">
          Preview arrival, departure, and in-house booking reports, then download files when needed.
        </p>
      </header>

      <form
        onSubmit={handlePreview}
        className="w-full rounded-2xl border border-[#dfe8e4] bg-white p-5 shadow-[0_8px_24px_rgba(31,77,61,0.05)] lg:p-7"
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <SelectField
            label="Report Type"
            value={reportType}
            onChange={(value) => {
              setReportType(value as ReportType);
              setPreviewRequest(null);
              setCancelledPreviewParams(null);
            }}
            options={reportOptions.map((option) => ({
              value: option.value,
              label: option.label,
            }))}
          />
          <SelectField
            label="Download Format"
            value={format}
            onChange={(value) => setFormat(value as ReportFormat)}
            options={formatOptions}
          />
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {isRangeReport ? (
            <>
              <DateField label="From Date" value={from} onChange={setFrom} />
              <DateField label="To Date" value={to} onChange={setTo} />
            </>
          ) : (
            <DateField
              label={selectedReport.dateLabel ?? "Report Date"}
              value={date}
              onChange={setDate}
            />
          )}
        </div>

        <div className="mt-6 flex flex-col gap-4 rounded-xl bg-[#f5f7f6] px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] leading-5 text-[#667c74]">{selectedReport.helper}</p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="submit"
              disabled={isLoadingPreview}
              className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-[#2e6f57] px-5 text-[14px] font-medium text-white shadow-sm transition hover:bg-[#255f49] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoadingPreview ? "Generating..." : "Generate Preview"}
            </button>
            <button
              type="button"
              onClick={handleDownload}
              disabled={isDownloading}
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-[#dfe8e4] bg-white px-5 text-[14px] font-medium text-[#183c2f] shadow-sm transition hover:border-[#2e6f57] hover:bg-[#f8faf9] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isDownloading ? (
                <span className="size-4 animate-spin rounded-full border-2 border-[#dfe8e4] border-t-[#2e6f57]" />
              ) : (
                <DownloadIcon />
              )}
              {isDownloading ? "Preparing..." : "Download"}
            </button>
          </div>
        </div>

        {message && (
          <p
            className={`mt-4 rounded-xl px-4 py-3 text-[13px] transition-all duration-300 ${
              message.includes("downloading")
                ? "bg-[#eff8f3] text-[#2e6f57]"
                : "bg-red-50 text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>

      {(isCancelledReport ? cancelledPreviewParams : previewRequest) && (
        <section className="mt-6">
          {isCancelledReport ? (
            <>
              {/* Cancelled Report Summary */}
              {cancelledPreview && (
                <div className="mb-4 grid gap-3 sm:grid-cols-4">
                  <Metric label="Total Records" value={String(cancelledPreview.summary.totalRecords)} />
                  <Metric label="Total Amount" value={formatUsd(cancelledPreview.summary.totalAmount)} />
                  <Metric label="Total Paid" value={formatUsd(cancelledPreview.summary.totalPaid)} />
                  <Metric label="Remaining" value={formatUsd(cancelledPreview.summary.totalRemaining)} />
                </div>
              )}
              {cancelledPreview && (
                <div className="mb-4 grid gap-3 sm:grid-cols-3">
                  <Metric label="Fully Paid Cancellations" value={String(cancelledPreview.summary.fullyPaidCancellations)} />
                  <Metric label="Partially Paid" value={String(cancelledPreview.summary.partiallyPaidCancellations)} />
                  <Metric label="Unpaid" value={String(cancelledPreview.summary.unpaidCancellations)} />
                </div>
              )}
              <div className="overflow-hidden rounded-2xl border border-[#dfe8e4] bg-white shadow-[0_8px_24px_rgba(31,77,61,0.05)]">
                <div className="border-b border-[#dfe8e4] bg-[#f8faf9] px-5 py-4">
                  <h2 className="text-[18px] font-semibold text-[#183c2f]">Cancelled Bookings Preview</h2>
                  <p className="mt-1 text-[13px] text-[#667c74]">{formatDate(from)} - {formatDate(to)}</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[960px] text-left text-[14px]">
                    <thead className="bg-[#f5f7f6] text-[12px] font-semibold uppercase tracking-[0.08em] text-[#667c74]">
                      <tr>
                        <th className="px-5 py-3">Customer</th>
                        <th className="px-5 py-3">Property</th>
                        <th className="px-5 py-3">Stay</th>
                        <th className="px-5 py-3 text-right">Nights</th>
                        <th className="px-5 py-3">Source</th>
                        <th className="px-5 py-3 text-right">Paid</th>
                        <th className="px-5 py-3 text-right">Remaining</th>
                        <th className="px-5 py-3">Reason</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#edf2ef]">
                      {isLoadingCancelled ? (
                        <tr><td colSpan={8} className="py-20 text-center text-[14px] text-[#8a9a94]">Loading...</td></tr>
                      ) : isCancelledError ? (
                        <tr><td colSpan={8} className="py-20 text-center text-red-600">Failed to load report.</td></tr>
                      ) : cancelledRows.length === 0 ? (
                        <tr><td colSpan={8} className="py-20 text-center text-[14px] text-[#8a9a94]">No cancellations found.</td></tr>
                      ) : cancelledRows.map((item: CancelledBookingItem) => (
                        <tr key={item.bookingId} className="transition hover:bg-[#f8faf9]">
                          <td className="px-5 py-4 font-semibold text-[#183c2f]">{item.customerName}</td>
                          <td className="px-5 py-4 text-[#667c74]">{item.propertyName}</td>
                          <td className="px-5 py-4 text-[13px] text-[#667c74]">{formatDate(item.checkIn)} - {formatDate(item.checkOut)}</td>
                          <td className="px-5 py-4 text-right font-semibold text-[#183c2f]">{item.nights}</td>
                          <td className="px-5 py-4 text-[#667c74]">{item.bookingSourceName || "-"}</td>
                          <td className="px-5 py-4 text-right text-[#183c2f]">{formatUsd(item.paidAmount)}</td>
                          <td className="px-5 py-4 text-right text-[#183c2f]">{formatUsd(item.remainingAmount)}</td>
                          <td className="px-5 py-4 text-[13px] text-[#667c74]">{item.cancellationReason || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="overflow-hidden rounded-2xl border border-[#dfe8e4] bg-white shadow-[0_8px_24px_rgba(31,77,61,0.05)]">
                <div className="border-b border-[#dfe8e4] bg-[#f8faf9] px-5 py-4">
                  <h2 className="text-[18px] font-semibold text-[#183c2f]">{selectedReport.label} Preview</h2>
              <p className="mt-1 text-[13px] text-[#667c74]">
                {preview?.date
                  ? formatDate(preview.date)
                  : `${formatDate(preview?.from)} - ${formatDate(preview?.to)}`}
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[960px] text-left text-[14px]">
                <thead className="bg-[#f5f7f6] text-[12px] font-semibold uppercase tracking-[0.08em] text-[#667c74]">
                  <tr>
                    <th className="px-5 py-3">Customer</th>
                    <th className="px-5 py-3">Apartment</th>
                    <th className="px-5 py-3">Area</th>
                    <th className="px-5 py-3">Stay</th>
                    <th className="px-5 py-3 text-right">Nights</th>
                    <th className="px-5 py-3 text-right">Price</th>
                    <th className="px-5 py-3">Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#edf2ef]">
                  {isLoadingPreview ? (
                    <tr>
                      <td colSpan={7} className="py-20 text-center text-[14px] text-[#8a9a94]">
                        Loading report preview...
                      </td>
                    </tr>
                  ) : isPreviewError ? (
                    <tr>
                      <td colSpan={7} className="py-20 text-center text-[#183c2f]">
                        Failed to load report preview.
                      </td>
                    </tr>
                  ) : rows.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-24 text-center">
                        <p className="text-[16px] font-medium text-[#183c2f]">No records found</p>
                        <p className="mt-1 text-[14px] text-[#667c74]">Try a different date or range.</p>
                      </td>
                    </tr>
                  ) : (
                    rows.map((item) => (
                      <tr key={item.bookingId} className="transition hover:bg-[#f8faf9]">
                        <td className="px-5 py-4 font-semibold text-[#183c2f]">{item.customerName}</td>
                        <td className="px-5 py-4 font-mono text-[12px] text-[#414847]">{item.apartmentCode}</td>
                        <td className="px-5 py-4 text-[#667c74]">{item.area || "-"}</td>
                        <td className="px-5 py-4 text-[13px] text-[#667c74]">
                          {formatDate(item.checkIn)} - {formatDate(item.checkOut)}
                        </td>
                        <td className="px-5 py-4 text-right font-semibold text-[#183c2f]">{item.nights}</td>
                        <td className="px-5 py-4 text-right font-semibold text-[#183c2f]">{money(item.price)}</td>
                        <td className="px-5 py-4 text-[#667c74]">{item.source || "-"}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {preview && preview.totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => goToPage(Math.max(1, preview.pageNumber ?? 1) - 1)}
                disabled={!preview.hasPreviousPage}
                className="flex h-8 items-center justify-center rounded-lg border border-[#dfe8e4] bg-white px-3 text-[13px] font-medium text-[#667c74] transition hover:bg-[#f5f7f6] disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-[13px] font-medium text-[#667c74]">
                Page {preview.pageNumber ?? 1} of {preview.totalPages}
              </span>
              <button
                type="button"
                onClick={() => goToPage((preview.pageNumber ?? 1) + 1)}
                disabled={!preview.hasNextPage}
                className="flex h-8 items-center justify-center rounded-lg border border-[#dfe8e4] bg-white px-3 text-[13px] font-medium text-[#667c74] transition hover:bg-[#f5f7f6] disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
          </>
        )}
      </section>
    )}
    </div>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-xl border border-[#dfe8e4] bg-white px-4 text-[14px] text-[#183c2f] outline-none transition focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function DateField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-[#183c2f]">{label}</span>
      <input
        type="date"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-xl border border-[#dfe8e4] bg-white px-4 text-[14px] text-[#183c2f] outline-none transition focus:border-[#2e6f57] focus:ring-1 focus:ring-[#2e6f57]"
      />
    </label>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[#dfe8e4] bg-white p-5 shadow-[0_8px_24px_rgba(31,77,61,0.04)]">
      <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#8a9a94]">{label}</p>
      <p className="mt-2 text-[24px] font-semibold text-[#183c2f]">{value}</p>
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}
