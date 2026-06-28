import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

export const MAX_UPLOAD_BYTES = 20 * 1024 * 1024;

const SAFE_EXTENSION = /^[a-z0-9]{1,12}$/i;
const SAFE_BASENAME_CHARS = /[^a-z0-9._-]+/gi;

export interface StoredUpload {
  name: string;
  size: number;
  type: string;
  url: string;
}

export function sanitizeUploadName(name: string) {
  const parsed = path.parse(name.trim());
  const baseName = parsed.name
    .replace(SAFE_BASENAME_CHARS, "-")
    .replace(/^\.+/, "")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  const extension = parsed.ext.replace(/^\./, "");
  const safeExtension = SAFE_EXTENSION.test(extension) ? `.${extension.toLowerCase()}` : "";

  return `${baseName || "upload"}${safeExtension}`;
}

export async function saveUploadToLocalStorage(file: File): Promise<StoredUpload> {
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error("Le fichier depasse la limite de 20 Mo.");
  }

  const uploadDir = path.join(process.cwd(), "public", "uploads");
  const fileName = `${Date.now()}-${randomUUID()}-${sanitizeUploadName(file.name)}`;
  const bytes = Buffer.from(await file.arrayBuffer());

  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, fileName), bytes);

  return {
    name: file.name,
    size: file.size,
    type: file.type,
    url: `/uploads/${fileName}`,
  };
}
