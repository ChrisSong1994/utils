// 生成唯一ID

export function genUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
export function genTimeBasedId(randomLength: number = 4) {
  const timestamp = Date.now().toString(36); // 转换为 36 进制缩短长度
  const randomPart = Math.random().toString(36).slice(2, randomLength);
  return `${timestamp}${randomPart}`;
}

export function genRandomStringId(length: number = 12) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
