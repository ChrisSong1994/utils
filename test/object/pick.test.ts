import { describe, expect, test } from "vitest";

import { pick } from "../../src";

describe("pick", () => {
  test("picks specified keys", () => {
    expect(pick({ a: 1, b: 2, c: 3 }, ["a", "c"])).toEqual({ a: 1, c: 3 });
  });

  test("ignores missing keys", () => {
    expect(pick({ a: 1 }, ["a", "b"] as any)).toEqual({ a: 1 });
  });

  test("empty keys returns empty object", () => {
    expect(pick({ a: 1 }, [])).toEqual({});
  });
});
