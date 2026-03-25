import { describe, expect, it } from "vitest";
import { canAcceptChallenge } from "@/lib/services/rules";

describe("challenge rules", () => {
  it("prevents self acceptance", () => {
    expect(canAcceptChallenge("u1", "u1", false)).toBe(false);
  });

  it("prevents banned users", () => {
    expect(canAcceptChallenge("u1", "u2", true)).toBe(false);
  });
});
