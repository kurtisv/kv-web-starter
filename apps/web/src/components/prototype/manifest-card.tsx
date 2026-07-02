"use client";

import * as React from "react";
import type { ClientManifest } from "@/lib/prototype-engine/types";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Copy, Download, Check, AlertCircle } from "lucide-react";

type ActionStatus = "idle" | "success" | "error";

interface ManifestCardProps {
  manifest: ClientManifest;
}

export function ManifestCard({ manifest }: ManifestCardProps) {
  const [copyStatus, setCopyStatus] = React.useState<ActionStatus>("idle");
  const [downloadStatus, setDownloadStatus] = React.useState<ActionStatus>("idle");

  const json = JSON.stringify(manifest, null, 2);

  function handleCopy() {
    if (!navigator.clipboard) {
      setCopyStatus("error");
      setTimeout(() => setCopyStatus("idle"), 3000);
      return;
    }
    navigator.clipboard.writeText(json).then(
      () => {
        setCopyStatus("success");
        setTimeout(() => setCopyStatus("idle"), 2000);
      },
      () => {
        setCopyStatus("error");
        setTimeout(() => setCopyStatus("idle"), 3000);
      },
    );
  }

  function handleDownload() {
    let url: string | null = null;
    try {
      const blob = new Blob([json], { type: "application/json" });
      url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const slug =
        manifest.name
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "") || "prototype";
      a.download = `${slug}-manifest.json`;
      a.click();
      setDownloadStatus("success");
      setTimeout(() => setDownloadStatus("idle"), 2000);
    } catch {
      setDownloadStatus("error");
      setTimeout(() => setDownloadStatus("idle"), 3000);
    } finally {
      if (url) URL.revokeObjectURL(url);
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CardTitle className="text-base">Manifest JSON</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopy}
              aria-label={
                copyStatus === "success"
                  ? "Manifest copie"
                  : copyStatus === "error"
                  ? "Erreur de copie"
                  : "Copier le manifest"
              }
              leftIcon={
                copyStatus === "success" ? (
                  <Check className="size-3.5 text-green-500" />
                ) : copyStatus === "error" ? (
                  <AlertCircle className="size-3.5 text-destructive" />
                ) : (
                  <Copy className="size-3.5" />
                )
              }
            >
              {copyStatus === "success"
                ? "Copie !"
                : copyStatus === "error"
                ? "Erreur"
                : "Copier"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleDownload}
              aria-label={
                downloadStatus === "success"
                  ? "Manifest telecharge"
                  : downloadStatus === "error"
                  ? "Erreur de telechargement"
                  : "Telecharger le manifest"
              }
              leftIcon={
                downloadStatus === "success" ? (
                  <Check className="size-3.5 text-green-500" />
                ) : downloadStatus === "error" ? (
                  <AlertCircle className="size-3.5 text-destructive" />
                ) : (
                  <Download className="size-3.5" />
                )
              }
            >
              {downloadStatus === "success"
                ? "Telecharge !"
                : downloadStatus === "error"
                ? "Erreur"
                : "Telecharger"}
            </Button>
          </div>
        </div>
        {/* aria-live region announces copy/download outcome to screen readers */}
        <p
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          {copyStatus === "success"
            ? "Manifest copie dans le presse-papiers."
            : copyStatus === "error"
            ? "Erreur lors de la copie du manifest."
            : downloadStatus === "success"
            ? "Manifest telecharge."
            : downloadStatus === "error"
            ? "Erreur lors du telechargement du manifest."
            : ""}
        </p>
      </CardHeader>
      <CardContent>
        <pre
          className="max-h-[320px] overflow-x-auto overflow-y-auto rounded-md bg-muted p-4 text-xs leading-relaxed"
          tabIndex={0}
          aria-label="Manifest JSON"
        >
          <code>{json}</code>
        </pre>
      </CardContent>
    </Card>
  );
}
