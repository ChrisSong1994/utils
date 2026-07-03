import { describe, expect, test } from "vitest";

import { formatThousands } from "../../src";

describe("formatThousands", () => {
  test("no separators", () => {
    expect(formatThousands(123)).toBe("123");
  });

  test("single separator", () => {
    expect(formatThousands(1234)).toBe("1,234");
  });

  test("multiple separators", () => {
    expect(formatThousands(1234567)).toBe("1,234,567");
  });

  test("zero", () => {
    expect(formatThousands(0)).toBe("0");
  });
});
