/**
 * is http url
 */
export function isHttpUrl(url: string) {
  return /^https?:\/\//.test(url);
}
