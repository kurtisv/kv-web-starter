/* eslint-disable @typescript-eslint/no-require-imports */
import type { StorageAdapter, StorageProvider } from "./types";

export type { StorageAdapter, StoredFile, StorageProvider } from "./types";

/**
 * Returns the storage adapter selected by STORAGE_PROVIDER (default: "local").
 *
 * Supported providers:
 *   local    — saves files to public/uploads (default, no config required)
 *   supabase — Supabase Storage (requires @supabase/supabase-js + env vars)
 *   azure    — Azure Blob Storage (requires @azure/storage-blob + env vars)
 *   s3       — AWS S3 (requires @aws-sdk/client-s3 + env vars)
 *   r2       — Cloudflare R2 (requires @aws-sdk/client-s3 + env vars)
 *
 * See docs/integrations.md for full setup instructions.
 */
export function getStorageAdapter(): StorageAdapter {
  const provider = (process.env.STORAGE_PROVIDER ?? "local") as StorageProvider;

  switch (provider) {
    case "supabase": {
      const { SupabaseStorageAdapter } = require("./supabase-storage");
      return new SupabaseStorageAdapter();
    }
    case "azure": {
      const { AzureBlobStorageAdapter } = require("./azure-blob-storage");
      return new AzureBlobStorageAdapter();
    }
    case "s3": {
      const { S3StorageAdapter } = require("./s3-storage");
      return new S3StorageAdapter();
    }
    case "r2": {
      const { R2StorageAdapter } = require("./r2-storage");
      return new R2StorageAdapter();
    }
    default: {
      const { LocalStorageAdapter } = require("./local-storage");
      return new LocalStorageAdapter();
    }
  }
}
