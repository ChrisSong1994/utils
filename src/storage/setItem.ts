/**
 * 存储数据到 localStorage，自动 JSON.stringify
 */
export const setItem = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value));
};
