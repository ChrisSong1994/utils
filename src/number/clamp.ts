/**
 * 钳制数字在范围内
 * @param num 输入数字
 * @param min 最小值
 * @param max 最大值
 */
export const clamp = (num: number, min: number, max: number): number => {
  return Math.min(Math.max(num, min), max);
};
