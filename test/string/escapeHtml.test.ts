import { describe, expect, test } from "vitest";

import { escapeHtml } from "../../src";

describe("escapeHtml", () => {
  test("escapes &", () => {
    expect(escapeHtml("a & b")).toBe("a &amp; b");
  });

  test("escapes < and >", () => {
    expect(escapeHtml("<div>")).toBe("&lt;div&gt;");
  });

  test("escapes quotes", () => {
    expect(escapeHtml('"hello"')).toBe("&quot;hello&quot;");
  });

  test("escapes single quote", () => {
    expect(escapeHtml("it's")).toBe("it&#39;s");
  });

  test("no special chars", () => {
    expect(escapeHtml("hello")).toBe("hello");
  });
});
