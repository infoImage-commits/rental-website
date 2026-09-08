export type ReportType = "arrival" | "departure" | "in-house";

export type ReportFormat = "excel" | "pdf";

export type SingleDateReportType = Exclude<ReportType, "in-house">;

export type SingleDateReportRequest = {
  type: SingleDateReportType;
  format: ReportFormat;
  date: string;
};

export type RangeReportRequest = {
  type: "in-house";
  format: ReportFormat;
  from: string;
  to: string;
};

export type ReportDownloadRequest = SingleDateReportRequest | RangeReportRequest;

export type ReportDownloadResult = {
  filename: string;
};

export type ReportPreviewRequest =
  | {
      type: SingleDateReportType;
      date: string;
      pageNumber?: number;
      pageSize?: number;
    }
  | {
      type: "in-house";
      from: string;
      to: string;
      pageNumber?: number;
      pageSize?: number;
    };

export type ReportSummary = {
  totalRecords: number;
  totalNights: number;
  totalPrice: number;
};

export type ReportPreviewItem = {
  bookingId: string;
  customerName: string;
  apartmentCode: string;
  nights: number;
  checkIn: string;
  checkOut: string;
  price: number;
  source: string;
  area: string;
};

export type ReportPreviewData = {
  date?: string;
  from?: string;
  to?: string;
  summary: ReportSummary;
  items: ReportPreviewItem[];
  pageNumber: number | null;
  pageSize: number | null;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type ReportOption = {
  value: ReportType;
  label: string;
  helper: string;
  dateLabel?: string;
};
