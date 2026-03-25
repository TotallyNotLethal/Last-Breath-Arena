import { describe, expect, it } from "vitest";
import { settlementPreview } from "@/lib/services/rules";
import { MatchOutcomeEnum } from "@/types/match";

describe("moderator resolution", () => {
  it("uses draw path for refund both", () => {
    expect(settlementPreview(250, MatchOutcomeEnum.DRAW)).toEqual({ p1: 250, p2: 250 });
  });
});
