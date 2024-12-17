/**
 * 判断是否是支付宝环境
 * @returns {boolean}
 */
export const isAlipay = (): boolean => {
  return /AlipayClient/i.test(navigator.userAgent);
};
