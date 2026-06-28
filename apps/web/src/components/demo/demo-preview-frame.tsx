"use client";

interface DemoPreviewFrameProps {
  accent: string;
  bg: string;
  fg?: string;
  heroFrom: string;
  dark?: boolean;
  layout?: "standard" | "dashboard" | "portal" | "store";
}

export function DemoPreviewFrame({
  accent,
  bg,
  heroFrom,
  dark = false,
  layout = "standard",
}: DemoPreviewFrameProps) {
  const muted = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)";
  const mutedBorder = dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)";

  return (
    <div
      className="relative w-full overflow-hidden rounded-lg"
      style={{ background: bg, height: 152, border: `1px solid ${mutedBorder}` }}
    >
      {/* Nav bar */}
      <div
        className="flex items-center justify-between px-3"
        style={{ height: 28, background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)", borderBottom: `1px solid ${mutedBorder}` }}
      >
        <div className="flex gap-1.5">
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <div key={c} className="rounded-full" style={{ width: 6, height: 6, background: c }} />
          ))}
        </div>
        <div className="flex gap-2">
          {[32, 24, 28].map((w, i) => (
            <div key={i} className="rounded" style={{ width: w, height: 6, background: muted }} />
          ))}
        </div>
        <div className="rounded-full" style={{ width: 20, height: 20, background: accent, opacity: 0.8 }} />
      </div>

      {layout === "dashboard" ? (
        <div className="flex" style={{ height: 124 }}>
          {/* Sidebar */}
          <div style={{ width: 44, background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)", borderRight: `1px solid ${mutedBorder}`, padding: "8px 6px", display: "flex", flexDirection: "column", gap: 6 }}>
            {[1, 1, 0.4, 1, 0.4].map((op, i) => (
              <div key={i} className="rounded" style={{ height: 6, background: i === 0 ? accent : muted, opacity: op }} />
            ))}
          </div>
          {/* Content */}
          <div style={{ flex: 1, padding: 10, display: "flex", flexDirection: "column", gap: 6 }}>
            <div className="grid gap-1.5" style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="rounded-md" style={{ height: 32, background: muted, borderTop: `2px solid ${i === 0 ? accent : mutedBorder}` }} />
              ))}
            </div>
            <div className="rounded-md" style={{ flex: 1, background: muted }} />
          </div>
        </div>
      ) : layout === "portal" ? (
        <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
          <div className="rounded" style={{ height: 36, background: `linear-gradient(90deg, ${heroFrom}cc, ${heroFrom}44)` }} />
          <div className="flex gap-2">
            <div className="rounded" style={{ flex: 2, height: 56, background: dark ? "rgba(34,211,238,0.08)" : muted, border: `1px solid ${dark ? "rgba(34,211,238,0.15)" : mutedBorder}` }} />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
              {[1, 0.6, 0.6].map((op, i) => (
                <div key={i} className="rounded" style={{ height: 16, background: muted, opacity: op }} />
              ))}
            </div>
          </div>
        </div>
      ) : layout === "store" ? (
        <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
          <div className="rounded" style={{ height: 28, background: `linear-gradient(90deg, ${heroFrom}, ${accent}88)` }} />
          <div className="grid gap-2" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded" style={{ height: 52, background: muted, borderTop: `2px solid ${i === 0 ? accent : mutedBorder}` }}>
                <div className="m-1 rounded" style={{ height: 30, background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)" }} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Standard layout */
        <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
          {/* Hero gradient */}
          <div className="rounded flex items-center px-3" style={{ height: 40, background: `linear-gradient(135deg, ${heroFrom}, ${heroFrom}99)` }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
              <div className="rounded" style={{ height: 7, width: "60%", background: "rgba(255,255,255,0.85)" }} />
              <div className="rounded" style={{ height: 5, width: "40%", background: "rgba(255,255,255,0.5)" }} />
            </div>
            <div className="rounded" style={{ height: 18, width: 40, background: accent, opacity: 0.9 }} />
          </div>
          {/* Cards row */}
          <div className="grid gap-2" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded" style={{ height: 44, background: muted, borderTop: `2px solid ${i === 0 ? accent : mutedBorder}`, padding: 6 }}>
                <div className="rounded" style={{ height: 6, width: "70%", background: dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)", marginBottom: 4 }} />
                <div className="rounded" style={{ height: 5, width: "50%", background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)" }} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
