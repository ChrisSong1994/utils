import { describe, expect, test } from "vitest";

import { formatDuration } from "../../src";

describe("formatDuration", () => {
  test("zero", () => {
    expect(formatDuration(0)).toBe("00:00:00");
  });

  test("seconds only", () => {
    expect(formatDuration(5000)).toBe("00:00:05");
  });

  test("minutes and seconds", () => {
    expect(formatDuration(65000)).toBe("00:01:05");
  });

  test("hours", () => {
    expect(formatDuration(3661000)).toBe("01:01:01");
  });
});
