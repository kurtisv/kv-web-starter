import { NextResponse } from "next/server";

import { saveUploadToLocalStorage } from "@/lib/storage/uploads";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Aucun fichier recu." }, { status: 400 });
  }

  try {
    const upload = await saveUploadToLocalStorage(file);
    return NextResponse.json(upload);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload impossible." },
      { status: 400 }
    );
  }
}
