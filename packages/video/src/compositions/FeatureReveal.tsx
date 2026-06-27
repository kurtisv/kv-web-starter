import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ThemeId, THEME_META } from "../lib/tokens";

// 5 seconds at 30fps
export const FEATURE_REVEAL_DURATION = 150;
export const FEATURE_REVEAL_FPS = 30;
export const FEATURE_REVEAL_WIDTH = 1920;
export const FEATURE_REVEAL_HEIGHT = 1080;

export interface FeatureItem {
  icon: string; // unicode emoji or short text symbol
  title: string;
  description: string;
}

export interface FeatureRevealProps {
  eyebrow: string;
  title: string;
  features: FeatureItem[];
  theme: ThemeId;
  columns: 2 | 3;
}

export const FEATURE_REVEAL_DEFAULT_PROPS: FeatureRevealProps = {
  eyebrow: "STACK INCLUS",
  title: "Tout ce dont tu as besoin, deja configure.",
  features: [
    { icon: "🔐", title: "Auth.js v5", description: "JWT, OAuth GitHub, credentials, Prisma adapter." },
    { icon: "💳", title: "Stripe", description: "Checkout, abonnements, webhooks, portail client." },
    { icon: "✉️",  title: "Resend + React Email", description: "Templates transactionnels en TSX." },
    { icon: "⚡", title: "Upstash Redis", description: "Rate limiting sliding window zero cold start." },
    { icon: "📅", title: "Module Booking", description: "Disponibilites, slots, paiement Stripe integre." },
    { icon: "🔑", title: "API Portal", description: "Cles API hashees, comptabilisation, limites par plan." },
  ],
  theme: "premium-saas",
  columns: 3,
};

interface FeatureCardProps {
  feature: FeatureItem;
  startFrame: number;
  accentColor: string;
  textColor: string;
}

function FeatureCard({ feature, startFrame, accentColor, textColor }: FeatureCardProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = Math.max(0, frame - startFrame);

  const progress = spring({
    fps,
    frame: localFrame,
    config: { damping: 220, stiffness: 90, mass: 0.7 },
  });

  const opacity = interpolate(localFrame, [0, 14], [0, 1], { extrapolateRight: "clamp" });
  const translateY = interpolate(progress, [0, 1], [40, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        background: `${accentColor}0d`,
        border: `1px solid ${accentColor}28`,
        borderRadius: 16,
        padding: "36px 40px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div style={{ fontSize: 40 }}>{feature.icon}</div>
      <div
        style={{
          fontSize: 26,
          fontWeight: 600,
          color: textColor,
          letterSpacing: "-0.01em",
        }}
      >
        {feature.title}
      </div>
      <div
        style={{
          fontSize: 19,
          lineHeight: 1.55,
          color: textColor,
          opacity: 0.6,
          fontWeight: 400,
        }}
      >
        {feature.description}
      </div>
      {/* Card bottom accent */}
      <div
        style={{
          height: 2,
          width: "100%",
          background: `linear-gradient(90deg, ${accentColor}, ${accentColor}00)`,
          borderRadius: 1,
          marginTop: "auto",
          transform: `scaleX(${interpolate(localFrame, [20, 55], [0, 1], { extrapolateRight: "clamp" })})`,
          transformOrigin: "left center",
        }}
      />
    </div>
  );
}

export const FeatureReveal: React.FC<FeatureRevealProps> = ({
  eyebrow,
  title,
  features,
  theme,
  columns,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const meta = THEME_META[theme];

  const bgOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });

  const headerProgress = spring({ fps, frame: Math.max(0, frame - 8), config: { damping: 200, stiffness: 100 } });
  const headerOpacity = interpolate(frame, [8, 24], [0, 1], { extrapolateRight: "clamp" });
  const headerY = interpolate(headerProgress, [0, 1], [20, 0]);

  const cols = columns === 2 ? 2 : 3;
  const cardDelay = 18; // frames between each card

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(160deg, ${meta.bgFrom} 0%, ${meta.bgTo} 100%)`,
        opacity: bgOpacity,
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
        color: meta.text,
        padding: "60px 100px",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div style={{ opacity: headerOpacity, transform: `translateY(${headerY}px)`, marginBottom: 48 }}>
        <p
          style={{
            fontSize: 16,
            fontWeight: 500,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            opacity: 0.5,
            marginBottom: 16,
          }}
        >
          {eyebrow}
        </p>
        <h2
          style={{
            fontSize: 56,
            fontWeight: 650,
            letterSpacing: "-0.022em",
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          {title}
        </h2>
      </div>

      {/* Feature grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: 24,
          flex: 1,
        }}
      >
        {features.map((feature, i) => (
          <FeatureCard
            key={i}
            feature={feature}
            startFrame={35 + i * cardDelay}
            accentColor={meta.accent}
            textColor={meta.text}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};
