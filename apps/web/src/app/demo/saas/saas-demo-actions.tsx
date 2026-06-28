"use client";

import * as React from "react";
import { ArrowUp, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UpgradeModal } from "@/components/saas/upgrade-modal";
import { CancelSubscriptionDialog } from "@/components/saas/cancel-subscription-dialog";

export function SaasDemoActions() {
  const [upgradeOpen, setUpgradeOpen] = React.useState(false);
  const [cancelOpen, setCancelOpen] = React.useState(false);

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={() => setUpgradeOpen(true)}>
            <ArrowUp className="h-3.5 w-3.5" /> Changer de plan
          </Button>
          <Badge variant="outline" size="sm" className="font-mono text-[10px]">UpgradeModal</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" onClick={() => setCancelOpen(true)} className="text-muted-foreground hover:text-destructive">
            <XCircle className="h-3.5 w-3.5" /> Resilier
          </Button>
          <Badge variant="outline" size="sm" className="font-mono text-[10px]">CancelSubscriptionDialog</Badge>
        </div>
      </div>

      <UpgradeModal open={upgradeOpen} onOpenChange={setUpgradeOpen} currentPlan="Starter" />
      <CancelSubscriptionDialog open={cancelOpen} onOpenChange={setCancelOpen} plan="Pro" />
    </>
  );
}
