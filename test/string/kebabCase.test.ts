import { describe, expect, test } from "vitest";

import { kebabCase } from "../../src";

describe("kebabCase", () => {
  test("camelCase to kebab-case", () => {
    expect(kebabCase("fooBar")).toBe("foo-bar");
    expect(kebabCase("fooBarBaz")).toBe("foo-bar-baz");
  });

  test("already kebab-case", () => {
    expect(kebabCase("foo-bar")).toBe("foo-bar");
  });

  test("single word", () => {
    expect(kebabCase("foo")).toBe("foo");
  });

  test("empty string", () => {
    expect(kebabCase("")).toBe("");
  });
});
