import { describe, expect, it } from "vitest";
import { idempotentResultKey } from "@/lib/services/rules";

describe("plugin duplicate protection", () => {
  it("builds deterministic idempotency key", () => {
    expect(idempotentResultKey("m1", "DRAW")).toBe("m1:DRAW");
  });
});
