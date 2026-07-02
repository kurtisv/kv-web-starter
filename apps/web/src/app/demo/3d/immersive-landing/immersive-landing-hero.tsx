"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThreeDCanvas } from "@/components/three-d/three-d-canvas";
import { ThreeDFallback } from "@/components/three-d/three-d-fallback";
import { PerformanceBadge } from "@/components/three-d/performance-badge";
import { ScrollSceneSection } from "@/components/three-d/scroll-scene-section";
import { ImmersiveLandingScene } from "@/components/three-d/immersive-landing-scene";

/**
 * Client hero for OrbitStack Studio: a scroll-reactive 3D backdrop behind
 * server-friendly hero copy. The canvas is decorative (aria-hidden text
 * lives outside it); without WebGL or with reduced motion, a static
 * gradient composition takes its place and the copy stays intact.
 */
export function ImmersiveLandingHero() {
  const staticBackdrop = (
    <ThreeDFallback
      variant="landing"
      label="Composition abstraite representant l'atelier OrbitStack"
      className="absolute inset-0 min-h-0 rounded-none"
    />
  );

  return (
    <ScrollSceneSection
      aria-label="Introduction OrbitStack Studio"
      className="relative overflow-hidden bg-slate-950"
    >
      {/* 3D backdrop */}
      <div className="absolute inset-0" aria-hidden="true">
        <ThreeDCanvas
          aria-label="Scene 3D decorative: panneaux flottants et formes en orbite"
          className="h-full min-h-0"
          camera={{ position: [0, 0.2, 6.5], fov: 45 }}
          performance="balanced"
          fallback={staticBackdrop}
          reducedMotionFallback={staticBackdrop}
        >
          <ImmersiveLandingScene />
        </ThreeDCanvas>
        {/* Readability scrim over the canvas */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/40 to-slate-950/90" />
      </div>

      {/* Hero copy (always DOM, always readable) */}
      <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col items-start justify-center px-6 py-24">
        <PerformanceBadge />
        <p className="mt-6 text-sm font-medium text-teal-300">
          OrbitStack Studio - agence fictive
        </p>
        <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Des experiences web qui ont de la profondeur
        </h1>
        <p className="mt-4 max-w-xl text-lg text-slate-300">
          Cette landing demontre comment le boilerplate produit une page
          immersive: scene 3D legere, contenu lisible, performances tenues
          sur mobile.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="#capacites">
              Explorer les capacites
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            <Link href="/demo/3d">Voir les demos 3D</Link>
          </Button>
        </div>
      </div>
    </ScrollSceneSection>
  );
}
