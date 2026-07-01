import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DESIGN_PROFILES, DESIGN_PROFILE_IDS, type DesignProfile } from "@/design-system/design-profiles";

const BG_CLASS: Record<string, string> = {
  "flat":          "",
  "soft-gradient": "bg-profile-soft-gradient",
  "noise":         "bg-profile-noise",
  "grid-lines":    "bg-profile-grid",
  "dark-depth":    "bg-profile-dark-depth",
};

const CARD_CLASS: Record<string, string> = {
  "clean":           "",
  "glass-elevated":  "card-glass",
  "bordered-sharp":  "border-2",
  "warm-tinted":     "bg-muted/50",
  "dark-elevated":   "card-dark-elevated",
};

const TEXT_CLASS: Record<string, string> = {
  "none":      "",
  "soft":      "text-gradient-primary",
  "strong":    "text-gradient-primary",
  "editorial": "text-gradient-editorial",
};

const ACCENT_CLASS: Record<string, string> = {
  "fill":     "bg-primary text-primary-foreground",
  "outline":  "border border-primary text-primary bg-transparent",
  "ghost":    "text-primary bg-transparent",
  "gradient": "btn-gradient",
  "glow":     "accent-glow bg-primary text-primary-foreground",
};

const MOOD_COLOR: Record<string, string> = {
  "professional": "bg-blue-100 text-blue-800",
  "warm":         "bg-orange-100 text-orange-800",
  "dark":         "bg-zinc-800 text-zinc-100",
  "premium":      "bg-violet-100 text-violet-800",
  "creative":     "bg-pink-100 text-pink-800",
  "technical":    "bg-cyan-100 text-cyan-800",
  "minimal":      "bg-gray-100 text-gray-700",
  "editorial":    "bg-amber-100 text-amber-800",
  "cinematic":    "bg-red-900 text-red-100",
  "commercial":   "bg-green-100 text-green-800",
};

