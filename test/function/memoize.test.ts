import { describe, expect, test, vi } from "vitest";

import { memoize } from "../../src";

describe("memoize", () => {
  test("caches result for same args", () => {
    const fn = vi.fn((a: number, b: number) => a + b);
    const memoized = memoize(fn);

    expect(memoized(1, 2)).toBe(3);
    expect(memoized(1, 2)).toBe(3);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test("calls again for different args", () => {
    const fn = vi.fn((a: number) => a * 2);
    const memoized = memoize(fn);

    expect(memoized(1)).toBe(2);
    expect(memoized(2)).toBe(4);
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
