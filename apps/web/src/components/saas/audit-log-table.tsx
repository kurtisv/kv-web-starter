import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuditLogTimeline } from "@/components/dashboard-ui/audit-log-timeline";
import { DEMO_AUDIT_LOGS } from "@/lib/demo-data/saas-demo-data";

export function AuditLogTable() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">Journal d&apos;audit</CardTitle>
      </CardHeader>
      <CardContent>
        <AuditLogTimeline items={DEMO_AUDIT_LOGS} />
      </CardContent>
    </Card>
  );
}
