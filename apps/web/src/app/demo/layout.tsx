import Link from "next/link";
import { ArrowLeft, Boxes, LayoutGrid, Palette, Layers, Wand2 } from "lucide-react";

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Top demo nav — sticky, discreet, always visible */}
      <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-10 max-w-6xl items-center gap-4 px-6">
          {/* Back to gallery */}
          <Link
            href="/demo"
            className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Demos
          </Link>

          {/* Separator */}
          <span className="h-3.5 w-px bg-border" aria-hidden="true" />

          {/* Quick links */}
          <nav className="flex items-center gap-3" aria-label="Navigation demos">
            <Link
              href="/"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Accueil
            </Link>
            <Link
              href="/demo/design-lab"
              className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Palette className="h-3 w-3" />
              Design Lab
            </Link>
            <Link
              href="/demo/components"
              className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Layers className="h-3 w-3" />
              Composants
            </Link>
            <Link
              href="/prototype"
              className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Wand2 className="h-3 w-3" />
              Prototype
            </Link>
            <Link
              href="/demo/3d"
              className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Boxes className="h-3 w-3" />
              3D
            </Link>
          </nav>

          {/* Demo badge — right-aligned */}
          <div className="ml-auto flex items-center gap-1.5">
            <LayoutGrid className="h-3 w-3 text-primary" aria-hidden="true" />
            <span className="text-xs font-medium text-primary">Demo</span>
          </div>
        </div>
      </div>

      {/* Page content */}
      {children}

      {/* Demo footer */}
      <footer className="border-t bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                Accueil
              </Link>
              <Link href="/demo" className="hover:text-foreground transition-colors">
                Galerie des demos
              </Link>
              <Link href="/demo/design-lab" className="hover:text-foreground transition-colors">
                Design Lab
              </Link>
              <Link href="/demo/components" className="hover:text-foreground transition-colors">
                Composants
              </Link>
              <Link href="/prototype" className="hover:text-foreground transition-colors">
                Prototype Engine
              </Link>
              <Link href="/demo/3d" className="hover:text-foreground transition-colors">
                Demos 3D
              </Link>
              <Link href="/showcase/component-ui-polish" className="hover:text-foreground transition-colors">
                Showcase
              </Link>
            </div>
            <p className="text-xs text-muted-foreground">
              KV Web Starter &mdash; boilerplate multi-client
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
