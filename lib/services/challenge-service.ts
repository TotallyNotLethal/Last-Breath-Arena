import { ChallengeStatus, LedgerDirection, LedgerTransactionType } from "@/types/domain";
import { randomUUID } from "crypto";
import { prisma } from "@/lib/prisma";
import { postLedgerEntries } from "@/lib/services/ledger-service";

export async function createChallenge(params: {
  challengerId: string;
  stake: number;
  duelTypeId: string;
  arenaId: string;
  invitedUserId?: string;
  expiresAt: Date;
  notes?: string;
}) {
  return prisma.$transaction(async (tx: any) => {
    const user = await tx.user.findUniqueOrThrow({ where: { id: params.challengerId } });
    if (user.banned) throw new Error("Banned users cannot create challenges.");

    const challenge = await tx.challenge.create({
      data: {
        challengerId: params.challengerId,
        stake: params.stake,
        duelTypeId: params.duelTypeId,
        arenaId: params.arenaId,
        invitedUserId: params.invitedUserId,
        expiresAt: params.expiresAt,
        notes: params.notes,
        status: ChallengeStatus.OPEN
      }
    });

    await postLedgerEntries({
      tx,
      groupId: randomUUID(),
      entries: [{
        userId: params.challengerId,
        amount: params.stake,
        direction: LedgerDirection.DEBIT,
        type: LedgerTransactionType.MATCH_STAKE_RESERVE,
        referenceType: "Challenge",
        referenceId: challenge.id,
        metadata: { action: "reserve_on_create" }
      }]
    });

    return challenge;
  });
}
