/**
 * 按 key 分组
 * @param arr 原数组
 * @param key 分组依据，可以是属性名或返回键的函数
 */
export const groupBy = <T>(arr: T[], key: keyof T | ((item: T) => string)): Record<string, T[]> => {
  const getKey = typeof key === "function" ? key : (item: T) => String(item[key]);
  return arr.reduce<Record<string, T[]>>((acc, item) => {
    const k = getKey(item);
    if (!acc[k]) {
      acc[k] = [];
    }
    acc[k].push(item);
    return acc;
  }, {});
};
