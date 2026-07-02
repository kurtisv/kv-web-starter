import { MetricCard, MetricGrid } from "@/components/dashboard-ui/metric-card";
import { DEMO_METRICS } from "@/lib/demo-data/saas-demo-data";
import {
  DollarSign,
  TrendingUp,
  Users,
  Activity,
  Zap,
  MessageSquare,
  Server,
} from "lucide-react";

export function SaasKpiGrid() {
  return (
    <MetricGrid className="sm:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        label="MRR"
        value={DEMO_METRICS.mrr.value}
        trend={{ value: DEMO_METRICS.mrr.trend + " ce mois", direction: DEMO_METRICS.mrr.direction }}
        icon={<DollarSign className="h-4 w-4" />}
      />
      <MetricCard
        label="ARR"
        value={DEMO_METRICS.arr.value}
        trend={{ value: DEMO_METRICS.arr.trend + " cette annee", direction: DEMO_METRICS.arr.direction }}
        icon={<TrendingUp className="h-4 w-4" />}
      />
      <MetricCard
        label="Utilisateurs actifs"
        value={DEMO_METRICS.activeUsers.value}
        trend={{ value: DEMO_METRICS.activeUsers.trend + " cette semaine", direction: DEMO_METRICS.activeUsers.direction }}
        icon={<Users className="h-4 w-4" />}
      />
      <MetricCard
        label="Churn rate"
        value={DEMO_METRICS.churnRate.value}
        trend={{ value: DEMO_METRICS.churnRate.trend + " ce mois", direction: DEMO_METRICS.churnRate.direction }}
        icon={<Activity className="h-4 w-4" />}
      />
      <MetricCard
        label="Activation"
        value={DEMO_METRICS.activationRate.value}
        trend={{ value: DEMO_METRICS.activationRate.trend + " ce mois", direction: DEMO_METRICS.activationRate.direction }}
        icon={<Zap className="h-4 w-4" />}
      />
      <MetricCard
        label="NPS"
        value={DEMO_METRICS.nps.value}
        trend={{ value: DEMO_METRICS.nps.trend + " points", direction: DEMO_METRICS.nps.direction }}
        icon={<MessageSquare className="h-4 w-4" />}
      />
      <MetricCard
        label="Uptime"
        value={DEMO_METRICS.uptime.value}
        trend={{ value: DEMO_METRICS.uptime.trend, direction: DEMO_METRICS.uptime.direction }}
        icon={<Server className="h-4 w-4" />}
      />
      <MetricCard
        label="Rev. / user"
        value={DEMO_METRICS.avgRevenuePerUser.value}
        trend={{ value: DEMO_METRICS.avgRevenuePerUser.trend + " vs M-1", direction: DEMO_METRICS.avgRevenuePerUser.direction }}
        icon={<DollarSign className="h-4 w-4" />}
      />
    </MetricGrid>
  );
}
