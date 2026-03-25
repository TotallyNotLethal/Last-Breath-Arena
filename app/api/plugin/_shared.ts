import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPluginSignature } from "@/lib/services/plugin-auth";

export async function pluginGuard(req: NextRequest) {
  const raw = await req.text();
  const signature = req.headers.get("x-plugin-signature") ?? "";
  const ok = verifyPluginSignature(raw, signature);
  if (!ok) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  const body = JSON.parse(raw) as Record<string, unknown>;
  await prisma.apiAuditLog.create({
    data: {
      endpoint: req.nextUrl.pathname,
      payload: body,
      statusCode: 200,
      source: "plugin"
    }
  });
  return { body };
}
