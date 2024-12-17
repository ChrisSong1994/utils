/**
 * 是否是空值
 * @param value
 * @returns {boolean}
 */

import { isArrayLike } from "./isArrayLike";
import { isMap } from "./isMap";
import { isSet } from "./isSet";
import { isNumber } from "./isNumber";

export const isEmpty = (value: any): boolean => {
  // null 和 undefined
  if (value === null || value === undefined) return true;

  // 数组、类数组、字符串
  if (
    isArrayLike(value) &&
    (Array.isArray(value) || typeof value === "string" || typeof value.splice === "function")
  ) {
    return !value.length;
  }

  // set、map
  if (isSet(value) || isMap(value)) {
    return !value.size;
  }

  // number  NaN 返回 true
  if (isNumber(value)) {
    return isNaN(value);
  }

  // 对象
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
};
