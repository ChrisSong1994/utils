import { describe, expect, test } from "vitest";

import { camelCase } from "../../src";

describe("camelCase", () => {
  test("kebab-case to camelCase", () => {
    expect(camelCase("foo-bar")).toBe("fooBar");
    expect(camelCase("foo-bar-baz")).toBe("fooBarBaz");
  });

  test("snake_case to camelCase", () => {
    expect(camelCase("foo_bar")).toBe("fooBar");
  });

  test("no separators", () => {
    expect(camelCase("foobar")).toBe("foobar");
  });

  test("empty string", () => {
    expect(camelCase("")).toBe("");
  });
});
