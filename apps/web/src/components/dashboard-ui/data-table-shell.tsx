import * as React from "react";
import { cn } from "@/lib/utils";
import { EmptyState } from "@/components/ui/empty-state";
import { LoadingState } from "@/components/ui/loading-state";

interface Column<T> {
  key: keyof T | string;
  header: React.ReactNode;
  cell: (row: T) => React.ReactNode;
  className?: string;
}

interface DataTableShellProps<T> {
  data: T[];
  columns: Column<T>[];
  keyField: keyof T;
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: React.ReactNode;
  className?: string;
}

export function DataTableShell<T>({
  data,
  columns,
  keyField,
  isLoading,
  emptyTitle = "No data",
  emptyDescription,
  emptyAction,
  className,
}: DataTableShellProps<T>) {
  if (isLoading) return <LoadingState text="Loading..." />;

  if (data.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        action={emptyAction}
      />
    );
  }

  return (
    <div className={cn("w-full overflow-auto", className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/40">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={cn("h-10 px-4 text-left font-medium text-muted-foreground first:pl-6 last:pr-6", col.className)}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={String(row[keyField])} className="border-b transition-colors hover:bg-muted/30 last:border-0">
              {columns.map((col) => (
                <td
                  key={String(col.key)}
                  className={cn("px-4 py-3 first:pl-6 last:pr-6", col.className)}
                >
                  {col.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
