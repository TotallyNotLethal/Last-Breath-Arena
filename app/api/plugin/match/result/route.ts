import { NextRequest, NextResponse } from "next/server";
import { MatchOutcome } from "@/types/domain";
import { pluginGuard } from "@/app/api/plugin/_shared";
import { settleMatchResult } from "@/lib/services/match-service";

const map: Record<string, string> = {
  WINNER_PLAYER_1: MatchOutcome.WINNER_PLAYER_1,
  WINNER_PLAYER_2: MatchOutcome.WINNER_PLAYER_2,
  DRAW: MatchOutcome.DRAW,
  CANCELLED: MatchOutcome.CANCELLED,
  CHEAT_FLAG: MatchOutcome.CHEAT_FLAG,
  DISCONNECT_FORFEIT_PLAYER_1: MatchOutcome.DISCONNECT_FORFEIT_PLAYER_1,
  DISCONNECT_FORFEIT_PLAYER_2: MatchOutcome.DISCONNECT_FORFEIT_PLAYER_2
};

export async function POST(req: NextRequest) {
  const guard = await pluginGuard(req);
  if ("error" in guard) return guard.error;
  const websiteMatchId = String(guard.body.website_match_id);
  const outcome = map[String(guard.body.result)];
  if (!outcome) return NextResponse.json({ error: "Invalid result" }, { status: 400 });
  const match = await settleMatchResult(websiteMatchId, outcome);
  return NextResponse.json({ ok: true, matchId: match.id, status: match.status });
}
