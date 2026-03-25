import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { pluginGuard } from "@/app/api/plugin/_shared";

export async function POST(req: NextRequest) {
  const guard = await pluginGuard(req);
  if ("error" in guard) return guard.error;
  const code = String(guard.body.link_code);
  const uuid = String(guard.body.minecraft_uuid);
  const username = String(guard.body.minecraft_username);

  const link = await prisma.accountLink.findFirst({ where: { linkCode: code, usedAt: null } });
  if (!link) return NextResponse.json({ error: "Invalid code" }, { status: 404 });

  await prisma.accountLink.update({ where: { id: link.id }, data: { minecraftUuid: uuid, minecraftUsername: username, usedAt: new Date() } });
  await prisma.user.update({ where: { id: link.userId }, data: { minecraftUuid: uuid, minecraftUsername: username } });
  return NextResponse.json({ ok: true });
}
