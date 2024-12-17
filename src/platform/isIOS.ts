/**
 * 判断是否是IOS
 * @returns {boolean}
 * MSStream是IE11中的一个对象
 */
export const isIOS = (): boolean => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window["MSStream"];
};
