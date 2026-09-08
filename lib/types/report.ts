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

export type ReportOption = {
  value: ReportType;
  label: string;
  helper: string;
  dateLabel?: string;
};
