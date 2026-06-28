"use client";

import * as React from "react";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface WebhookTesterProps {
  defaultUrl?: string;
  onSend?: (payload: { url: string; event: string }) => Promise<void> | void;
}

export function WebhookTester({ defaultUrl = "", onSend }: WebhookTesterProps) {
  const { toast } = useToast();
  const [url, setUrl] = React.useState(defaultUrl);
  const [event, setEvent] = React.useState("booking.created");
  const [sent, setSent] = React.useState(false);

  const submit = async (eventObject: React.FormEvent) => {
    eventObject.preventDefault();
    try {
      await onSend?.({ url, event });
      setSent(true);
      toast.success("Webhook teste", event);
    } catch (error) {
      toast.error("Erreur webhook", error instanceof Error ? error.message : "Impossible d'envoyer le test.");
    }
  };

  return (
    <form onSubmit={submit} className="grid gap-3 border bg-background p-4">
      <div className="grid gap-2">
        <label htmlFor="webhook-url" className="text-sm font-medium">Endpoint webhook</label>
        <Input
          id="webhook-url"
          type="url"
          value={url}
          onChange={(eventObject) => setUrl(eventObject.target.value)}
          placeholder="https://example.com/webhooks/kv"
          required
        />
      </div>
      <div className="grid gap-2">
        <span className="text-sm font-medium">Evenement</span>
        <Select
          value={event}
          onValueChange={setEvent}
          options={[
            { value: "booking.created", label: "booking.created" },
            { value: "api_key.created", label: "api_key.created" },
            { value: "invoice.paid", label: "invoice.paid" },
          ]}
        />
      </div>
      <Button type="submit">
        <Send className="h-4 w-4" />
        Envoyer un test
      </Button>
      {sent && <p className="text-sm text-success">Payload de test envoye.</p>}
    </form>
  );
}
