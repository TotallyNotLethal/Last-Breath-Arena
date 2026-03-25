import { describe, expect, it } from "vitest";
import { reserveDelta, settlementPreview } from "@/lib/services/rules";
import { MatchOutcomeEnum } from "@/types/match";

describe("reserve/release/settlement", () => {
  it("reserves only if spendable exists", () => {
    expect(reserveDelta(1000, 200, 300).reservedAfter).toBe(500);
  });

  it("settles winner", () => {
    expect(settlementPreview(100, MatchOutcomeEnum.WINNER_PLAYER_1)).toEqual({ p1: 200, p2: 0 });
  });

  it("settles draw", () => {
    expect(settlementPreview(100, MatchOutcomeEnum.DRAW)).toEqual({ p1: 100, p2: 100 });
  });
});
