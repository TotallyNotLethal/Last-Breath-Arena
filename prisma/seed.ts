import { PrismaClient, LedgerDirection, LedgerTransactionType, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const season = await prisma.season.create({ data: { name: "Season 1", startsAt: new Date(), active: true } });
  const duelTypes = await Promise.all([
    ["NETH_POT", "Netherite Pot"],
    ["DIAMOND_POT", "Diamond Pot"],
    ["CRYSTAL", "Crystal"],
    ["UHC", "UHC"],
    ["SWORD", "Sword"]
  ].map(([key, label]) => prisma.duelType.create({ data: { key, label } })));

  const arenas = await Promise.all(Array.from({ length: 8 }).map((_, i) => prisma.arena.create({ data: { name: `Arena ${i + 1}` } })));

  for (let i = 1; i <= 10; i++) {
    const user = await prisma.user.create({
      data: {
        email: `demo${i}@lba.gg`,
        username: `demo${i}`,
        passwordHash: await bcrypt.hash("Password123!", 10),
        displayName: `Demo ${i}`,
        role: i === 1 ? UserRole.ADMIN : UserRole.USER,
        wallet: { create: {} }
      }
    });

    await prisma.ledgerEntry.create({
      data: {
        transactionGroupId: `seed-${i}`,
        userId: user.id,
        amount: 1000,
        direction: LedgerDirection.CREDIT,
        type: LedgerTransactionType.CREDIT_GRANT,
        referenceType: "Seed",
        referenceId: "initial"
      }
    });
  }

  const users = await prisma.user.findMany({ take: 2 });
  const challenge = await prisma.challenge.create({
    data: {
      challengerId: users[0].id,
      invitedUserId: users[1].id,
      stake: 100,
      duelTypeId: duelTypes[0].id,
      arenaId: arenas[0].id,
      expiresAt: new Date(Date.now() + 3600_000)
    }
  });

  const match = await prisma.match.create({
    data: {
      challengeId: challenge.id,
      duelTypeId: duelTypes[0].id,
      arenaId: arenas[0].id,
      seasonId: season.id,
      status: "DISPUTED",
      stake: 100,
      participants: {
        create: [
          { userId: users[0].id, slot: 1 },
          { userId: users[1].id, slot: 2 }
        ]
      }
    }
  });

  await prisma.dispute.create({
    data: { matchId: match.id, raisedById: users[1].id, reason: "Suspicious combat log", status: "OPEN" }
  });
}

main().finally(async () => prisma.$disconnect());
