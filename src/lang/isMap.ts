/**
 * @description 是否是 Map
 */
import getTag from "./_getTag";

export const isMap = (value: any): boolean => {
  return getTag(value) === "[object Map]";
};
