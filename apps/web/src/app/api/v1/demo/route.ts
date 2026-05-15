import { type NextRequest, NextResponse } from "next/server";

import { env } from "@/lib/env";
import { prisma } from "@/lib/db";
import { authenticateApiRequest, parseApiCredentials } from "@/modules/api-portal";

export async function GET(request: NextRequest) {
  const startedAt = Date.now();
  const endpoint = "/api/v1/demo";
  const access = await authenticateApiRequest({
    headers: request.headers,
    demoCredentials: parseApiCredentials(env.API_DEMO_KEYS),
    requiredScopes: ["demo:read"],
    findDatabaseCredential: (prefix) =>
      prisma.apiKey.findFirst({
        where: { prefix },
        select: {
          id: true,
          userId: true,
          prefix: true,
          hashedKey: true,
          scopes: true,
          revokedAt: true,
        },
      }),
  });

  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  if (access.source === "database" && access.userId && access.apiKeyId) {
    await recordApiUsage({
      userId: access.userId,
      apiKeyId: access.apiKeyId,
      endpoint,
      method: request.method,
      statusCode: 200,
      latencyMs: Date.now() - startedAt,
    });
  }

  return NextResponse.json({
    data: {
      message: "Endpoint API v1 de demonstration.",
      authenticatedAs: access.key,
      scopes: access.scopes,
      source: access.source,
    },
  });
}

async function recordApiUsage(input: {
  userId: string;
  apiKeyId: string;
  endpoint: string;
  method: string;
  statusCode: number;
  latencyMs: number;
}) {
  try {
    await prisma.$transaction([
      prisma.apiKey.update({
        where: { id: input.apiKeyId },
        data: { lastUsedAt: new Date() },
      }),
      prisma.apiUsage.create({
        data: {
          userId: input.userId,
          apiKeyId: input.apiKeyId,
          endpoint: input.endpoint,
          method: input.method,
          statusCode: input.statusCode,
          latencyMs: input.latencyMs,
        },
      }),
    ]);
  } catch {
    // Usage logging must not break a successful API response.
  }
}
