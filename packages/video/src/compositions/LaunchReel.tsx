// LaunchReel — 12-second product cinematic.
// 5 scenes: identity reveal -> 9 themes grid -> stats counters -> stack tech -> CTA.
// No theme prop — this is a fixed production piece showing the full boilerplate.
import React from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const LAUNCH_REEL_DURATION = 360; // 12s at 30fps
export const LAUNCH_REEL_FPS = 30;
export const LAUNCH_REEL_WIDTH = 1920;
export const LAUNCH_REEL_HEIGHT = 1080;
export const LAUNCH_REEL_DEFAULT_PROPS = {};
export type LaunchReelProps = Record<string, never>;

// ─── Static data ─────────────────────────────────────────────────────────────

const THEMES = [
  { name: "Corporate Classic", from: "#0f172a", to: "#1e293b", accent: "#3b82f6" },
  { name: "Premium SaaS",      from: "#1e0a4a", to: "#3b0f8c", accent: "#a855f7" },
  { name: "Luxury Auto",       from: "#120e00", to: "#241c00", accent: "#d97706" },
  { name: "Local Business",    from: "#031a0a", to: "#052e16", accent: "#22c55e" },
  { name: "Real Estate",       from: "#140a04", to: "#241408", accent: "#c2410c" },
  { name: "E-commerce Clean",  from: "#14000a", to: "#280014", accent: "#ec4899" },
  { name: "Dark Tech API",     from: "#00080f", to: "#000d1a", accent: "#06b6d4" },
  { name: "Portfolio Pro",     from: "#080808", to: "#141414", accent: "#f59e0b" },
  { name: "SaaS Starter",      from: "#02041a", to: "#06082e", accent: "#818cf8" },
];

const STACK = [
  { name: "Next.js 15",            note: "App Router · Turbopack"           },
  { name: "Auth.js v5",            note: "JWT · GitHub · OAuth"             },
  { name: "Prisma ORM",            note: "PostgreSQL · Supabase ready"      },
  { name: "Stripe",                note: "Checkout · Webhooks · Portail"    },
  { name: "Tailwind CSS v4",       note: "Tokens · Dark mode"               },
  { name: "shadcn/ui",             note: "50+ composants · accessible"      },
  { name: "Resend + React Email",  note: "Templates TSX transactionnels"    },
  { name: "Upstash Redis",         note: "Rate limiting · cache zero-cold"  },
];

const STATS = [
  { value: 9,  suffix: "",  label: "Presets projet"  },
  { value: 7,  suffix: "",  label: "Themes visuels"  },
  { value: 50, suffix: "+", label: "Composants UI"   },
  { value: 5,  suffix: "j", label: "Pour livrer"     },
];

// Seeded pseudo-random particle positions (deterministic per index — no Math.random)
const PARTICLES = Array.from({ length: 120 }, (_, i) => ({
  x: ((i * 137.508 + 18) % 94) + 3,
  y: ((i * 89.123 + 12) % 90) + 5,
  r: 1 + (i % 5) * 0.5,
  phase: (i * 0.618) % 1,
  speed: 0.6 + (i % 4) * 0.2,
}));

// ─── Particle field (persistent across all scenes) ────────────────────────────

