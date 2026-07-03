/**
 * 数组去重
 */
export const uniq = <T>(arr: T[]): T[] => {
  return [...new Set(arr)];
};
