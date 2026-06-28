/**
 * Azure Blob Storage adapter.
 *
 * Required packages (install when activating this adapter):
 *   pnpm add @azure/storage-blob
 *
 * Required env vars:
 *   AZURE_STORAGE_CONNECTION_STRING=DefaultEndpointsProtocol=https;AccountName=...
 *   AZURE_STORAGE_CONTAINER=uploads
 */
import type { StorageAdapter, StoredFile } from "./types";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`[AzureBlobStorageAdapter] Missing env var: ${name}`);
  return value;
}

export class AzureBlobStorageAdapter implements StorageAdapter {
  private getClient() {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { BlobServiceClient } = require("@azure/storage-blob");
    return BlobServiceClient.fromConnectionString(
      requireEnv("AZURE_STORAGE_CONNECTION_STRING"),
    );
  }

  private get containerName(): string {
    return process.env.AZURE_STORAGE_CONTAINER ?? "uploads";
  }

  async upload(file: File): Promise<StoredFile> {
    const client = this.getClient();
    const container = client.getContainerClient(this.containerName);
    await container.createIfNotExists({ access: "blob" });
    const blobName = `${Date.now()}-${file.name}`;
    const blob = container.getBlockBlobClient(blobName);
    const buffer = Buffer.from(await file.arrayBuffer());
    await blob.uploadData(buffer, { blobHTTPHeaders: { blobContentType: file.type } });
    return {
      path: blobName,
      url: blob.url,
      name: file.name,
      size: file.size,
      type: file.type,
    };
  }

  async delete(filePath: string): Promise<void> {
    const client = this.getClient();
    const container = client.getContainerClient(this.containerName);
    await container.deleteBlob(filePath);
  }

  getUrl(filePath: string): string {
    const accountName = requireEnv("AZURE_STORAGE_CONNECTION_STRING")
      .match(/AccountName=([^;]+)/)?.[1] ?? "unknown";
    return `https://${accountName}.blob.core.windows.net/${this.containerName}/${filePath}`;
  }
}
