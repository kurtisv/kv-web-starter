import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { VideoHeroSection } from "@/components/sections/video-hero-section";
import { PlayOnceVideo } from "@/components/ui/play-once-video";

export default function VideoDemoPage() {
  return (
    <main>

      {/* Feature reel — 12s cinematic, plays once on scroll, freezes on last frame */}
      <section className="bg-[#07051a] px-0 py-0">
        <PlayOnceVideo
          src="/videos/launch-reel.mp4"
          className="w-full"
          threshold={0.1}
          fallback="Launch reel missing. Run pnpm video:render:reel before shipping cinematic assets."
        />
      </section>

      {/* Background hero — decorative loop + HTML text on top */}
      <VideoHeroSection
        videoSrc="/videos/themes/premium-saas-bg.mp4"
        variant="background"
        overlayOpacity={0.45}
        title="Un boilerplate. 9 identites de projet."
        description="Reservations, SaaS, portfolio, e-commerce — chaque preset reconfigure le theme, la navigation et la logique produit."
        actions={
          <>
            <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 shadow-md">
              <Link href="/demo">Voir les demos <ArrowRight className="size-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10">
              <Link href="/docs">Lire le guide</Link>
            </Button>
          </>
        }
        className="min-h-[60vh] flex flex-col justify-center"
      />

      {/* Stats counter — triggered on scroll, plays once */}
      <section className="border-b bg-background">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="mb-6 text-xs font-medium uppercase tracking-widest text-muted-foreground/50">
            Chiffres cles
          </p>
          <PlayOnceVideo
            src="/videos/stats-counter.mp4"
            className="w-full rounded-xl border shadow-lg"
            threshold={0.3}
          />
        </div>
      </section>

      {/* Feature reveal — triggered on scroll, plays once */}
      <section className="border-b bg-background">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="mb-6 text-xs font-medium uppercase tracking-widest text-muted-foreground/50">
            Stack inclus
          </p>
          <PlayOnceVideo
            src="/videos/feature-reveal.mp4"
            className="w-full rounded-xl border shadow-lg"
            threshold={0.25}
          />
        </div>
      </section>

      {/* Split variant */}
      <VideoHeroSection
        videoSrc="/videos/feature-reveal.mp4"
        variant="split"
        title="Le meme hero, variant split."
        description="Contenu a gauche, video de demonstration a droite. Ideal pour les sections produit ou les landing pages."
        actions={
          <Button asChild size="lg">
            <Link href="/demo">Explorer les demos <ArrowRight className="size-4" /></Link>
          </Button>
        }
      />

    </main>
  );
}
