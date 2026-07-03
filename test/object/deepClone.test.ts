import { describe, expect, test } from "vitest";

import { deepClone } from "../../src";

describe("deepClone", () => {
  test("primitive values", () => {
    expect(deepClone(1)).toBe(1);
    expect(deepClone("hello")).toBe("hello");
    expect(deepClone(null)).toBe(null);
  });

  test("plain object", () => {
    const obj = { a: 1, b: { c: 2 } };
    const cloned = deepClone(obj);
    expect(cloned).toEqual(obj);
    expect(cloned).not.toBe(obj);
    expect(cloned.b).not.toBe(obj.b);
  });

  test("array", () => {
    const arr = [1, [2, 3]];
    const cloned = deepClone(arr);
    expect(cloned).toEqual(arr);
    expect(cloned).not.toBe(arr);
    expect(cloned[1]).not.toBe(arr[1]);
  });

  test("circular reference", () => {
    const obj: any = { a: 1 };
    obj.self = obj;
    const cloned = deepClone(obj);
    expect(cloned.a).toBe(1);
    expect(cloned.self).toBe(cloned);
  });

  test("Date", () => {
    const date = new Date("2024-01-01");
    const cloned = deepClone(date);
    expect(cloned).toEqual(date);
    expect(cloned).not.toBe(date);
  });
});
