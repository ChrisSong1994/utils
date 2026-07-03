import { describe, expect, test, beforeEach } from "vitest";

import { getItem, setItem } from "../../src";

describe("getItem", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("returns null for non-existent key", () => {
    expect(getItem("nonexistent")).toBeNull();
  });

  test("returns parsed JSON value", () => {
    setItem("user", { name: "John" });
    expect(getItem("user")).toEqual({ name: "John" });
  });

  test("returns string value", () => {
    localStorage.setItem("name", "hello");
    expect(getItem("name")).toBe("hello");
  });
});
