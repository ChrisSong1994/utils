/**
 * 节流函数（leading-edge）
 * @param fn 原函数
 * @param delay 间隔毫秒
 */
export const throttle = <T extends (...args: any[]) => void>(fn: T, delay: number): T => {
  let lastTime = 0;
  return ((...args: any[]) => {
    const now = Date.now();
    if (now - lastTime >= delay) {
      lastTime = now;
      fn(...args);
    }
  }) as T;
};
