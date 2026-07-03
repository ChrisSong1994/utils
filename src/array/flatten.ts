/**
 * 数组扁平化
 * @param arr 原数组
 * @param depth 展开深度，默认 1
 */
export const flatten = <T>(arr: any[], depth: number = 1): T[] => {
  if (depth < 1) return arr.slice() as T[];
  return arr.reduce<T[]>((acc, val) => {
    if (Array.isArray(val)) {
      acc.push(...flatten<T>(val, depth - 1));
    } else {
      acc.push(val);
    }
    return acc;
  }, []);
};
