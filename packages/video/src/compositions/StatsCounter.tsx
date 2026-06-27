import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ThemeId, THEME_META } from "../lib/tokens";

// 3 seconds at 30fps
export const STATS_COUNTER_DURATION = 90;
export const STATS_COUNTER_FPS = 30;
export const STATS_COUNTER_WIDTH = 1920;
export const STATS_COUNTER_HEIGHT = 400;

export interface StatItem {
  value: string;
  numericEnd?: number;
  label: string;
}

export interface StatsCounterProps {
  stats: StatItem[];
  theme: ThemeId;
  background: "transparent" | "surface";
}

export const STATS_COUNTER_DEFAULT_PROPS: StatsCounterProps = {
  stats: [
    { value: "9", numericEnd: 9, label: "Presets projet" },
    { value: "7", numericEnd: 7, label: "Themes visuels" },
    { value: "50+", numericEnd: 50, label: "Composants UI" },
    { value: "2-5j", label: "Pour livrer" },
  ],
  theme: "premium-saas",
  background: "surface",
};

interface SingleStatProps {
  stat: StatItem;
  startFrame: number;
  accentColor: string;
  textColor: string;
}

function SingleStat({ stat, startFrame, accentColor, textColor }: SingleStatProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = Math.max(0, frame - startFrame);

  const progress = spring({
    fps,
    frame: localFrame,
    config: { damping: 180, stiffness: 100, mass: 0.6 },
  });

  const opacity = interpolate(localFrame, [0, 12], [0, 1], { extrapolateRight: "clamp" });
  const translateY = interpolate(progress, [0, 1], [32, 0]);

  // Count animation for numeric stats
  const countProgress = interpolate(localFrame, [0, 45], [0, 1], {
    extrapolateRight: "clamp",
    easing: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t, // ease-in-out
  });

  const displayValue =
    stat.numericEnd !== undefined
      ? Math.round(stat.numericEnd * countProgress).toString() +
        (stat.value.endsWith("+") ? "+" : "")
      : stat.value;

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        textAlign: "center",
        flex: 1,
        padding: "0 24px",
        borderRight: `1px solid ${accentColor}22`,
      }}
    >
      <div
        style={{
          fontSize: 80,
          fontWeight: 700,
          lineHeight: 1,
          color: textColor,
          letterSpacing: "-0.02em",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {displayValue}
      </div>
      <div
        style={{
          fontSize: 20,
          fontWeight: 400,
          color: textColor,
          opacity: 0.55,
          marginTop: 12,
          letterSpacing: "0.02em",
        }}
      >
        {stat.label}
      </div>
      {/* Underline accent */}
      <div
        style={{
          height: 3,
          width: interpolate(localFrame, [20, 60], [0, 60], { extrapolateRight: "clamp" }),
          background: accentColor,
          margin: "16px auto 0",
          borderRadius: 2,
        }}
      />
    </div>
  );
}

export const StatsCounter: React.FC<StatsCounterProps> = ({ stats, theme, background }) => {
  const frame = useCurrentFrame();
  const meta = THEME_META[theme];

  const bgOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  const bg =
    background === "transparent"
      ? "transparent"
      : `linear-gradient(180deg, ${meta.bgFrom}18 0%, ${meta.bgFrom}08 100%)`;

  return (
    <AbsoluteFill
      style={{
        background: bg,
        opacity: bgOpacity,
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 80px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          maxWidth: 1400,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        {stats.map((stat, i) => (
          <SingleStat
            key={i}
            stat={stat}
            startFrame={i * 12}
            accentColor={meta.accent}
            textColor={meta.text}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};
