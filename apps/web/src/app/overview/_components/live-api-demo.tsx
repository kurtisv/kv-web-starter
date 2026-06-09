"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Terminal, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type DemoStatus = "idle" | "loading" | "ok" | "error";

interface HealthResponse {
  ok: boolean;
  service: string;
  time: string;
}

export function LiveApiDemo() {
  const [status, setStatus] = useState<DemoStatus>("idle");
  const [data, setData] = useState<HealthResponse | null>(null);
  const [elapsed, setElapsed] = useState<number | null>(null);

  const runHealthCheck = async () => {
    setStatus("loading");
    setData(null);
    const t0 = performance.now();
    try {
      const res = await fetch("/api/health");
      const json: HealthResponse = await res.json();
      setElapsed(Math.round(performance.now() - t0));
      setData(json);
      setStatus("ok");
    } catch {
      setElapsed(Math.round(performance.now() - t0));
      setStatus("error");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Terminal className="size-4" />
          GET /api/health
        </CardTitle>
        <CardDescription>
          Appel reel vers le serveur Next.js — aucune simulation.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Button
          onClick={runHealthCheck}
          disabled={status === "loading"}
          variant={status === "ok" ? "secondary" : "default"}
          className="w-fit"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Requete en cours...
            </>
          ) : status === "ok" ? (
            <>
              <CheckCircle2 className="size-4 text-green-600" />
              Relancer le test
            </>
          ) : (
            "Lancer le test"
          )}
        </Button>

        {status === "ok" && data && (
          <div className="grid gap-3">
            <div className="flex items-center gap-2 text-sm">
              <span className="flex size-2 rounded-full bg-green-500" />
              <span className="font-medium text-green-700 dark:text-green-400">
                200 OK
              </span>
              {elapsed !== null && (
                <span className="text-muted-foreground">{elapsed} ms</span>
              )}
            </div>
            <pre className="overflow-x-auto border bg-muted/50 p-4 text-xs leading-relaxed">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}

        {status === "error" && (
          <div className="flex items-center gap-2 text-sm text-destructive">
            <XCircle className="size-4" />
            Erreur — le serveur est-il demarré ?
          </div>
        )}
      </CardContent>
    </Card>
  );
}
