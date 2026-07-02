import { cn } from "@/lib/utils";

interface StaffUtil {
  staffId: string;
  staffName: string;
  role: string;
  appointmentsToday: number;
  hoursBooked: number;
  hoursAvailable: number;
  utilizationPercent: number;
}

interface StaffUtilizationCardProps {
  staff: StaffUtil[];
  className?: string;
}

function UtilBar({ percent, label }: { percent: number; label: string }) {
  return (
    <div
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${label}: ${percent}%`}
      className="relative h-1.5 w-full rounded-full bg-muted"
    >
      <div
        className={cn(
          "absolute inset-y-0 left-0 rounded-full transition-all",
          percent >= 85 ? "bg-amber-500" : percent >= 60 ? "bg-primary" : "bg-muted-foreground/50"
        )}
        style={{ width: `${Math.min(percent, 100)}%` }}
      />
    </div>
  );
}

export function StaffUtilizationCard({ staff, className }: StaffUtilizationCardProps) {
  return (
    <div className={cn("rounded-xl border bg-card p-5 shadow-sm", className)}>
      <p className="mb-4 text-sm font-medium">Utilisation du personnel</p>
      <div className="space-y-4">
        {staff.map((member) => (
          <div key={member.staffId}>
            <div className="flex items-center justify-between mb-1">
              <div>
                <p className="text-sm font-medium">{member.staffName}</p>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold">{member.utilizationPercent}%</p>
                <p className="text-xs text-muted-foreground">
                  {member.hoursBooked}h / {member.hoursAvailable}h
                </p>
              </div>
            </div>
            <UtilBar percent={member.utilizationPercent} label={member.staffName} />
          </div>
        ))}
      </div>
    </div>
  );
}
