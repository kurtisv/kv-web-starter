import {
  Shield,
  Database,
  CreditCard,
  Mail,
  HardDrive,
  Layers,
  FlaskConical,
  Zap,
  Globe,
  BarChart2,
  Users,
  Bell,
  Box,
  Code2,
  FileCode,
  Palette,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface Capability {
  icon: React.ReactNode;
  label: string;
  description: string;
  group: string;
}

const CAPABILITIES: Capability[] = [
  { icon: <Shield className="h-4 w-4" />, label: "Auth", description: "Demo login + GitHub OAuth", group: "Core" },
  { icon: <Database className="h-4 w-4" />, label: "Database", description: "Prisma ORM + mock mode", group: "Core" },
  { icon: <Palette className="h-4 w-4" />, label: "9 themes", description: "CSS preset design systems", group: "Core" },
  { icon: <Layers className="h-4 w-4" />, label: "60+ composants", description: "Design system complet", group: "Core" },
  { icon: <CreditCard className="h-4 w-4" />, label: "Paiements", description: "Mock + Stripe-ready", group: "Business" },
  { icon: <Mail className="h-4 w-4" />, label: "Emails", description: "Console + Resend-ready", group: "Business" },
  { icon: <HardDrive className="h-4 w-4" />, label: "Uploads", description: "Local + S3/R2/Azure/Supabase", group: "Business" },
  { icon: <Bell className="h-4 w-4" />, label: "Notifications", description: "Toasts + notification bell", group: "Business" },
  { icon: <Box className="h-4 w-4" />, label: "E-commerce", description: "Cart, checkout, orders", group: "Modules" },
  { icon: <BarChart2 className="h-4 w-4" />, label: "Dashboard", description: "Metrics, tables, audit logs", group: "Modules" },
  { icon: <Globe className="h-4 w-4" />, label: "API portal", description: "Keys, rate limits, docs", group: "Modules" },
  { icon: <Users className="h-4 w-4" />, label: "Reservations", description: "Staff, slots, confirmation", group: "Modules" },
  { icon: <Zap className="h-4 w-4" />, label: "Animations", description: "Framer Motion scroll-reveal", group: "Frontend" },
  { icon: <Code2 className="h-4 w-4" />, label: "3D layer", description: "Three.js + R3F + Drei", group: "Frontend" },
  { icon: <FileCode className="h-4 w-4" />, label: "TypeScript strict", description: "Full type safety", group: "Quality" },
  { icon: <FlaskConical className="h-4 w-4" />, label: "Tests", description: "Vitest + Playwright E2E", group: "Quality" },
];

interface DemoCapabilityGridProps {
  className?: string;
}

export function DemoCapabilityGrid({ className }: DemoCapabilityGridProps) {
  return (
    <div className={cn("grid gap-3 sm:grid-cols-2 md:grid-cols-4", className)}>
      {CAPABILITIES.map((cap) => (
        <div
          key={cap.label}
          className="flex items-start gap-3 rounded-lg border bg-card p-3 text-sm"
        >
          <div className="mt-0.5 shrink-0 rounded-md bg-primary/10 p-1.5 text-primary">
            {cap.icon}
          </div>
          <div>
            <p className="font-medium leading-tight">{cap.label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{cap.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
