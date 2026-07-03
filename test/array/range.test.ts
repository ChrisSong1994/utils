import { describe, expect, test } from "vitest";

import { range } from "../../src";

describe("range", () => {
  test("range(0, 5)", () => {
    expect(range(0, 5)).toEqual([0, 1, 2, 3, 4]);
  });

  test("range(2, 6)", () => {
    expect(range(2, 6)).toEqual([2, 3, 4, 5]);
  });

  test("with step", () => {
    expect(range(0, 10, 2)).toEqual([0, 2, 4, 6, 8]);
  });

  test("negative step", () => {
    expect(range(5, 0, -1)).toEqual([5, 4, 3, 2, 1]);
  });

  test("empty range", () => {
    expect(range(0, 0)).toEqual([]);
  });

  test("step is 0", () => {
    expect(range(0, 5, 0)).toEqual([]);
  });
});
