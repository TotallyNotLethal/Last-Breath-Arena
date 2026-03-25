import { describe, expect, it } from "vitest";
import { canAcceptChallenge, reserveDelta } from "@/lib/services/rules";

describe("core challenge flow", () => {
  it("create -> reserve -> accept gate", () => {
    const reserve = reserveDelta(1200, 0, 200);
    const accepted = canAcceptChallenge("challenger", "accepter", false);
    expect(reserve.reservedAfter).toBe(200);
    expect(accepted).toBe(true);
  });
});
