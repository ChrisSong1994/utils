/**
 * 从 localStorage 取值，自动 JSON.parse
 */
export const getItem = <T = any>(key: string): T | null => {
  const raw = localStorage.getItem(key);
  if (raw === null) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return raw as any;
  }
};
