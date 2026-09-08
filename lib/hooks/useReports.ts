import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/api/axiosInstance";
import type {
  ReportDownloadRequest,
  ReportDownloadResult,
  ReportFormat,
  ReportPreviewData,
  ReportPreviewRequest,
  ReportType,
} from "@/lib/types/report";

const ACCEPT_HEADERS: Record<ReportFormat, string> = {
  excel: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  pdf: "application/pdf",
};

const FILE_EXTENSIONS: Record<ReportFormat, string> = {
  excel: "xlsx",
  pdf: "pdf",
};

const REPORT_FILENAMES: Record<ReportType, string> = {
  arrival: "ArrivalReport",
  departure: "DepartureReport",
  "in-house": "InHouseReport",
};

function getReportEndpoint(request: ReportDownloadRequest) {
  return `/api/reports/${request.type}/${request.format}`;
}

function getReportParams(request: ReportDownloadRequest) {
  if (request.type === "in-house") {
    return { from: request.from, to: request.to };
  }

  return { date: request.date };
}

function getFallbackFilename(request: ReportDownloadRequest) {
  const extension = FILE_EXTENSIONS[request.format];

  if (request.type === "in-house") {
    return `${REPORT_FILENAMES[request.type]}_${request.from}_to_${request.to}.${extension}`;
  }

  return `${REPORT_FILENAMES[request.type]}_${request.date}.${extension}`;
}

function parseContentDispositionFilename(header: string | undefined) {
  if (!header) return null;

  const encodedMatch = header.match(/filename\*=UTF-8''([^;]+)/i);
  if (encodedMatch?.[1]) {
    try {
      return decodeURIComponent(encodedMatch[1].trim());
    } catch {
      return encodedMatch[1].trim();
    }
  }

  const filenameMatch = header.match(/filename="?([^";]+)"?/i);
  return filenameMatch?.[1]?.trim() || null;
}

function downloadBlob(blob: Blob, filename: string) {
  if (typeof window === "undefined") return;

  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();

  window.setTimeout(() => window.URL.revokeObjectURL(url), 0);
}

function getMessageFromData(data: unknown) {
  if (!data || typeof data !== "object") return null;

  const possibleError = data as {
    message?: unknown;
    title?: unknown;
    error?: unknown;
    errors?: unknown;
  };

  if (typeof possibleError.message === "string") return possibleError.message;
  if (typeof possibleError.title === "string") return possibleError.title;
  if (typeof possibleError.error === "string") return possibleError.error;

  if (possibleError.errors && typeof possibleError.errors === "object") {
    const firstValue = Object.values(possibleError.errors)[0];
    if (Array.isArray(firstValue) && typeof firstValue[0] === "string") {
      return firstValue[0];
    }
  }

  return null;
}

async function getDownloadErrorMessage(error: unknown) {
  const responseData = (error as { response?: { data?: unknown } })?.response?.data;

  if (responseData instanceof Blob) {
    const text = await responseData.text();
    if (!text.trim()) return "Failed to download the report.";

    try {
      return getMessageFromData(JSON.parse(text)) ?? text;
    } catch {
      return text;
    }
  }

  const apiMessage = getMessageFromData(responseData);
  if (apiMessage) return apiMessage;

  if (error instanceof Error) return error.message;

  return "Failed to download the report.";
}

export function useDownloadReport() {
  return useMutation<ReportDownloadResult, Error, ReportDownloadRequest>({
    mutationFn: async (request) => {
      try {
        const response = await axiosInstance.get<Blob>(getReportEndpoint(request), {
          params: getReportParams(request),
          responseType: "blob",
          headers: {
            Accept: ACCEPT_HEADERS[request.format],
          },
        });

        const disposition = String(response.headers["content-disposition"] ?? "");
        const filename =
          parseContentDispositionFilename(disposition) ?? getFallbackFilename(request);

        downloadBlob(response.data, filename);

        return { filename };
      } catch (error) {
        throw new Error(await getDownloadErrorMessage(error));
      }
    },
  });
}

export function useReportPreview(request: ReportPreviewRequest | null) {
  return useQuery({
    queryKey: ["reports", "preview", request],
    queryFn: async () => {
      if (!request) return null;

      const params =
        request.type === "in-house"
          ? {
              from: request.from,
              to: request.to,
              pageNumber: request.pageNumber,
              pageSize: request.pageSize,
            }
          : {
              date: request.date,
              pageNumber: request.pageNumber,
              pageSize: request.pageSize,
            };

      const { data } = await axiosInstance.get<{
        data: ReportPreviewData | null;
        isSuccess: boolean;
        message: string | null;
        errors: string[];
        type: number;
      }>(`/api/reports/${request.type}`, { params });

      if (!data.isSuccess || !data.data) {
        throw new Error(data.errors?.[0] || data.message || "Could not load report preview.");
      }

      return data.data;
    },
    enabled: Boolean(request),
    staleTime: 30 * 1000,
  });
}
