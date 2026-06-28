import * as React from "react";
import Image from "next/image";
import { Phone, Mail, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export interface AgentProfile {
  name: string;
  role?: string;
  phone?: string;
  email?: string;
  rating?: number;
  reviewCount?: number;
  deals?: number;
  photo?: string;
}

interface AgentProfileCardProps {
  agent: AgentProfile;
  onContact?: () => void;
  className?: string;
}

function Initials({ name }: { name: string }) {
  return (
    <span className="text-sm font-semibold text-muted-foreground">
      {name
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0])
        .join("")
        .toUpperCase()}
    </span>
  );
}

export function AgentProfileCard({
  agent,
  onContact,
  className,
}: AgentProfileCardProps) {
  return (
    <Card className={cn("", className)}>
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border bg-muted">
            {agent.photo ? (
              <Image
                src={agent.photo}
                alt={agent.name}
                fill
                className="object-cover"
                sizes="56px"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <Initials name={agent.name} />
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="font-semibold">{agent.name}</p>
            {agent.role && (
              <p className="text-xs text-muted-foreground">{agent.role}</p>
            )}
            <div className="mt-1.5 flex flex-wrap items-center gap-3">
              {agent.rating !== undefined && (
                <span className="flex items-center gap-1 text-xs font-medium">
                  <Star className="h-3 w-3 fill-warning text-warning" />
                  {agent.rating}
                  {agent.reviewCount !== undefined && (
                    <span className="font-normal text-muted-foreground">
                      ({agent.reviewCount} avis)
                    </span>
                  )}
                </span>
              )}
              {agent.deals !== undefined && (
                <Badge variant="soft" size="sm">
                  {agent.deals} ventes
                </Badge>
              )}
            </div>
          </div>
        </div>

        {(agent.phone || agent.email || onContact) && (
          <div className="mt-4 flex gap-2 border-t pt-3">
            {agent.phone && (
              <Button size="sm" variant="outline" className="flex-1" asChild>
                <a href={`tel:${agent.phone}`}>
                  <Phone className="h-3.5 w-3.5" /> Appeler
                </a>
              </Button>
            )}
            {(agent.email || onContact) && (
              <Button size="sm" className="flex-1" onClick={onContact}>
                <Mail className="h-3.5 w-3.5" /> Message
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
