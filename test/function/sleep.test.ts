import { describe, expect, test } from "vitest";

import { sleep } from "../../src";

describe("sleep", () => {
  test("resolves after delay", async () => {
    const start = Date.now();
    await sleep(50);
    expect(Date.now() - start).toBeGreaterThanOrEqual(45);
  });
});
