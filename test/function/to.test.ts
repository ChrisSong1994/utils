import { describe, expect, test } from "vitest";

import { to } from "../../src";

describe("to", () => {
  test("resolves successfully", async () => {
    const [res, err] = await to(Promise.resolve(42));
    expect(res).toBe(42);
    expect(err).toBeNull();
  });

  test("rejects with error", async () => {
    const testErr = new Error("something went wrong");
    const [res, err] = await to(Promise.reject(testErr));
    expect(res).toBeNull();
    expect(err).toBe(testErr);
  });

  describe("参数为 Promise.all 包装的 promise 数组", () => {
    test("所有 promise 都 resolve", async () => {
      const [res, err] = await to(
        Promise.all([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)])
      );
      expect(err).toBeNull();
      expect(res).toEqual([1, 2, 3]);
    });

    test("其中一个 promise reject", async () => {
      const err1 = new Error("fail-1");
      const [res, err] = await to(
        Promise.all([Promise.resolve(1), Promise.reject(err1), Promise.resolve(3)])
      );
      expect(res).toBeNull();
      expect(err).toBe(err1);
    });

    test("空数组", async () => {
      const [res, err] = await to(Promise.all([]));
      expect(err).toBeNull();
      expect(res).toEqual([]);
    });

    test("包含非 promise 值", async () => {
      const [res, err] = await to(Promise.all([1, "a", true]));
      expect(err).toBeNull();
      expect(res).toEqual([1, "a", true]);
    });
  });

  describe("to() 逐个包装再 Promise.all", () => {
    test("全部成功", async () => {
      const results = await Promise.all(
        [10, 20, 30].map((n) => to(Promise.resolve(n)))
      );
      results.forEach(([res, err]) => {
        expect(err).toBeNull();
        expect(res).toEqual(expect.any(Number));
      });
      expect(results.map(([res]) => res)).toEqual([10, 20, 30]);
    });

    test("其中一个失败不影响其他（to 将 reject 转成了 resolve）", async () => {
      const results = await Promise.all([
        to(Promise.resolve(1)),
        to(Promise.reject(new Error("bad"))),
        to(Promise.resolve(3)),
      ]);

      expect(results[0]).toEqual([1, null]);
      expect(results[1][1]).toBeInstanceOf(Error);
      expect(results[1][1].message).toBe("bad");
      expect(results[1][0]).toBeNull();
      expect(results[2]).toEqual([3, null]);
    });
  });

  describe("边界情况", () => {
    test("string rejection", async () => {
      const [res, err] = await to(Promise.reject("字符串错误"));
      expect(res).toBeNull();
      expect(err).toBe("字符串错误");
    });

    test("undefined resolve", async () => {
      const [res, err] = await to(Promise.resolve(undefined));
      expect(err).toBeNull();
      expect(res).toBeUndefined();
    });
  });
});
