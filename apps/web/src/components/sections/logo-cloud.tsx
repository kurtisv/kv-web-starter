import * as React from "react";
import { cn } from "@/lib/utils";

interface LogoCloudProps {
  label?: string;
  logos: { name: string; logo: React.ReactNode }[];
  className?: string;
}

export function LogoCloud({ label, logos, className }: LogoCloudProps) {
  return (
    <section className={cn("border-y bg-muted/30", className)}>
      <div className="mx-auto max-w-6xl px-6 py-10">
        {label && (
          <p className="mb-6 text-center text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {label}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {logos.map((item) => (
            <div
              key={item.name}
              className="flex h-8 items-center text-muted-foreground opacity-60 transition-opacity duration-200 hover:opacity-100"
              title={item.name}
            >
              {item.logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
