import { LedgerDirection, LedgerTransactionType } from "@/types/domain";
import { prisma } from "@/lib/prisma";

export async function postLedgerEntries(input: {
  tx: any;
  groupId: string;
  entries: Array<{
    userId: string;
    amount: number;
    direction: string;
    type: string;
    referenceType: string;
    referenceId: string;
    metadata?: Record<string, unknown>;
  }>;
}) {
  await input.tx.ledgerEntry.createMany({
    data: input.entries.map((entry) => ({ ...entry, transactionGroupId: input.groupId }))
  });
}

export async function getUserBalances(userId: string) {
  const ledger = await prisma.ledgerEntry.findMany({ where: { userId } });
  return ledger.reduce(
    (acc: { total: number; reserved: number }, row: any) => {
      const signed = row.direction === "CREDIT" ? row.amount : -row.amount;
      if (row.type === "MATCH_STAKE_RESERVE") acc.reserved += row.amount;
      if (row.type === "MATCH_STAKE_RELEASE" || row.type === "MATCH_WIN_SETTLEMENT" || row.type === "MATCH_DRAW_REFUND") {
        acc.reserved = Math.max(0, acc.reserved - row.amount);
      }
      acc.total += signed;
      return acc;
    },
    { total: 0, reserved: 0 }
  );
}
