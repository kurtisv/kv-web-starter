import { BookingDemoNav } from "./booking-demo-nav";

interface BookingDemoShellProps {
  children: React.ReactNode;
}

export function BookingDemoShell({ children }: BookingDemoShellProps) {
  return (
    <div data-theme="local-business" className="min-h-screen bg-background">
      <BookingDemoNav />
      {children}
    </div>
  );
}
