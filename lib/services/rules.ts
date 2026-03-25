import { MatchOutcomeEnum } from "@/types/match";

export function canAcceptChallenge(challengerId: string, accepterId: string, banned: boolean) {
  if (banned) return false;
  if (challengerId === accepterId) return false;
  return true;
}

export function reserveDelta(balance: number, reserve: number, stake: number) {
  const spendable = balance - reserve;
  if (spendable < stake) throw new Error("INSUFFICIENT_CREDITS");
  return { reservedAfter: reserve + stake };
}

export function settlementPreview(stake: number, outcome: MatchOutcomeEnum) {
  if (outcome === MatchOutcomeEnum.DRAW) return { p1: stake, p2: stake };
  if (outcome === MatchOutcomeEnum.WINNER_PLAYER_1) return { p1: stake * 2, p2: 0 };
  if (outcome === MatchOutcomeEnum.WINNER_PLAYER_2) return { p1: 0, p2: stake * 2 };
  return { p1: 0, p2: 0 };
}

export function idempotentResultKey(matchId: string, result: string) {
  return `${matchId}:${result}`;
}