const ParticleField: React.FC<{ intensity?: number }> = ({ intensity = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {PARTICLES.map((p, i) => {
        const fadeIn = Math.min(1, Math.max(0, (frame - i * 0.3) / 12));
        const breathe = 0.5 + 0.5 * Math.sin((t * p.speed + p.phase) * Math.PI * 2);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.r * 2,
              height: p.r * 2,
              borderRadius: "50%",
              background: "#ffffff",
              opacity: fadeIn * (0.03 + 0.09 * breathe) * intensity,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

// ─── Scene 1: IDENTITY (frames 0 → 100) ──────────────────────────────────────

const SceneIdentity: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoProgress = spring({ fps, frame, config: { damping: 50, mass: 1.1, stiffness: 70 } });
  const subProgress  = spring({ fps, frame: Math.max(0, frame - 12), config: { damping: 70, stiffness: 60 } });
  const badgeProgress = spring({ fps, frame: Math.max(0, frame - 22), config: { damping: 80, stiffness: 55 } });

  const logoY   = interpolate(logoProgress,  [0, 1], [70, 0]);
  const logoOp  = interpolate(logoProgress,  [0, 0.25], [0, 1]);
  const subY    = interpolate(subProgress,   [0, 1], [40, 0]);
  const subOp   = interpolate(subProgress,   [0, 0.3], [0, 1]);
  const badgeOp = interpolate(badgeProgress, [0, 0.4], [0, 1]);

  const fadeOut = interpolate(frame, [78, 98], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Pulsing center glow
  const t = frame / fps;
  const glowScale = 1 + 0.06 * Math.sin(t * Math.PI * 2);

  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", opacity: fadeOut }}
    >
      {/* Center radial glow */}
      <div style={{
        position: "absolute",
        width: 1000,
        height: 700,
        borderRadius: "50%",
        background: "radial-gradient(circle, #7c3aed1a 0%, transparent 70%)",
        filter: "blur(60px)",
        transform: `scale(${glowScale})`,
      }} />

      <div style={{ textAlign: "center", position: "relative" }}>
        {/* Eyebrow */}
        <div style={{
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: "#a78bfa",
          marginBottom: 32,
          opacity: badgeOp,
        }}>
          kv-web-starter · v2.0
        </div>

        {/* Main wordmark */}
        <div style={{
          fontSize: 108,
          fontWeight: 900,
          letterSpacing: "-0.045em",
          lineHeight: 0.9,
          color: "#ffffff",
          transform: `translateY(${logoY}px)`,
          opacity: logoOp,
        }}>
          Un boilerplate.
          <br />
          <span style={{ color: "#a855f7" }}>9 identites</span>
          <span style={{ color: "#ffffff" }}> de projet.</span>
        </div>

        {/* Subtitle */}
        <div style={{
          marginTop: 40,
          fontSize: 26,
          fontWeight: 400,
          color: "#71717a",
          letterSpacing: "0.01em",
          transform: `translateY(${subY}px)`,
          opacity: subOp,
        }}>
          Reservations · SaaS · Portfolio · E-commerce · API · Auto · Real estate
        </div>

        {/* Tech badge strip */}
        <div style={{
          marginTop: 40,
          display: "flex",
          gap: 12,
          justifyContent: "center",
          opacity: badgeOp,
        }}>
          {["Next.js 15", "Auth.js v5", "Stripe", "Prisma", "Tailwind v4"].map((t) => (
            <div key={t} style={{
              padding: "8px 18px",
              borderRadius: 100,
              border: "1px solid #3f3f46",
              background: "#18181b",
              color: "#a1a1aa",
              fontSize: 15,
              fontWeight: 500,
            }}>
              {t}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 2: 9 THEMES GRID (frames 80 → 210, relative 0 → 130) ──────────────

const SceneThemes: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn  = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [108, 128], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const alpha   = Math.min(fadeIn, fadeOut);

  const labelProgress = spring({ fps, frame, config: { damping: 80, stiffness: 90 } });

  // Pulsing inner glows on cards (continuous)
  const t = frame / fps;

  return (
    <AbsoluteFill style={{ opacity: alpha, padding: "52px 72px 52px" }}>
      {/* Scene label */}
      <div style={{
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        color: "#52525b",
        marginBottom: 28,
        opacity: interpolate(labelProgress, [0, 1], [0, 1]),
      }}>
        9 identites de projet
      </div>

      {/* 3x3 grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(3, 1fr)",
        gap: 16,
        flex: 1,
        height: "calc(100% - 80px)",
      }}>
        {THEMES.map((theme, i) => {
          const stagger = i * 9;
          const prog = spring({ fps, frame: Math.max(0, frame - stagger), config: { damping: 65, stiffness: 85, mass: 0.7 } });
          const y   = interpolate(prog, [0, 1], [90, 0]);
          const op  = interpolate(prog, [0, 0.25], [0, 1]);

          // Accent line width (draws in after card appears)
          const lineW = interpolate(prog, [0.65, 1], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

          // Continuous glow pulse on each card
          const pulse = 0.5 + 0.5 * Math.sin((t * 0.8 + i * 0.4) * Math.PI * 2);

          return (
            <div
              key={i}
              style={{
                borderRadius: 14,
                background: `linear-gradient(145deg, ${theme.from} 0%, ${theme.to} 100%)`,
                transform: `translateY(${y}px)`,
                opacity: op,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Animated inner glow */}
              <div style={{
                position: "absolute",
                top: -60,
                right: -60,
                width: 220,
                height: 220,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${theme.accent}${Math.round(20 + 18 * pulse).toString(16).padStart(2, "0")} 0%, transparent 70%)`,
              }} />

              {/* Bottom accent bar that sweeps in */}
              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                height: 3,
                width: `${lineW}%`,
                background: theme.accent,
              }} />

              <div style={{ padding: "16px 20px", position: "relative" }}>
                <div style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: theme.accent,
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  marginBottom: 6,
                }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#ffffff",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.2,
                }}>
                  {theme.name}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 3: STATS (frames 190 → 270, relative 0 → 80) ──────────────────────

const SceneStats: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn  = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [62, 78], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const t = frame / fps;
  const glowPulse = 1 + 0.08 * Math.sin(t * Math.PI * 2);

  return (
    <AbsoluteFill style={{ opacity: Math.min(fadeIn, fadeOut), justifyContent: "center", alignItems: "center" }}>
      {/* Central glow */}
      <div style={{
        position: "absolute",
        width: 1200,
        height: 600,
        borderRadius: "50%",
        background: "radial-gradient(circle, #7c3aed18 0%, transparent 65%)",
        filter: "blur(80px)",
        transform: `scale(${glowPulse})`,
      }} />

      {/* Scene label */}
      <div style={{
        position: "absolute",
        top: 68,
        left: "50%",
        transform: "translateX(-50%)",
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        color: "#52525b",
      }}>
        En chiffres
      </div>

      {/* Stats row */}
      <div style={{ display: "flex", gap: 100, alignItems: "flex-start" }}>
        {STATS.map(({ value, suffix, label }, i) => {
          const delay = i * 14;
          const prog  = spring({ fps, frame: Math.max(0, frame - delay), config: { damping: 55, stiffness: 60, mass: 1.4 } });
          const y     = interpolate(prog, [0, 1], [70, 0]);
          const op    = interpolate(prog, [0, 0.35], [0, 1]);

          // Count-up: spring naturally eases the number
          const count = Math.round(interpolate(prog, [0, 1], [0, value]));
          // Accent line sweeps under the number
          const lineW = interpolate(prog, [0.7, 1], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

          return (
            <div key={i} style={{ textAlign: "center", transform: `translateY(${y}px)`, opacity: op }}>
              {/* Big number */}
              <div style={{
                fontSize: 130,
                fontWeight: 900,
                color: "#ffffff",
                lineHeight: 1,
                letterSpacing: "-0.055em",
                fontVariantNumeric: "tabular-nums",
              }}>
                {count}
                <span style={{ color: "#a855f7" }}>{suffix}</span>
              </div>

              {/* Animated underline */}
              <div style={{
                height: 4,
                borderRadius: 2,
                background: "linear-gradient(90deg, #7c3aed, #a855f7)",
                width: `${lineW}%`,
                margin: "16px auto 0",
                maxWidth: 180,
              }} />

              {/* Label */}
              <div style={{
                marginTop: 16,
                fontSize: 19,
                fontWeight: 500,
                color: "#71717a",
                letterSpacing: "0.01em",
              }}>
                {label}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene 4: STACK TECH (frames 255 → 325, relative 0 → 70) ─────────────────

const SceneStack: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn  = interpolate(frame, [0, 14], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [54, 68], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ opacity: Math.min(fadeIn, fadeOut), padding: "56px 160px" }}>
      {/* Right accent glow */}
      <div style={{
        position: "absolute",
        right: -100,
        top: "20%",
        width: 600,
        height: 800,
        borderRadius: "50%",
        background: "radial-gradient(circle, #7c3aed14 0%, transparent 70%)",
        filter: "blur(60px)",
      }} />

      <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "#52525b", marginBottom: 44 }}>
        Stack technique
      </div>

      {STACK.map(({ name, note }, i) => {
        const delay = i * 7;
        const prog  = spring({ fps, frame: Math.max(0, frame - delay), config: { damping: 75, stiffness: 100, mass: 0.8 } });
        const x     = interpolate(prog, [0, 1], [-160, 0]);
        const op    = interpolate(prog, [0, 0.25], [0, 1]);

        // Divider line draws in
        const lineW = interpolate(prog, [0.6, 1], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

        return (
          <div key={i}>
            <div style={{
              display: "flex",
              alignItems: "baseline",
              gap: 28,
              paddingBottom: 18,
              transform: `translateX(${x}px)`,
              opacity: op,
            }}>
              {/* Accent dot */}
              <div style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#7c3aed",
                flexShrink: 0,
                marginBottom: 4,
              }} />
              <div style={{ flex: 1, display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                <span style={{ fontSize: 38, fontWeight: 800, color: "#ffffff", letterSpacing: "-0.025em" }}>
                  {name}
                </span>
                <span style={{ fontSize: 16, color: "#52525b", fontWeight: 400, letterSpacing: "0.02em" }}>
                  {note}
                </span>
              </div>
            </div>

            {/* Divider — draws left to right */}
            {i < STACK.length - 1 && (
              <div style={{
                height: 1,
                marginBottom: 18,
                background: "#27272a",
                width: `${lineW}%`,
              }} />
            )}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ─── Scene 5: CTA (frames 315 → 360, relative 0 → 45) ────────────────────────

const SceneCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = [
    { text: "Clone.",         color: "#ffffff" },
    { text: "Personnalise.",  color: "#ffffff" },
    { text: "Livre.",         color: "#a855f7" },
  ];

  // Purple flash on entry
  const flashOp = interpolate(frame, [0, 6, 20], [0.5, 0, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      {/* Entry flash */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "#7c3aed",
        opacity: flashOp,
      }} />

      {/* Radial glow */}
      <div style={{
        position: "absolute",
        width: 1400,
        height: 900,
        borderRadius: "50%",
        background: "radial-gradient(circle, #7c3aed22 0%, transparent 65%)",
        filter: "blur(80px)",
      }} />

      <div style={{ textAlign: "center", position: "relative" }}>
        {words.map(({ text, color }, i) => {
          const delay = i * 9;
          const prog  = spring({ fps, frame: Math.max(0, frame - delay), config: { damping: 42, stiffness: 70, mass: 1.6 } });
          const scale = interpolate(prog, [0, 1], [0.6, 1]);
          const op    = interpolate(prog, [0, 0.35], [0, 1]);
          // Slight vertical drop as well
          const y = interpolate(prog, [0, 1], [40, 0]);

          return (
            <div key={i} style={{
              fontSize: 152,
              fontWeight: 900,
              color,
              lineHeight: 0.9,
              letterSpacing: "-0.05em",
              transform: `scale(${scale}) translateY(${y}px)`,
              opacity: op,
            }}>
              {text}
            </div>
          );
        })}

        {/* Tagline */}
        {(() => {
          const tagProg = spring({ fps, frame: Math.max(0, frame - 28), config: { damping: 80, stiffness: 60 } });
          return (
            <div style={{
              marginTop: 48,
              fontSize: 20,
              color: "#52525b",
              fontWeight: 500,
              letterSpacing: "0.04em",
              opacity: interpolate(tagProg, [0, 1], [0, 1]),
            }}>
              github.com/your-handle/kv-web-starter
            </div>
          );
        })()}
      </div>
    </AbsoluteFill>
  );
};

// ─── Root composition ─────────────────────────────────────────────────────────

export const LaunchReel: React.FC<LaunchReelProps> = () => {
  return (
    <AbsoluteFill style={{
      background: "#07051a",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    }}>
      {/* Particle field runs the full 12s */}
      <ParticleField />

      {/* Scene 1: Identity — 0 to 100 */}
      <Sequence from={0} durationInFrames={100}>
        <SceneIdentity />
      </Sequence>

      {/* Scene 2: 9 Themes Grid — 80 to 210 (10f overlap with scene 1) */}
      <Sequence from={80} durationInFrames={130}>
        <SceneThemes />
      </Sequence>

      {/* Scene 3: Stats — 190 to 270 (10f overlap with scene 2) */}
      <Sequence from={190} durationInFrames={80}>
        <SceneStats />
      </Sequence>

      {/* Scene 4: Stack Tech — 255 to 325 (15f overlap with scene 3) */}
      <Sequence from={255} durationInFrames={70}>
        <SceneStack />
      </Sequence>

      {/* Scene 5: CTA — 315 to 360 (10f overlap with scene 4) */}
      <Sequence from={315} durationInFrames={45}>
        <SceneCTA />
      </Sequence>
    </AbsoluteFill>
  );
};
