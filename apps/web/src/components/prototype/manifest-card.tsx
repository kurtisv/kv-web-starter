"use client";

import * as React from "react";
import type { ClientManifest } from "@/lib/prototype-engine/types";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Copy, Download, Check } from "lucide-react";

interface ManifestCardProps {
  manifest: ClientManifest;
}

export function ManifestCard({ manifest }: ManifestCardProps) {
  const [copied, setCopied] = React.useState(false);

  const json = JSON.stringify(manifest, null, 2);

  function handleCopy() {
    navigator.clipboard.writeText(json).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleDownload() {
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const slug = manifest.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") || "prototype";
    a.download = `${slug}-manifest.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <CardTitle className="text-base">Manifest JSON</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopy}
              leftIcon={
                copied ? (
                  <Check className="size-3.5 text-green-500" />
                ) : (
                  <Copy className="size-3.5" />
                )
              }
            >
              {copied ? "Copie !" : "Copier"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleDownload}
              leftIcon={<Download className="size-3.5" />}
            >
              Telecharger
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <pre className="max-h-[320px] overflow-y-auto rounded-md bg-muted p-4 text-xs leading-relaxed">
          <code>{json}</code>
        </pre>
      </CardContent>
    </Card>
  );
}
