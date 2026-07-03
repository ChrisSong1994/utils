/**
 * 排除对象中的指定属性
 * @param obj 原对象
 * @param keys 要排除的键数组
 */
export const omit = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> => {
  const result = { ...obj } as any;
  for (const key of keys) {
    delete result[key];
  }
  return result;
};
