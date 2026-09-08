"use client";

import { useEffect, useMemo, useState } from "react";
import { useDownloadReport } from "@/lib/hooks/useReports";
import type { FormEvent } from "react";
import type {
  ReportDownloadRequest,
  ReportFormat,
  ReportOption,
  ReportType,
} from "@/lib/types/report";

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
];

const formatOptions: Array<{ value: ReportFormat; label: string }> = [
  { value: "excel", label: "Excel" },
  { value: "pdf", label: "PDF" },
];

function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}

export default function ReportsContent() {
  const today = useMemo(() => getTodayDate(), []);
  const [reportType, setReportType] = useState<ReportType>("arrival");
  const [format, setFormat] = useState<ReportFormat>("excel");
  const [date, setDate] = useState(today);
  const [from, setFrom] = useState(today);
  const [to, setTo] = useState(today);
  const [message, setMessage] = useState("");

  const { mutate: downloadReport, isPending, reset } = useDownloadReport();

  useEffect(() => {
    if (!message || !message.includes("downloading")) return;

    const timer = window.setTimeout(() => {
      setMessage("");
    }, 4000);

    return () => window.clearTimeout(timer);
  }, [message]);

  const selectedReport = reportOptions.find((option) => option.value === reportType) ?? reportOptions[0];
  const isRangeReport = reportType === "in-house";

  function validateForm() {
    if (!reportType) return "Choose a report type.";
    if (!format) return "Choose a file format.";

    if (isRangeReport) {
      if (!from) return "Choose a from date.";
      if (!to) return "Choose a to date.";
      if (to <= from) return "The to date must be after the from date.";
      return "";
    }

    if (!date) return "Choose a report date.";
    return "";
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    reset();
    setMessage("");

    const validationMessage = validateForm();
    if (validationMessage) {
      setMessage(validationMessage);
      return;
    }

    const request: ReportDownloadRequest = isRangeReport
      ? { type: "in-house", format, from, to }
      : { type: reportType, format, date };

    downloadReport(request, {
      onSuccess: ({ filename }) => {
        setMessage(`${filename} is downloading.`);
      },
      onError: (error) => {
        setMessage(error.message);
      },
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
          Download arrival, departure, and in-house booking reports.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="w-full rounded-2xl border border-[#dfe8e4] bg-white p-5 shadow-[0_8px_24px_rgba(31,77,61,0.05)] lg:p-7"
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <SelectField
            label="Report Type"
            value={reportType}
            onChange={(value) => setReportType(value as ReportType)}
            options={reportOptions.map((option) => ({
              value: option.value,
              label: option.label,
            }))}
          />
          <SelectField
            label="Format"
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
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-[#2e6f57] px-5 text-[14px] font-medium text-white shadow-sm transition hover:bg-[#255f49] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPending ? (
              <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            ) : (
              <DownloadIcon />
            )}
            {isPending ? "Preparing..." : "Download Report"}
          </button>
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
