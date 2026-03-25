import { NextRequest, NextResponse } from "next/server";
import { MatchStatus } from "@/types/domain";
import { prisma } from "@/lib/prisma";
import { pluginGuard } from "@/app/api/plugin/_shared";

export async function POST(req: NextRequest) {
  const guard = await pluginGuard(req);
  if ("error" in guard) return guard.error;
  await prisma.match.update({ where: { id: String(guard.body.website_match_id) }, data: { status: MatchStatus.DISPUTED } });
  return NextResponse.json({ ok: true, status: "DISPUTED" });
}
