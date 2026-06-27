"use client";
import * as React from "react";
import { Eye, EyeOff, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { CopyButton } from "@/components/ui/copy-button";

interface ApiKeyDisplayProps {
  prefix: string;
  className?: string;
}

export function ApiKeyDisplay({ prefix, className }: ApiKeyDisplayProps) {
  return (
    <div className={cn("flex items-center gap-2 font-mono text-sm", className)}>
      <code className="flex-1 truncate">{prefix}&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;</code>
      <CopyButton value={prefix} size="icon" variant="ghost" label="Copier le prefixe" />
    </div>
  );
}

interface NewApiKeyRevealProps {
  plainTextKey: string;
  className?: string;
}

export function NewApiKeyReveal({ plainTextKey, className }: NewApiKeyRevealProps) {
  const [visible, setVisible] = React.useState(false);

  return (
    <div className={cn("mt-5 grid gap-3 border bg-muted/40 p-4", className)}>
      <div className="flex items-start gap-2 text-sm text-amber-700 dark:text-amber-400">
        <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
        <p>
          Copiez cette cle maintenant. Elle ne sera{" "}
          <strong>plus visible</strong> apres avoir quitte cette page.
        </p>
      </div>

      <div className="flex items-center gap-2 rounded border bg-background px-3 py-2">
        <code className="flex-1 break-all font-mono text-sm">
          {visible ? plainTextKey : plainTextKey.slice(0, 8) + "••••••••••••••••••••"}
        </code>
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
          aria-label={visible ? "Masquer" : "Afficher"}
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
        <CopyButton value={plainTextKey} size="icon" variant="ghost" />
      </div>
    </div>
  );
}
