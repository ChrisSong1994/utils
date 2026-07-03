import { describe, expect, test } from "vitest";

import { shuffle } from "../../src";

describe("shuffle", () => {
  test("returns same length", () => {
    const arr = [1, 2, 3, 4, 5];
    expect(shuffle(arr).length).toBe(arr.length);
  });

  test("contains all elements", () => {
    const arr = [1, 2, 3, 4, 5];
    const result = shuffle(arr);
    expect(result.sort()).toEqual(arr.sort());
  });

  test("does not mutate original", () => {
    const arr = [1, 2, 3];
    const copy = [...arr];
    shuffle(arr);
    expect(arr).toEqual(copy);
  });

  test("empty array", () => {
    expect(shuffle([])).toEqual([]);
  });
});
