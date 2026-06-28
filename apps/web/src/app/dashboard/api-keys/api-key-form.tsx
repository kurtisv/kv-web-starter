"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { createDashboardApiKey, type CreateApiKeyState } from "@/app/actions/api-keys";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NewApiKeyReveal } from "@/components/api-portal/api-key-display";
import { zodFormResolver } from "@/lib/zod-form-resolver";

const apiKeySchema = z.object({
  name: z.string().min(1, "Le nom est requis").max(64, "Nom trop long"),
  scopes: z.string().min(0),
});

type ApiKeyFormData = z.infer<typeof apiKeySchema>;

export function ApiKeyForm() {
  const [createdKey, setCreatedKey] = useState<CreateApiKeyState>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ApiKeyFormData>({
    resolver: zodFormResolver(apiKeySchema),
    defaultValues: { name: "", scopes: "demo:read" },
  });

  const onSubmit = async (data: ApiKeyFormData) => {
    const formData = new FormData();
    formData.set("name", data.name);
    formData.set("scopes", data.scopes);

    const result = await createDashboardApiKey(null, formData);

    if (result?.ok) {
      setCreatedKey(result);
      reset();
      toast.success("Cle API creee. Copiez-la maintenant — elle ne sera plus visible.");
    } else {
      toast.error(result?.error ?? "Erreur lors de la creation.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Creer une cle</CardTitle>
        <CardDescription>La cle complete apparait une seule fois apres creation.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <FormField>
            <Label htmlFor="name">Nom</Label>
            <Input id="name" placeholder="Production" {...register("name")} />
            {errors.name && <FormMessage>{errors.name.message}</FormMessage>}
          </FormField>

          <FormField>
            <Label htmlFor="scopes">Scopes</Label>
            <Input id="scopes" placeholder="demo:read scores:read" {...register("scopes")} />
            <p className="text-xs text-muted-foreground">Separez plusieurs scopes par des espaces.</p>
            {errors.scopes && <FormMessage>{errors.scopes.message}</FormMessage>}
          </FormField>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creation..." : "Creer la cle API"}
          </Button>
        </Form>

        {createdKey?.ok && (
          <NewApiKeyReveal plainTextKey={createdKey.plainTextKey} />
        )}
      </CardContent>
    </Card>
  );
}
