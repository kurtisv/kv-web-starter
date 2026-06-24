"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CopyButtonProps {
  value: string;
  className?: string;
  label?: string;
  successLabel?: string;
  size?: "xs" | "sm" | "default" | "lg" | "icon";
  variant?: "default" | "outline" | "ghost" | "secondary";
}

export function CopyButton({
  value,
  className,
  label = "Copier",
  successLabel = "Copie !",
  size = "sm",
  variant = "outline",
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for environments without clipboard API
      const el = document.createElement("textarea");
      el.value = value;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isIcon = size === "icon";

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={handleCopy}
      className={cn("gap-1.5 transition-all", className)}
      aria-label={copied ? successLabel : label}
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-success" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
      {!isIcon && (
        <span className={cn("transition-all", copied && "text-success")}>
          {copied ? successLabel : label}
        </span>
      )}
    </Button>
  );
}

interface CopyCodeProps {
  code: string;
  language?: string;
  className?: string;
}

export function CopyCode({ code, language, className }: CopyCodeProps) {
  return (
    <div className={cn("relative group", className)}>
      <pre className="overflow-x-auto rounded border bg-muted/50 px-4 py-3 text-sm">
        {language && (
          <span className="absolute top-2 left-3 text-[10px] font-mono text-muted-foreground">
            {language}
          </span>
        )}
        <code className={language ? "pt-4 block" : ""}>{code}</code>
      </pre>
      <CopyButton
        value={code}
        size="icon"
        className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 h-7 w-7"
      />
    </div>
  );
}
