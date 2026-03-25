import { DuelTypeEnum } from "@/types/enums";
import { z } from "zod";

export const createChallengeSchema = z.object({
  stake: z.number().int().positive().max(50000),
  duelType: z.nativeEnum(DuelTypeEnum),
  arenaId: z.string().cuid(),
  invitedUserId: z.string().cuid().optional(),
  notes: z.string().max(300).optional(),
  expiresAt: z.coerce.date()
});
