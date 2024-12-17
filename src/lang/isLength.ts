/**
 * @description 判断是否是长度
 */

const MAX_SAFE_INTEGER = 9007199254740991;
export const isLength = (value: any): boolean => {
  return typeof value === "number" && value > -1 && value % 1 === 0 && value <= MAX_SAFE_INTEGER;
};
