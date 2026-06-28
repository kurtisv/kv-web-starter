/**
 * AWS S3 storage adapter.
 *
 * Required packages (install when activating this adapter):
 *   pnpm add @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
 *
 * Required env vars:
 *   AWS_ACCESS_KEY_ID=AKIA...
 *   AWS_SECRET_ACCESS_KEY=...
 *   AWS_REGION=us-east-1
 *   AWS_S3_BUCKET=my-bucket
 *   AWS_S3_PUBLIC_URL=https://my-bucket.s3.us-east-1.amazonaws.com  (optional CDN override)
 */
import type { StorageAdapter, StoredFile } from "./types";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`[S3StorageAdapter] Missing env var: ${name}`);
  return value;
}

export class S3StorageAdapter implements StorageAdapter {
  private getClient() {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { S3Client, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
    const client = new S3Client({
      region: requireEnv("AWS_REGION"),
      credentials: {
        accessKeyId: requireEnv("AWS_ACCESS_KEY_ID"),
        secretAccessKey: requireEnv("AWS_SECRET_ACCESS_KEY"),
      },
    });
    return { client, PutObjectCommand, DeleteObjectCommand };
  }

  private get bucket(): string {
    return requireEnv("AWS_S3_BUCKET");
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
    const override = process.env.AWS_S3_PUBLIC_URL;
    if (override) return `${override.replace(/\/$/, "")}/${filePath}`;
    const region = process.env.AWS_REGION ?? "us-east-1";
    return `https://${this.bucket}.s3.${region}.amazonaws.com/${filePath}`;
  }
}
