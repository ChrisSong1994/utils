import { describe, expect, test, beforeEach } from "vitest";

import { setItem, removeItem, getItem } from "../../src";

describe("removeItem", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("removes stored value", () => {
    setItem("key", "value");
    removeItem("key");
    expect(getItem("key")).toBeNull();
  });

  test("no-op for non-existent key", () => {
    expect(() => removeItem("nonexistent")).not.toThrow();
  });
});
