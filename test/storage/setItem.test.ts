import { describe, expect, test, beforeEach } from "vitest";

import { setItem, getItem } from "../../src";

describe("setItem", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("stores and retrieves value", () => {
    setItem("key", { name: "test" });
    expect(getItem("key")).toEqual({ name: "test" });
  });

  test("overwrites existing key", () => {
    setItem("key", "first");
    setItem("key", "second");
    expect(getItem("key")).toBe("second");
  });
});
