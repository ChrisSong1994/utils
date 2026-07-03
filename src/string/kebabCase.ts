/**
 * 转短横线命名
 * fooBar → foo-bar
 */
export const kebabCase = (str: string): string => {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
};
