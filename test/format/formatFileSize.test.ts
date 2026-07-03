import { describe, expect, test } from "vitest";

import { formatFileSize } from "../../src";

describe("formatFileSize", () => {
  test("0 bytes", () => {
    expect(formatFileSize(0)).toBe("0 B");
  });

  test("bytes", () => {
    expect(formatFileSize(500)).toBe("500 B");
  });

  test("KB", () => {
    expect(formatFileSize(1024)).toBe("1 KB");
    expect(formatFileSize(1536)).toBe("1.5 KB");
  });

  test("MB", () => {
    expect(formatFileSize(1048576)).toBe("1 MB");
  });
});
