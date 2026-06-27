import * as React from "react";
import { cn } from "@/lib/utils";

export interface StaffOption {
  id: string | undefined;
  name: string;
  role?: string | null;
  avatarUrl?: string | null;
}

interface StaffPickerProps {
  staff: StaffOption[];
  selectedId: string | undefined;
  formId: string;
  className?: string;
}

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function StaffPicker({ staff, selectedId, formId, className }: StaffPickerProps) {
  if (staff.length <= 1) {
    return (
      <input type="hidden" name="staffId" value={staff[0]?.id ?? ""} form={formId} />
    );
  }

  return (
    <div
      className={cn("flex flex-wrap gap-2", className)}
      role="radiogroup"
      aria-label="Choisir un intervenant"
    >
      {staff.map((member) => {
        const selected = member.id === selectedId;
        return (
          <label
            key={member.id ?? "any"}
            className={cn(
              "flex cursor-pointer flex-col items-center gap-2 border p-3 transition-colors",
              "min-w-[80px] hover:border-foreground/40",
              selected ? "border-foreground bg-foreground/5" : "border-border"
            )}
          >
            <input
              className="sr-only"
              type="radio"
              name="staffId"
              value={member.id ?? ""}
              defaultChecked={selected}
              form={formId}
            />

            {/* Avatar */}
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold",
                selected
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground"
              )}
              aria-hidden
            >
              {member.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={member.avatarUrl}
                  alt={member.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                initials(member.name)
              )}
            </div>

            <div className="text-center">
              <p className="max-w-[80px] truncate text-xs font-medium leading-tight">
                {member.name}
              </p>
              {member.role && (
                <p className="max-w-[80px] truncate text-xs text-muted-foreground">
                  {member.role}
                </p>
              )}
            </div>
          </label>
        );
      })}
    </div>
  );
}
