import { type NextRequest, NextResponse } from "next/server";

import { env } from "@/lib/env";
import { parseApiCredentials, verifyApiAccess } from "@/modules/api-portal";

export function GET(request: NextRequest) {
  const access = verifyApiAccess({
    headers: request.headers,
    credentials: parseApiCredentials(env.API_DEMO_KEYS),
    requiredScopes: ["demo:read"],
  });

  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  return NextResponse.json({
    data: {
      message: "Endpoint API v1 de demonstration.",
      authenticatedAs: access.key,
      scopes: access.scopes,
    },
  });
}
