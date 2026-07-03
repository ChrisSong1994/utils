/**
 * 文件大小格式化
 * @example formatFileSize(1024) → "1 KB"
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB"];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = bytes / Math.pow(k, i);
  return `${Math.round(value * 100) / 100} ${units[i]}`;
};
