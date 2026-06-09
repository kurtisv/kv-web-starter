import { DashboardHeader } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { auth } from "@/lib/auth";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <div className="min-h-screen bg-muted text-foreground">
      <Sidebar />
      <div className="lg:pl-64">
        <DashboardHeader session={session} />
        {children}
      </div>
    </div>
  );
}
