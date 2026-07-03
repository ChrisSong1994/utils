import { describe, expect, test } from "vitest";

import { groupBy } from "../../src";

describe("groupBy", () => {
  test("by property key", () => {
    const data = [
      { type: "a", val: 1 },
      { type: "b", val: 2 },
      { type: "a", val: 3 },
    ];
    expect(groupBy(data, "type")).toEqual({
      a: [
        { type: "a", val: 1 },
        { type: "a", val: 3 },
      ],
      b: [{ type: "b", val: 2 }],
    });
  });

  test("by function", () => {
    const data = [1, 2, 3, 4, 5];
    expect(groupBy(data, (n) => (n % 2 === 0 ? "even" : "odd"))).toEqual({
      even: [2, 4],
      odd: [1, 3, 5],
    });
  });

  test("empty array", () => {
    expect(groupBy([], "type")).toEqual({});
  });
});
