/**
 * 生成数字范围数组
 * @param start 起始值
 * @param end 结束值（不包含）
 * @param step 步长，默认 1
 */
export const range = (start: number, end: number, step: number = 1): number[] => {
  const result: number[] = [];
  if (step === 0) return result;
  if (step > 0) {
    for (let i = start; i < end; i += step) {
      result.push(i);
    }
  } else {
    for (let i = start; i > end; i += step) {
      result.push(i);
    }
  }
  return result;
};
