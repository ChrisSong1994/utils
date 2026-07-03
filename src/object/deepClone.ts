/**
 * 深拷贝，兼容循环引用
 */
export const deepClone = <T>(obj: T, cache = new WeakMap<any, any>()): T => {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as any;
  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags) as any;
  if (cache.has(obj)) return cache.get(obj);

  const clone: any = Array.isArray(obj) ? [] : {};
  cache.set(obj, clone);

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clone[key] = deepClone((obj as any)[key], cache);
    }
  }

  return clone;
};
