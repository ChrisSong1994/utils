/**
 * 判断是否是安卓
 * @returns {boolean}
 */
export const isAndroid = (): boolean => {
  return /Android/i.test(navigator.userAgent);
};
