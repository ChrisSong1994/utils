/**
 * 判断是否是微信环境
 * @returns {boolean}
 */
export const isWX = (): boolean => {
  return /micromessenger/i.test(navigator.userAgent);
};
