import { describe, expect, test } from "vitest";

import { clamp } from "../../src";

describe("clamp", () => {
  test("value within range", () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  test("value below min", () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  test("value above max", () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });

  test("value equals min", () => {
    expect(clamp(0, 0, 10)).toBe(0);
  });

  test("value equals max", () => {
    expect(clamp(10, 0, 10)).toBe(10);
  });
});
