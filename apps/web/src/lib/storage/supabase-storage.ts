/**
 * Supabase Storage adapter.
 *
 * Required packages (install when activating this adapter):
 *   pnpm add @supabase/supabase-js
 *
 * Required env vars:
 *   SUPABASE_URL=https://<project>.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
 *   SUPABASE_STORAGE_BUCKET=uploads
 */
import type { StorageAdapter, StoredFile } from "./types";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`[SupabaseStorageAdapter] Missing env var: ${name}`);
  return value;
}

export class SupabaseStorageAdapter implements StorageAdapter {
  private getClient() {
    // Dynamic import so the app builds even without @supabase/supabase-js installed.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { createClient } = require("@supabase/supabase-js");
    return createClient(
      requireEnv("SUPABASE_URL"),
      requireEnv("SUPABASE_SERVICE_ROLE_KEY"),
    );
  }

  private get bucket(): string {
    return process.env.SUPABASE_STORAGE_BUCKET ?? "uploads";
  }

  async upload(file: File): Promise<StoredFile> {
    const supabase = this.getClient();
    const filePath = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from(this.bucket)
      .upload(filePath, file, { contentType: file.type, upsert: false });
    if (error) throw new Error(`[SupabaseStorage] Upload failed: ${error.message}`);
    const { data } = supabase.storage.from(this.bucket).getPublicUrl(filePath);
    return {
      path: filePath,
      url: data.publicUrl,
      name: file.name,
      size: file.size,
      type: file.type,
    };
  }

  async delete(filePath: string): Promise<void> {
    const supabase = this.getClient();
    await supabase.storage.from(this.bucket).remove([filePath]);
  }

  getUrl(filePath: string): string {
    const supabase = this.getClient();
    const { data } = supabase.storage.from(this.bucket).getPublicUrl(filePath);
    return data.publicUrl;
  }
}
