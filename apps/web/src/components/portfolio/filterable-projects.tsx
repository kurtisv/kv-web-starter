"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface ProjectItem {
  title: string;
  description: string;
  tags: string[];
  href?: string;
  photo: string;
  photoAlt: string;
}

interface FilterableProjectsProps {
  items: ProjectItem[];
}

export function FilterableProjects({ items }: FilterableProjectsProps) {
  const allTags = Array.from(new Set(items.flatMap((p) => p.tags)));
  const [active, setActive] = React.useState<string | null>(null);
  const reduced = useReducedMotion();

  const filtered = active ? items.filter((p) => p.tags.includes(active)) : items;

  return (
    <div>
      {/* Filter bar */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setActive(null)}
          className={cn(
            "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
            active === null
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-background text-foreground hover:border-primary/50"
          )}
        >
          Tous ({items.length})
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActive(tag === active ? null : tag)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              active === tag
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-foreground hover:border-primary/50"
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid gap-5 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => (
            <motion.div
              key={item.title}
              layout={!reduced}
              initial={reduced ? undefined : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="group h-full overflow-hidden">
                <div className="relative aspect-video overflow-hidden border-b bg-muted">
                  <Image
                    src={item.photo}
                    alt={item.photoAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    {item.href && (
                      <a
                        href={item.href}
                        className="mt-0.5 shrink-0 text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant={tag === active ? "primary" : "outline"}
                        size="sm"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="py-12 text-center text-sm text-muted-foreground">
          Aucun projet pour ce filtre.
        </div>
      )}
    </div>
  );
}
