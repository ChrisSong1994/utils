/**
 * 转驼峰命名
 * foo-bar → fooBar
 */
export const camelCase = (str: string): string => {
  return str.replace(/[-_]([a-zA-Z])/g, (_, char) => char.toUpperCase());
};
