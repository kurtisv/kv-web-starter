/**
 * Cloudflare R2 storage adapter.
 * R2 is S3-compatible, so this adapter reuses the AWS SDK.
 *
 * Required packages (install when activating this adapter):
 *   pnpm add @aws-sdk/client-s3
 *
 * Required env vars:
 *   R2_ACCOUNT_ID=...
 *   R2_ACCESS_KEY_ID=...
 *   R2_SECRET_ACCESS_KEY=...
 *   R2_BUCKET=my-bucket
 *   R2_PUBLIC_URL=https://pub-xxx.r2.dev  (your public bucket URL or custom domain)
 */
import type { StorageAdapter, StoredFile } from "./types";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`[R2StorageAdapter] Missing env var: ${name}`);
  return value;
}

export class R2StorageAdapter implements StorageAdapter {
  private getClient() {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { S3Client, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
    const accountId = requireEnv("R2_ACCOUNT_ID");
    const client = new S3Client({
      region: "auto",
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: requireEnv("R2_ACCESS_KEY_ID"),
        secretAccessKey: requireEnv("R2_SECRET_ACCESS_KEY"),
      },
    });
    return { client, PutObjectCommand, DeleteObjectCommand };
  }

  private get bucket(): string {
    return requireEnv("R2_BUCKET");
  }

  async upload(file: File): Promise<StoredFile> {
    const { client, PutObjectCommand } = this.getClient();
    const key = `${Date.now()}-${file.name}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    await client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: buffer,
        ContentType: file.type,
      }),
    );
    return {
      path: key,
      url: this.getUrl(key),
      name: file.name,
      size: file.size,
      type: file.type,
    };
  }

  async delete(filePath: string): Promise<void> {
    const { client, DeleteObjectCommand } = this.getClient();
    await client.send(new DeleteObjectCommand({ Bucket: this.bucket, Key: filePath }));
  }

  getUrl(filePath: string): string {
    const publicUrl = requireEnv("R2_PUBLIC_URL");
    return `${publicUrl.replace(/\/$/, "")}/${filePath}`;
  }
}
