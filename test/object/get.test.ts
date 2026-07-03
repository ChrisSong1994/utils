import { describe, expect, test } from "vitest";

import { get } from "../../src";

describe("get", () => {
  const obj = { a: { b: { c: 42 } } };

  test("simple path", () => {
    expect(get(obj, "a.b.c")).toBe(42);
  });

  test("single level", () => {
    expect(get(obj, "a")).toEqual({ b: { c: 42 } });
  });

  test("missing path returns undefined", () => {
    expect(get(obj, "a.b.x")).toBeUndefined();
  });

  test("missing path with default value", () => {
    expect(get(obj, "a.b.x", "default")).toBe("default");
  });

  test("null object", () => {
    expect(get(null, "a.b", "fallback")).toBe("fallback");
  });
});
