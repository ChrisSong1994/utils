import { describe, expect, test } from "vitest";

import { chunk } from "../../src";

describe("chunk", () => {
  test("splits evenly", () => {
    expect(chunk([1, 2, 3, 4], 2)).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });

  test("last chunk smaller", () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  test("size larger than array", () => {
    expect(chunk([1, 2], 5)).toEqual([[1, 2]]);
  });

  test("empty array", () => {
    expect(chunk([], 3)).toEqual([]);
  });
});
