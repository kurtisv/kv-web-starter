"use client";

import * as React from "react";
import { Tag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface PromoCodeInputProps {
  onApply?: (code: string) => Promise<boolean> | boolean;
}

export function PromoCodeInput({ onApply }: PromoCodeInputProps) {
  const { toast } = useToast();
  const [code, setCode] = React.useState("");
  const [state, setState] = React.useState<"idle" | "valid" | "invalid">("idle");

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const ok = await onApply?.(code.trim());
    if (ok === false) {
      setState("invalid");
      toast.error("Code invalide", code.trim());
      return;
    }
    setState("valid");
    toast.success("Code applique", code.trim().toUpperCase());
  };

  return (
    <form onSubmit={submit} className="grid gap-2">
      <label htmlFor="promo-code" className="text-sm font-medium">Code promo</label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="promo-code"
            value={code}
            onChange={(event) => {
              setCode(event.target.value);
              setState("idle");
            }}
            className="pl-9"
            placeholder="WELCOME10"
          />
        </div>
        <Button type="submit" variant="secondary" disabled={!code.trim()}>
          Appliquer
        </Button>
      </div>
      {state === "valid" && <p className="text-xs text-success">Code applique.</p>}
      {state === "invalid" && <p className="text-xs text-destructive">Code invalide.</p>}
    </form>
  );
}