function ProfileCard({ profile }: { profile: DesignProfile }) {
  const bgClass = BG_CLASS[profile.backgroundStyle] ?? "";
  const cardClass = CARD_CLASS[profile.cardStyle] ?? "";
  const textClass = TEXT_CLASS[profile.gradient] ?? "";
  const accentClass = ACCENT_CLASS[profile.accentTreatment] ?? "";

  return (
    <div
      className={`relative overflow-hidden rounded-xl border p-6 transition-shadow hover:shadow-lg ${bgClass}`}
      style={{ minHeight: "320px" }}
    >
      {/* Profile header */}
      <div className="mb-4">
        <p className="mb-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          {profile.id}
        </p>
        <h3 className={`text-2xl font-bold leading-tight ${textClass}`}>
          {profile.label}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {profile.description}
        </p>
      </div>

      {/* Mood tags */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {profile.mood.map((m) => (
          <span
            key={m}
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${MOOD_COLOR[m] ?? "bg-muted text-muted-foreground"}`}
          >
            {m}
          </span>
        ))}
      </div>

      {/* Sample card showing card style */}
      <div className={`mb-4 rounded-lg border p-4 ${cardClass}`}>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Card style: {profile.cardStyle}
        </p>
        <div className="mt-2 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
          <span>bg: {profile.backgroundStyle}</span>
          <span>radius: {profile.radius}</span>
          <span>shadow: {profile.shadow}</span>
          <span>motion: {profile.motionStyle}</span>
          <span>density: {profile.density}</span>
          <span>gradient: {profile.gradient}</span>
        </div>
      </div>

      {/* Accent treatment sample */}
      <div className="flex items-center gap-3">
        <button
          className={`rounded-md px-4 py-1.5 text-sm font-medium transition-all ${accentClass}`}
        >
          CTA
        </button>
        <span className="text-xs text-muted-foreground">
          accent: {profile.accentTreatment}
        </span>
      </div>

      {/* Domains */}
      <div className="mt-4 flex flex-wrap gap-1">
        {profile.recommendedDomains.map((d) => (
          <span
            key={d}
            className="rounded border border-border bg-background/60 px-1.5 py-0.5 text-xs text-muted-foreground"
          >
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function DesignLabPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/80 backdrop-blur sticky top-0 z-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-lg font-semibold">Design Lab</h1>
            <p className="text-xs text-muted-foreground">
              {DESIGN_PROFILE_IDS.length} profils visuels — design enhancement layer
            </p>
          </div>
          <Link
            href="/demo"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Demos <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>

      {/* Intro */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
            Design Enhancement Layer
          </p>
          <h2 className="text-3xl font-bold tracking-tight mb-3">
            Chaque preset a sa{" "}
            <span className="text-gradient-primary">personnalite visuelle</span>
          </h2>
          <p className="text-muted-foreground">
            Les profils definissent le COMMENT (glass, bruit, gradients, radius, motion) au-dela du QUE
            (couleurs du theme). Un theme violet + profil premium-saas = tres different d&apos;un theme
            violet + profil minimal-dashboard.
          </p>
        </div>

        {/* CSS Utility Showcase */}
        <section className="mb-12">
          <h3 className="mb-4 text-lg font-semibold">Utilities CSS disponibles</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border p-5 bg-profile-soft-gradient relative overflow-hidden">
              <p className="font-medium text-sm">soft-gradient</p>
              <p className="text-xs text-muted-foreground mt-1">bg-profile-soft-gradient</p>
            </div>
            <div className="rounded-xl border p-5 bg-profile-noise relative overflow-hidden">
              <p className="font-medium text-sm">noise</p>
              <p className="text-xs text-muted-foreground mt-1">bg-profile-noise</p>
            </div>
            <div className="rounded-xl border p-5 bg-profile-grid">
              <p className="font-medium text-sm">grid lines</p>
              <p className="text-xs text-muted-foreground mt-1">bg-profile-grid</p>
            </div>
            <div className="rounded-xl border p-5 bg-profile-dark-depth">
              <p className="font-medium text-sm">dark depth</p>
              <p className="text-xs text-muted-foreground mt-1">bg-profile-dark-depth</p>
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border bg-card p-5">
              <p className="text-sm font-bold text-gradient-primary">text-gradient-primary</p>
              <p className="text-xs text-muted-foreground mt-1">headline gradient via primary + accent</p>
            </div>
            <div className="rounded-xl border bg-card p-5">
              <p className="text-sm font-bold text-gradient-editorial">text-gradient-editorial</p>
              <p className="text-xs text-muted-foreground mt-1">foreground → primary → accent sweep</p>
            </div>
            <div className="rounded-xl border card-glass p-5">
              <p className="text-sm font-medium">card-glass</p>
              <p className="text-xs text-muted-foreground mt-1">backdrop-filter blur + semi-transparent bg</p>
            </div>
          </div>
        </section>

        {/* Profile Cards Grid */}
        <section>
          <h3 className="mb-4 text-lg font-semibold">
            {DESIGN_PROFILE_IDS.length} profils visuels
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {DESIGN_PROFILE_IDS.map((id) => (
              <ProfileCard key={id} profile={DESIGN_PROFILES[id]} />
            ))}
          </div>
        </section>

        {/* Usage note */}
        <section className="mt-12 rounded-xl border bg-muted/30 p-6">
          <h3 className="mb-2 font-semibold">Comment utiliser les profils</h3>
          <div className="grid gap-4 text-sm text-muted-foreground sm:grid-cols-3">
            <div>
              <p className="font-medium text-foreground mb-1">1. Importer</p>
              <code className="block rounded bg-muted px-3 py-2 text-xs">
                import {'{'} getProfileForPreset {'}'}<br />
                from &quot;@/design-system/design-profiles&quot;
              </code>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">2. Recuperer le profil</p>
              <code className="block rounded bg-muted px-3 py-2 text-xs">
                const profile = getProfileForPreset(&quot;saas&quot;)
              </code>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">3. Appliquer les classes</p>
              <code className="block rounded bg-muted px-3 py-2 text-xs">
                &lt;div className={'{'}bgClasses[profile.backgroundStyle]{'}'}&gt;
              </code>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
