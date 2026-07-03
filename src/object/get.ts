/**
 * 按路径安全取值
 * @param obj 原对象
 * @param path 路径，如 "a.b.c"
 * @param defaultValue 默认值
 */
export const get = <T = any>(obj: any, path: string, defaultValue?: T): T => {
  const keys = path.split(".");
  let result = obj;
  for (const key of keys) {
    if (result == null || !Object.prototype.hasOwnProperty.call(result, key)) {
      return defaultValue as T;
    }
    result = result[key];
  }
  return result as T;
};
