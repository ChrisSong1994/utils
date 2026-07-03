/**
 * 延时 Promise
 * @param ms 毫秒
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
