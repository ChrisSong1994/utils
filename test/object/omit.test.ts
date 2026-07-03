import { describe, expect, test } from "vitest";

import { omit } from "../../src";

describe("omit", () => {
  test("omits specified keys", () => {
    expect(omit({ a: 1, b: 2, c: 3 }, ["b"])).toEqual({ a: 1, c: 3 });
  });

  test("ignores missing keys", () => {
    expect(omit({ a: 1 }, ["b"] as any)).toEqual({ a: 1 });
  });

  test("empty keys returns same object", () => {
    expect(omit({ a: 1 }, [])).toEqual({ a: 1 });
  });
});
