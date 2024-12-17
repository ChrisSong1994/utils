/**
 * @description 判断是否为对象
 */

export const isObjectLike = (value: any): boolean => {
  return typeof value === "object" && value !== null;
};
