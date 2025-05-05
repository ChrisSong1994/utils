import { describe, expect, test } from "vitest";

import { qs } from "../../";

describe("qs", () => {
  test("qs.parse", () => {
    console.log(qs.parse("https://xxx.domain.com?a=1&b=2&c=3"))
    expect(qs.parse("https://xxx.domain.com?a=1&b=2&c=3")).toStrictEqual({ a: "1", b: "2", c: "3" });
    expect(qs.parse("")).toStrictEqual({});
  });
});
