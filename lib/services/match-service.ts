import { LedgerDirection, LedgerTransactionType, MatchOutcome, MatchStatus } from "@/types/domain";
import { randomUUID } from "crypto";
import { prisma } from "@/lib/prisma";
import { postLedgerEntries } from "@/lib/services/ledger-service";

export async function settleMatchResult(matchId: string, outcome: string) {
  return prisma.$transaction(async (tx: any) => {
    const match = await tx.match.findUniqueOrThrow({ where: { id: matchId }, include: { participants: true } });
    if (match.status === MatchStatus.COMPLETED) return match;

    const [p1, p2] = match.participants;
    const stake = match.stake;
    const entries = [] as Parameters<typeof postLedgerEntries>[0]["entries"];

    if (outcome === MatchOutcome.DRAW) {
      entries.push(
        { userId: p1.userId, amount: stake, direction: LedgerDirection.CREDIT, type: LedgerTransactionType.MATCH_DRAW_REFUND, referenceType: "Match", referenceId: match.id },
        { userId: p2.userId, amount: stake, direction: LedgerDirection.CREDIT, type: LedgerTransactionType.MATCH_DRAW_REFUND, referenceType: "Match", referenceId: match.id }
      );
    } else {
      const winner = outcome === MatchOutcome.WINNER_PLAYER_1 ? p1 : p2;
      entries.push({ userId: winner.userId, amount: stake * 2, direction: LedgerDirection.CREDIT, type: LedgerTransactionType.MATCH_WIN_SETTLEMENT, referenceType: "Match", referenceId: match.id });
    }

    await postLedgerEntries({ tx, groupId: randomUUID(), entries });
    return tx.match.update({ where: { id: match.id }, data: { status: MatchStatus.COMPLETED, outcome, settledAt: new Date() } });
  });
}
