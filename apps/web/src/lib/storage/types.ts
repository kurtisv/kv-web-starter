export interface StoredFile {
  path: string;
  url: string;
  name: string;
  size: number;
  type: string;
}

export interface StorageAdapter {
  /**
   * Upload a file and return its stored metadata.
   * Throws if the adapter is not configured or the upload fails.
   */
  upload(file: File): Promise<StoredFile>;

  /**
   * Delete a file by its path (as returned by upload).
   * No-op if the file does not exist.
   */
  delete(path: string): Promise<void>;

  /**
   * Resolve a stored path to a publicly accessible URL.
   */
  getUrl(path: string): string;
}

export type StorageProvider = "local" | "supabase" | "azure" | "s3" | "r2";
