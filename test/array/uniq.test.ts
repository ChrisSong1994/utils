import { describe, expect, test } from "vitest";

import { uniq } from "../../src";

describe("uniq", () => {
  test("removes duplicates", () => {
    expect(uniq([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
  });

  test("no duplicates", () => {
    expect(uniq([1, 2, 3])).toEqual([1, 2, 3]);
  });

  test("empty array", () => {
    expect(uniq([])).toEqual([]);
  });

  test("string array", () => {
    expect(uniq(["a", "b", "a"])).toEqual(["a", "b"]);
  });
});
