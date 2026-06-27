"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Select } from "./select";

const COUNTRY_CODES = [
  { value: "+1-CA",  label: "CA +1"  },
  { value: "+1-US",  label: "US +1"  },
  { value: "+33",    label: "FR +33"  },
  { value: "+44",    label: "GB +44"  },
  { value: "+49",    label: "DE +49"  },
  { value: "+32",    label: "BE +32"  },
  { value: "+41",    label: "CH +41"  },
  { value: "+34",    label: "ES +34"  },
  { value: "+39",    label: "IT +39"  },
  { value: "+351",   label: "PT +351" },
  { value: "+55",    label: "BR +55"  },
  { value: "+52",    label: "MX +52"  },
  { value: "+61",    label: "AU +61"  },
  { value: "+81",    label: "JP +81"  },
] as const;

// Extract the dial code (+X) from the compound value (+X-ISO or +X)
function dialCode(code: string) {
  return code.split("-")[0];
}

interface PhoneInputProps {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  id?: string;
  className?: string;
}

export function PhoneInput({
  value,
  onChange,
  disabled,
  placeholder = "514 555-1234",
  id,
  className,
}: PhoneInputProps) {
  const parseValue = (v?: string) => {
    if (!v) return { code: "+1-CA", number: "" };
    const match = COUNTRY_CODES.find((c) => v.startsWith(dialCode(c.value)));
    if (match) return { code: match.value, number: v.slice(dialCode(match.value).length).trim() };
    return { code: "+1-CA", number: v };
  };

  const parsed = parseValue(value);
  const [code, setCode] = React.useState(parsed.code);
  const [number, setNumber] = React.useState(parsed.number);

  const emit = (newCode: string, newNumber: string) => {
    onChange?.(`${dialCode(newCode)} ${newNumber}`.trim());
  };

  return (
    <div className={cn("flex", className)}>
      <Select
        value={code}
        onValueChange={(c) => { setCode(c); emit(c, number); }}
        options={COUNTRY_CODES as unknown as { value: string; label: string }[]}
        disabled={disabled}
        className="w-24 shrink-0 [&>button]:border-r-0 [&>button]:rounded-none"
      />
      <input
        id={id}
        type="tel"
        value={number}
        onChange={(e) => { setNumber(e.target.value); emit(code, e.target.value); }}
        disabled={disabled}
        placeholder={placeholder}
        className={cn(
          "flex h-10 flex-1 border border-border bg-background px-3 text-sm outline-none",
          "transition-colors focus:border-foreground",
          "disabled:cursor-not-allowed disabled:opacity-50"
        )}
      />
    </div>
  );
}
