import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur-sm">
        <div className="mx-auto flex h-10 max-w-6xl items-center px-6">
          <Link
            href="/demo"
            className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Galerie des démos
          </Link>
        </div>
      </div>
      {children}
    </>
  );
}
