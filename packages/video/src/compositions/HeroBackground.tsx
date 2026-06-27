// HeroBackground — text-free decorative background, designed for seamless loop.
// NEVER add text here. All text lives in HTML on top of the video.
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { ThemeId, THEME_META } from "../lib/tokens";

export const HERO_BG_DURATION = 180; // 6s loop at 30fps
export const HERO_BG_FPS = 30;
export const HERO_BG_WIDTH = 1920;
export const HERO_BG_HEIGHT = 1080;

export interface HeroBackgroundProps {
  theme: ThemeId;
}

export const HERO_BG_DEFAULT_PROPS: HeroBackgroundProps = {
  theme: "premium-saas",
};

export const HeroBackground: React.FC<HeroBackgroundProps> = ({ theme }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const meta = THEME_META[theme];

  // t: 0..1, full period — all sin(t*2PI) are 0 at t=0 and t=1 = seamless loop
  const t = frame / durationInFrames;
  const s1 = Math.sin(t * Math.PI * 2);
  const s2 = Math.sin(t * Math.PI * 2 + Math.PI / 2);
  const s3 = Math.sin(t * Math.PI * 2 + Math.PI);
  const s4 = Math.sin(t * Math.PI * 4); // double speed

  // Orb 1 — top right, large, breathes
  const orb1Scale = 1 + 0.08 * s1;
  const orb1Opacity = 0.22 + 0.08 * s1;
  const orb1Y = -5 + 3 * s2;

  // Orb 2 — bottom left, medium, offset phase
  const orb2Scale = 1 + 0.06 * s3;
  const orb2Opacity = 0.14 + 0.05 * s3;
  const orb2Y = 5 + 2 * s1;

  // Orb 3 — center, small accent pulse
  const orb3Scale = 0.8 + 0.12 * s4;
  const orb3Opacity = 0.08 + 0.04 * s4;

  // Aurora band — horizontal soft band that drifts vertically
  const auroraY = 38 + 7 * s1;
  const auroraOpacity = 0.12 + 0.05 * s2;

  // Second aurora — offset
  const aurora2Y = 62 + 5 * s3;
  const aurora2Opacity = 0.08 + 0.03 * s4;

  // Grid opacity subtle pulse
  const gridOpacity = 0.06 + 0.02 * s2;

  // Diagonal accent line width
  const lineOpacity = 0.18 + 0.08 * s1;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(150deg, ${meta.bgFrom} 0%, ${meta.bgTo} 60%, ${meta.bgFrom}cc 100%)`,
        overflow: "hidden",
      }}
    >
      {/* Primary glow — top right */}
      <div
        style={{
          position: "absolute",
          right: "-15%",
          top: `${orb1Y}%`,
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${meta.accent}44 0%, ${meta.accent}18 40%, transparent 70%)`,
          transform: `scale(${orb1Scale})`,
          opacity: orb1Opacity,
          filter: "blur(1px)",
        }}
      />

      {/* Secondary glow — bottom left */}
      <div
        style={{
          position: "absolute",
          left: "-8%",
          bottom: `${orb2Y}%`,
          width: 680,
          height: 680,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${meta.accent}33 0%, ${meta.accent}11 45%, transparent 70%)`,
          transform: `scale(${orb2Scale})`,
          opacity: orb2Opacity,
          filter: "blur(2px)",
        }}
      />

      {/* Tertiary glow — center area */}
      <div
        style={{
          position: "absolute",
          left: "38%",
          top: "30%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${meta.accent}22 0%, transparent 65%)`,
          transform: `scale(${orb3Scale})`,
          opacity: orb3Opacity,
          filter: "blur(4px)",
        }}
      />

      {/* Aurora band 1 */}
      <div
        style={{
          position: "absolute",
          left: "-10%",
          right: "-10%",
          top: `${auroraY}%`,
          height: 180,
          background: `linear-gradient(to bottom, transparent, ${meta.accent}1a, transparent)`,
          transform: "skewY(-2deg)",
          opacity: auroraOpacity,
          filter: "blur(30px)",
        }}
      />

      {/* Aurora band 2 — dimmer, higher up */}
      <div
        style={{
          position: "absolute",
          left: "-10%",
          right: "-10%",
          top: `${aurora2Y}%`,
          height: 120,
          background: `linear-gradient(to bottom, transparent, ${meta.accent}12, transparent)`,
          transform: "skewY(1.5deg)",
          opacity: aurora2Opacity,
          filter: "blur(40px)",
        }}
      />

      {/* Subtle dot grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(${meta.accent}28 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          opacity: gridOpacity,
        }}
      />

      {/* Diagonal accent line — top left to center */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "60%",
          height: "60%",
          borderBottom: `1px solid ${meta.accent}`,
          opacity: lineOpacity,
          transform: "rotate(0deg)",
          transformOrigin: "top left",
          // Use clip-path to draw a diagonal from top-left
          clipPath: "polygon(0 0, 100% 100%, 100% calc(100% - 1px), 0 1px)",
        }}
      />

      {/* Bottom vignette */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "35%",
          background: `linear-gradient(to top, ${meta.bgFrom}cc 0%, transparent 100%)`,
        }}
      />

      {/* Top vignette */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "20%",
          background: `linear-gradient(to bottom, ${meta.bgFrom}99 0%, transparent 100%)`,
        }}
      />
    </AbsoluteFill>
  );
};
