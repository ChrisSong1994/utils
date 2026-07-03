/**
 * 截断字符串并加省略号
 * @param str 原字符串
 * @param maxLen 最大长度
 */
export const truncate = (str: string, maxLen: number): string => {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen) + "...";
};
