"use client";

import * as React from "react";

/**
 * Detects WebGL support on the client.
 * Returns null during SSR and on the first render (before useEffect),
 * then true/false once the check completes.
 */
export function useWebGLSupport(): boolean | null {
  const [supported, setSupported] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const ctx =
        (canvas.getContext("webgl2") as WebGLRenderingContext | null) ??
        (canvas.getContext("webgl") as WebGLRenderingContext | null);
      setSupported(ctx !== null);
    } catch {
      setSupported(false);
    }
  }, []);

  return supported;
}
