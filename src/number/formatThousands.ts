/**
 * 千分位格式化
 * @example formatThousands(1000) → "1,000"
 */
export const formatThousands = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
