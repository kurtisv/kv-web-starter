import * as React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface ShowcaseItem {
  title: string;
  description: string;
  tags?: string[];
  href?: string;
  image?: React.ReactNode;
}

interface ProjectShowcaseProps {
  eyebrow?: string;
  title?: React.ReactNode;
  items: ShowcaseItem[];
  columns?: 2 | 3;
  className?: string;
}

export function ProjectShowcase({ eyebrow, title, items, columns = 2, className }: ProjectShowcaseProps) {
  return (
    <section className={cn("bg-background", className)}>
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        {(eyebrow || title) && (
          <div className="mb-10">
            {eyebrow && (
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {eyebrow}
              </p>
            )}
            {title && <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>}
          </div>
        )}
        <div className={cn("grid gap-6", columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2")}>
          {items.map((item, i) => (
            <Card key={i} className="group overflow-hidden">
              {item.image && (
                <div className="aspect-video w-full overflow-hidden border-b bg-muted">
                  {item.image}
                </div>
              )}
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  {item.href && (
                    <a href={item.href} className="mt-0.5 shrink-0 text-muted-foreground hover:text-foreground">
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
                {item.tags && item.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="outline" size="sm">{tag}</Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
