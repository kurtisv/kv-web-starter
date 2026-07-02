import { SaasDemoNav } from "./saas-demo-nav";

interface SaasDemoShellProps {
  children: React.ReactNode;
}

export function SaasDemoShell({ children }: SaasDemoShellProps) {
  return (
    <div data-theme="premium-saas" className="min-h-screen bg-background">
      <SaasDemoNav />
      <main>{children}</main>
    </div>
  );
}
