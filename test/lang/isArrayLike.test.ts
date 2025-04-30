import { describe, expect, test } from "vitest";

import { isArrayLike } from "../../";

describe("isArrayLike", () => {
  test("should return true for arrays", () => {
    expect(isArrayLike([])).toBe(true);
    expect(isArrayLike([1, 2, 3])).toBe(true);
    expect(isArrayLike(new Array(10))).toBe(true);
  });

  test("should return true for array-like objects", () => {
    expect(isArrayLike({ length: 0 })).toBe(true);
  });
});
