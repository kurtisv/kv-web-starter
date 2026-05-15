import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    data: {
      message: "Endpoint API v1 de demonstration.",
    },
  });
}
