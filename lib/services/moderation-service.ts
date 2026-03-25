import { DisputeStatus, MatchOutcome, MatchStatus } from "@/types/domain";
import { prisma } from "@/lib/prisma";
import { settleMatchResult } from "@/lib/services/match-service";

export async function resolveDispute(input: {
  disputeId: string;
  moderatorId: string;
  action: "winner_p1" | "winner_p2" | "draw" | "refund" | "void";
  note: string;
}) {
  return prisma.$transaction(async (tx: any) => {
    const dispute = await tx.dispute.findUniqueOrThrow({ where: { id: input.disputeId } });
    await tx.moderatorNote.create({ data: { disputeId: dispute.id, moderatorId: input.moderatorId, body: input.note } });

    if (input.action === "winner_p1") await settleMatchResult(dispute.matchId, MatchOutcome.WINNER_PLAYER_1);
    if (input.action === "winner_p2") await settleMatchResult(dispute.matchId, MatchOutcome.WINNER_PLAYER_2);
    if (input.action === "draw" || input.action === "refund") await settleMatchResult(dispute.matchId, MatchOutcome.DRAW);
    if (input.action === "void") await tx.match.update({ where: { id: dispute.matchId }, data: { status: MatchStatus.CANCELLED } });

    return tx.dispute.update({ where: { id: dispute.id }, data: { status: DisputeStatus.RESOLVED, resolvedById: input.moderatorId, resolvedAt: new Date() } });
  });
}
