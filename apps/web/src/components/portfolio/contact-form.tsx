"use client";

import * as React from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export function ContactForm() {
  const { toast } = useToast();
  const [pending, setPending] = React.useState(false);
  const [fields, setFields] = React.useState({ name: "", email: "", message: "" });

  function setField(key: keyof typeof fields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields((f) => ({ ...f, [key]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fields.name || !fields.email || !fields.message) {
      toast.error("Champs manquants", "Merci de remplir tous les champs.");
      return;
    }
    setPending(true);
    await new Promise((r) => setTimeout(r, 900));
    setPending(false);
    setFields({ name: "", email: "", message: "" });
    toast.success("Message envoye !", "Je vous repondrai dans les 48 h.");
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <label htmlFor="pf-name" className="text-sm font-medium">
            Nom
          </label>
          <Input
            id="pf-name"
            placeholder="Marie Dupont"
            value={fields.name}
            onChange={setField("name")}
            disabled={pending}
          />
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="pf-email" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="pf-email"
            type="email"
            placeholder="marie@exemple.com"
            value={fields.email}
            onChange={setField("email")}
            disabled={pending}
          />
        </div>
      </div>
      <div className="grid gap-1.5">
        <label htmlFor="pf-message" className="text-sm font-medium">
          Message
        </label>
        <Textarea
          id="pf-message"
          placeholder="Decrivez votre projet en quelques lignes..."
          rows={5}
          value={fields.message}
          onChange={setField("message")}
          disabled={pending}
        />
      </div>
      <Button type="submit" disabled={pending} className="w-full sm:w-auto">
        {pending ? "Envoi en cours..." : <><Send className="h-4 w-4" /> Envoyer le message</>}
      </Button>
    </form>
  );
}
