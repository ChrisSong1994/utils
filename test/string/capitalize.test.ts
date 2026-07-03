import { describe, expect, test } from "vitest";

import { capitalize } from "../../src";

describe("capitalize", () => {
  test("lowercase first letter", () => {
    expect(capitalize("hello")).toBe("Hello");
  });

  test("uppercase first letter unchanged", () => {
    expect(capitalize("Hello")).toBe("Hello");
  });

  test("single letter", () => {
    expect(capitalize("a")).toBe("A");
  });

  test("empty string", () => {
    expect(capitalize("")).toBe("");
  });
});
