"use client";

// Targeted console.warn filter for known upstream warnings we cannot fix.
//
// THREE.Clock — R3F 9.x uses THREE.Clock internally; three.js 0.170+ deprecated
// it in favour of THREE.Timer. Until R3F ships that migration, every Canvas mount
// emits the warning. Not our code, not fixable without touching node_modules.
//
// X4122 — ANGLE HLSL precision warnings on Windows from Three.js internal shader
// code. GPU-level, non-actionable, not a runtime error.

const SUPPRESSED = [
  "THREE.Clock:",
  "warning X4122:",
];

if (typeof window !== "undefined") {
  const _warn = console.warn.bind(console);
  console.warn = (...args: unknown[]) => {
    const first = typeof args[0] === "string" ? args[0] : "";
    if (SUPPRESSED.some((prefix) => first.startsWith(prefix))) return;
    _warn(...args);
  };
}
