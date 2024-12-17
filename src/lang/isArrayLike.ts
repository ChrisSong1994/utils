/**
 * @description 判断是否是类数组
 */
import { isLength } from "./isLength";
export const isArrayLike = (value: any): boolean => {
  return value != null && typeof value !== "function" && isLength(value.length);
};
