import { describe, expect, test } from "vitest";

import { qs } from "../../";

describe("qs", () => {
  test("qs.parse", () => {
    console.log(qs.parse("https://xxx.domain.com?a=1&b=2&c=3"));
    expect(qs.parse("https://xxx.domain.com?a=1&b=2&c=3")).toStrictEqual({
      a: "1",
      b: "2",
      c: "3",
    });
    expect(qs.parse("")).toStrictEqual({});
    expect(qs.parse("?a=1&b=2&c=3")).toStrictEqual({
      a: "1",
      b: "2",
      c: "3",
    });
    expect(qs.parse("#a=1&b=2&c=3")).toStrictEqual({
      a: "1",
      b: "2",
      c: "3",
    });
  });

  test("qs.join", () => {
    const url = "https://xxx.domain.com";
    expect(
      qs.join(url, {
        a: "1",
        b: "2",
        c: "3",
      })
    ).toStrictEqual("https://xxx.domain.com?a=1&b=2&c=3");
  });

  test("qs.stringify", () => {
    expect(qs.stringify({ a: "1", b: "2", c: "3" })).toBe("a=1&b=2&c=3");
  });
});
