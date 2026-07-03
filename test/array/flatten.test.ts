import { describe, expect, test } from "vitest";

import { flatten } from "../../src";

describe("flatten", () => {
  test("default depth 1", () => {
    expect(flatten([1, [2, 3], [4, [5]]])).toEqual([1, 2, 3, 4, [5]]);
  });

  test("depth 2", () => {
    expect(flatten([1, [2, [3, [4]]]], 2)).toEqual([1, 2, 3, [4]]);
  });

  test("depth 0 returns shallow copy", () => {
    const arr = [1, [2]];
    const result = flatten(arr, 0);
    expect(result).toEqual([1, [2]]);
    expect(result).not.toBe(arr);
  });

  test("empty array", () => {
    expect(flatten([])).toEqual([]);
  });

  test("flat array unchanged", () => {
    expect(flatten([1, 2, 3])).toEqual([1, 2, 3]);
  });
});
