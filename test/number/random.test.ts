import { describe, expect, test } from "vitest";

import { random } from "../../src";

describe("random", () => {
  test("result within range", () => {
    for (let i = 0; i < 100; i++) {
      const val = random(1, 10);
      expect(val).toBeGreaterThanOrEqual(1);
      expect(val).toBeLessThanOrEqual(10);
    }
  });

  test("same min and max", () => {
    expect(random(5, 5)).toBe(5);
  });

  test("returns integer", () => {
    const val = random(0, 5);
    expect(Number.isInteger(val)).toBe(true);
  });
});
