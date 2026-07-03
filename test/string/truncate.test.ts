import { describe, expect, test } from "vitest";

import { truncate } from "../../src";

describe("truncate", () => {
  test("short string unchanged", () => {
    expect(truncate("hello", 10)).toBe("hello");
  });

  test("long string truncated", () => {
    expect(truncate("hello world", 5)).toBe("hello...");
  });

  test("exact length unchanged", () => {
    expect(truncate("hello", 5)).toBe("hello");
  });

  test("empty string", () => {
    expect(truncate("", 3)).toBe("");
  });
});
