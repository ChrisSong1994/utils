/**
 * 失败重试
 * @param fn 异步函数
 * @param times 重试次数，默认 3
 * @param delay 重试间隔毫秒，默认 1000
 */
export const retry = async <T>(
  fn: () => Promise<T>,
  times: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: any;
  for (let i = 0; i < times; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (i < times - 1) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
  throw lastError;
};
