"use client";

import * as React from "react";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";

type ExportFormat = "csv" | "json";

interface ExportButtonProps<TRecord extends Record<string, unknown>> {
  data: TRecord[];
  filename?: string;
  formats?: ExportFormat[];
  label?: string;
}

function toCsv<TRecord extends Record<string, unknown>>(data: TRecord[]) {
  if (data.length === 0) return "";
  const headers = Object.keys(data[0]);
  const rows = data.map((row) =>
    headers
      .map((header) => {
        const value = row[header] ?? "";
        return `"${String(value).replaceAll('"', '""')}"`;
      })
      .join(",")
  );
  return [headers.join(","), ...rows].join("\n");
}

function downloadFile(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function ExportButton<TRecord extends Record<string, unknown>>({
  data,
  filename = "export",
  formats = ["csv", "json"],
  label = "Exporter",
}: ExportButtonProps<TRecord>) {
  const [format, setFormat] = React.useState<ExportFormat>(formats[0] ?? "csv");

  const exportData = () => {
    if (format === "json") {
      downloadFile(JSON.stringify(data, null, 2), `${filename}.json`, "application/json");
      return;
    }
    downloadFile(toCsv(data), `${filename}.csv`, "text/csv");
  };

  return (
    <div className="inline-flex items-center gap-2">
      {formats.length > 1 && (
        <Select
          value={format}
          onValueChange={(value) => setFormat(value as ExportFormat)}
          options={formats.map((item) => ({ value: item, label: item.toUpperCase() }))}
          className="w-24"
        />
      )}
      <Button type="button" size="sm" variant="secondary" onClick={exportData} disabled={data.length === 0}>
        <Download className="h-4 w-4" />
        {label}
      </Button>
    </div>
  );
}
