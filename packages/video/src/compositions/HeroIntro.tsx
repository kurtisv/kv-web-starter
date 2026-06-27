import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ThemeId, THEME_META } from "../lib/tokens";

// 4 seconds at 30fps
export const HERO_INTRO_DURATION = 120;
export const HERO_INTRO_FPS = 30;
export const HERO_INTRO_WIDTH = 1920;
export const HERO_INTRO_HEIGHT = 1080;

export interface HeroIntroProps {
  title: string;
  subtitle: string;
  eyebrow: string;
  theme: ThemeId;
}

export const HERO_INTRO_DEFAULT_PROPS: HeroIntroProps = {
  title: "Un boilerplate. 9 identites de projet.",
  subtitle: "Clone, personnalise, livre en jours.",
  eyebrow: "NEXT.JS 16 · TAILWIND V4 · AUTH.JS V5 · STRIPE",
  theme: "premium-saas",
};

function Word({ children, startFrame }: { children: string; startFrame: number }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    fps,
    frame: Math.max(0, frame - startFrame),
    config: { damping: 200, mass: 0.5, stiffness: 120 },
  });

  return (
    <span
      style={{
        display: "inline-block",
        marginRight: "0.28em",
        opacity: interpolate(progress, [0, 0.3], [0, 1], { extrapolateRight: "clamp" }),
        transform: `translateY(${interpolate(progress, [0, 1], [28, 0])}px)`,
      }}
    >
      {children}
    </span>
  );
}

export const HeroIntro: React.FC<HeroIntroProps> = ({
  title,
  subtitle,
  eyebrow,
  theme,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const meta = THEME_META[theme];
  const words = title.split(" ");

  const bgOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });

  const circleProgress = spring({ fps, frame, config: { damping: 60, mass: 1.2 } });
  const circleOpacity = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: "clamp" });

  const gridOpacity = interpolate(frame, [10, 40], [0, 0.35], { extrapolateRight: "clamp" });

  const eyebrowOpacity = interpolate(frame, [22, 38], [0, 0.55], { extrapolateRight: "clamp" });
  const eyebrowY = interpolate(frame, [22, 42], [14, 0], { extrapolateRight: "clamp" });

  const subtitleOpacity = interpolate(frame, [68, 84], [0, 0.75], { extrapolateRight: "clamp" });
  const subtitleY = interpolate(frame, [68, 86], [18, 0], { extrapolateRight: "clamp" });

  const barWidth = interpolate(frame, [88, 116], [0, 220], { extrapolateRight: "clamp" });
  const bottomBarOpacity = interpolate(frame, [100, 120], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${meta.bgFrom} 0%, ${meta.bgTo} 55%, ${meta.accent}28 100%)`,
        opacity: bgOpacity,
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
        color: meta.text,
        overflow: "hidden",
      }}
    >
      {/* Radial accent glow top-right */}
      <div
        style={{
          position: "absolute",
          right: -240,
          top: -240,
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${meta.accent}22 0%, transparent 68%)`,
          opacity: circleOpacity,
          transform: `scale(${interpolate(circleProgress, [0, 1], [0.6, 1])})`,
        }}
      />

      {/* Second softer glow bottom-left */}
      <div
        style={{
          position: "absolute",
          left: -120,
          bottom: -120,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${meta.accent}14 0%, transparent 65%)`,
          opacity: circleOpacity * 0.6,
        }}
      />

      {/* Subtle grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(${meta.accent}0a 1px, transparent 1px), linear-gradient(90deg, ${meta.accent}0a 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
          opacity: gridOpacity,
        }}
      />

      {/* Content block */}
      <div
        style={{
          position: "absolute",
          left: "8%",
          top: "50%",
          transform: "translateY(-52%)",
          maxWidth: "76%",
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            fontSize: 20,
            fontWeight: 500,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            opacity: eyebrowOpacity,
            transform: `translateY(${eyebrowY}px)`,
            margin: "0 0 36px 0",
          }}
        >
          {eyebrow}
        </p>

        {/* Title — word by word spring */}
        <h1
          style={{
            fontSize: 100,
            fontWeight: 650,
            lineHeight: 1.04,
            margin: 0,
            letterSpacing: "-0.025em",
          }}
        >
          {words.map((word, i) => (
            <Word key={i} startFrame={32 + i * 5}>
              {word}
            </Word>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 30,
            lineHeight: 1.55,
            marginTop: 36,
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
            maxWidth: 760,
            fontWeight: 400,
          }}
        >
          {subtitle}
        </p>

        {/* Animated accent bar */}
        <div
          style={{
            marginTop: 52,
            height: 4,
            width: barWidth,
            background: `linear-gradient(90deg, ${meta.accent}, ${meta.accent}80)`,
            borderRadius: 2,
          }}
        />
      </div>

      {/* Bottom accent line */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, ${meta.accent}, ${meta.accent}00)`,
          opacity: bottomBarOpacity,
        }}
      />
    </AbsoluteFill>
  );
};
