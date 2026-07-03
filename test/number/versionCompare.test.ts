import { describe, expect, test } from "vitest";

import { versionCompare } from "../../src";

describe("versionCompare", () => {
  test("v1 > v2 returns 1", () => {
    expect(versionCompare("1.2.3", "1.2.2")).toBe(1);
    expect(versionCompare("2.0.0", "1.9.9")).toBe(1);
  });

  test("v1 < v2 returns -1", () => {
    expect(versionCompare("1.2.2", "1.2.3")).toBe(-1);
    expect(versionCompare("1.9.9", "2.0.0")).toBe(-1);
  });

  test("equal returns 0", () => {
    expect(versionCompare("1.2.3", "1.2.3")).toBe(0);
  });

  test("different lengths", () => {
    expect(versionCompare("1.2", "1.2.0")).toBe(0);
  });
});
