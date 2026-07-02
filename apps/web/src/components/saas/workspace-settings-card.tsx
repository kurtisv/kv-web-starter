"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { notify } from "@/components/ui/use-toast";
import { DEMO_PRODUCT } from "@/lib/demo-data/saas-demo-data";

export function WorkspaceSettingsCard() {
  const [name, setName] = React.useState(DEMO_PRODUCT.workspace);
  const [slug, setSlug] = React.useState(DEMO_PRODUCT.workspaceSlug);
  const [dirty, setDirty] = React.useState(false);
  const [saving, setSaving] = React.useState(false);

  function handleChange(setter: (v: string) => void) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      setDirty(true);
    };
  }

  function handleSave() {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setDirty(false);
      notify.success("Parametres sauvegardes", "Workspace mis a jour (demo mode).");
    }, 800);
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">Profil workspace</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-1.5">
          <Label htmlFor="ws-name" className="text-xs">Nom du workspace</Label>
          <Input
            id="ws-name"
            value={name}
            onChange={handleChange(setName)}
            placeholder="Mon Entreprise"
            className="h-8 text-sm"
          />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="ws-slug" className="text-xs">Identifiant (slug)</Label>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">app.launchpilot.io/</span>
            <Input
              id="ws-slug"
              value={slug}
              onChange={handleChange(setSlug)}
              placeholder="mon-entreprise"
              className="h-8 flex-1 text-sm font-mono"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={handleSave}
            disabled={!dirty || saving}
          >
            {saving ? "Sauvegarde..." : "Sauvegarder"}
          </Button>
          {dirty && !saving && (
            <span className="text-xs text-warning">Modifications non sauvegardees</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
