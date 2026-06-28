"use client";

import * as React from "react";
import { Save } from "lucide-react";
import { useFormStatus } from "react-dom";

import { AvatarUpload } from "@/components/ui/avatar-upload";
import { FileDropzone } from "@/components/ui/file-dropzone";
import { FileUploadQueue, type QueueItem } from "@/components/ui/file-upload-queue";
import { MediaGrid, type MediaItem } from "@/components/ui/media-grid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

// ---------------------------------------------------------------------------
// Profile section
// ---------------------------------------------------------------------------

interface SettingsProfileSectionProps {
  name?: string | null;
  email?: string | null;
  avatarSrc?: string | null;
  action?: (formData: FormData) => void | Promise<void>;
}

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      <Save className="h-4 w-4" />
      {pending ? "Enregistrement..." : "Sauvegarder"}
    </Button>
  );
}

export function SettingsProfileSection({
  name,
  email,
  avatarSrc,
  action,
}: SettingsProfileSectionProps) {
  const [avatarFile, setAvatarFile] = React.useState<File | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profil</CardTitle>
        <CardDescription>Informations affichees dans le dashboard et les emails.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          action={action}
          className="grid gap-6"
          onSubmit={!action ? (e) => e.preventDefault() : undefined}
        >
          <div className="flex flex-wrap items-start gap-6">
            <div className="flex flex-col items-center gap-2">
              <AvatarUpload
                src={avatarSrc}
                name={name ?? ""}
                size="xl"
                onChange={setAvatarFile}
              />
              <p className="text-xs text-muted-foreground">
                {avatarFile ? avatarFile.name : "Cliquer pour changer"}
              </p>
            </div>

            <div className="grid min-w-0 flex-1 gap-4">
              <div className="grid gap-1.5">
                <Label htmlFor="settings-name">Nom complet</Label>
                <Input
                  id="settings-name"
                  name="name"
                  defaultValue={name ?? ""}
                  placeholder="Jane Dupont"
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="settings-email">Email</Label>
                <Input
                  id="settings-email"
                  name="email"
                  type="email"
                  defaultValue={email ?? ""}
                  placeholder="jane@exemple.com"
                  readOnly={!action}
                  className={!action ? "cursor-default opacity-70" : ""}
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="settings-bio">Bio</Label>
                <Textarea
                  id="settings-bio"
                  name="bio"
                  placeholder="Quelques mots sur vous..."
                  rows={3}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <SaveButton />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Business info section
// ---------------------------------------------------------------------------

interface SettingsBusinessSectionProps {
  businessName?: string | null;
  businessUrl?: string | null;
  action?: (formData: FormData) => void | Promise<void>;
}

export function SettingsBusinessSection({
  businessName,
  businessUrl,
  action,
}: SettingsBusinessSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Entreprise</CardTitle>
        <CardDescription>Nom, URL et description affichees sur votre page publique.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="grid gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="settings-business-name">Nom</Label>
            <Input
              id="settings-business-name"
              name="businessName"
              defaultValue={businessName ?? ""}
              placeholder="Mon Entreprise"
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="settings-business-url">URL publique</Label>
            <Input
              id="settings-business-url"
              name="businessUrl"
              defaultValue={businessUrl ?? ""}
              placeholder="https://exemple.com"
              type="url"
            />
          </div>
          <div className="flex justify-end">
            <SaveButton />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Media library section
// ---------------------------------------------------------------------------

// Simulated upload: creates an object URL so the preview works locally.
// In production, replace this with a real upload to Supabase Storage / S3 / etc.
async function mockUpload(file: File): Promise<{ url: string }> {
  await new Promise((r) => setTimeout(r, 600 + Math.random() * 800));
  return { url: URL.createObjectURL(file) };
}

export function SettingsMediaSection() {
  const { toast } = useToast();
  const [queueItems, setQueueItems] = React.useState<QueueItem[]>([]);
  const [mediaItems, setMediaItems] = React.useState<MediaItem[]>([]);

  async function uploadFile(file: File) {
    setQueueItems((prev) => [
      ...prev,
      { file, status: "uploading", progress: 0 },
    ]);
    try {
      const { url } = await mockUpload(file);
      setQueueItems((prev) =>
        prev.map((q) =>
          q.file === file ? { ...q, status: "done", progress: 100, url } : q
        )
      );
      setMediaItems((prev) => [
        ...prev,
        {
          id: `${Date.now()}-${file.name}`,
          src: url,
          name: file.name,
          type: file.type,
          sizeMb: file.size / 1024 / 1024,
        },
      ]);
      toast.success("Fichier ajoute", file.name);
    } catch (err) {
      toast.error("Upload echoue", err instanceof Error ? err.message : file.name);
      setQueueItems((prev) =>
        prev.map((q) =>
          q.file === file
            ? { ...q, status: "error", error: err instanceof Error ? err.message : "Erreur d'envoi" }
            : q
        )
      );
    }
  }

  function handleFiles(files: File[]) {
    files.forEach(uploadFile);
  }

  function removeMedia(id: string) {
    setMediaItems((prev) => {
      const item = prev.find((m) => m.id === id);
      if (item?.src?.startsWith("blob:")) URL.revokeObjectURL(item.src);
      if (item) toast.info("Media retire", item.name);
      return prev.filter((m) => m.id !== id);
    });
  }

  function removeQueueItem(index: number) {
    setQueueItems((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mediatheque</CardTitle>
        <CardDescription>
          Images et fichiers du projet. Connectez Supabase Storage ou S3 pour persister les uploads.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <FileDropzone
          accept="image/*,video/*,.pdf"
          maxSizeMb={20}
          maxFiles={10}
          multiple
          onFiles={handleFiles}
          label="Deposer des images, videos ou PDF"
        />

        <FileUploadQueue
          items={queueItems}
          onRemove={removeQueueItem}
        />

        {mediaItems.length > 0 && (
          <MediaGrid
            items={mediaItems}
            onRemove={removeMedia}
            columns={4}
            accept="image/*,video/*,.pdf"
            maxSizeMb={20}
          />
        )}
      </CardContent>
    </Card>
  );
}
