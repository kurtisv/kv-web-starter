import { randomUUID } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

import type { StorageAdapter, StoredFile } from "./types";

export const MAX_UPLOAD_BYTES = 20 * 1024 * 1024;

const SAFE_EXTENSION = /^[a-z0-9]{1,12}$/i;
const SAFE_BASENAME_CHARS = /[^a-z0-9._-]+/gi;

function sanitizeName(name: string): string {
  const parsed = path.parse(name.trim());
  const base = parsed.name
    .replace(SAFE_BASENAME_CHARS, "-")
    .replace(/^\.+/, "")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  const ext = parsed.ext.replace(/^\./, "");
  const safeExt = SAFE_EXTENSION.test(ext) ? `.${ext.toLowerCase()}` : "";
  return `${base || "upload"}${safeExt}`;
}

export class LocalStorageAdapter implements StorageAdapter {
  private readonly uploadDir: string;
  private readonly publicPrefix: string;

  constructor(uploadDir?: string, publicPrefix?: string) {
    this.uploadDir = uploadDir ?? path.join(process.cwd(), "public", "uploads");
    this.publicPrefix = publicPrefix ?? "/uploads";
  }

  async upload(file: File): Promise<StoredFile> {
    if (file.size > MAX_UPLOAD_BYTES) {
      throw new Error("File exceeds the 20 MB limit.");
    }
    const fileName = `${Date.now()}-${randomUUID()}-${sanitizeName(file.name)}`;
    const bytes = Buffer.from(await file.arrayBuffer());
    await mkdir(this.uploadDir, { recursive: true });
    await writeFile(path.join(this.uploadDir, fileName), bytes);
    return {
      path: fileName,
      url: `${this.publicPrefix}/${fileName}`,
      name: file.name,
      size: file.size,
      type: file.type,
    };
  }

  async delete(filePath: string): Promise<void> {
    try {
      await unlink(path.join(this.uploadDir, filePath));
    } catch {
      // File not found — treat as no-op
    }
  }

  getUrl(filePath: string): string {
    return `${this.publicPrefix}/${filePath}`;
  }
}
