/**
 * 移除 localStorage 中的数据
 */
export const removeItem = (key: string): void => {
  localStorage.removeItem(key);
};
