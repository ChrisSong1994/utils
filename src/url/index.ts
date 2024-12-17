/**
 * url 工具：解析、拼接等
 */
import { isEmpty } from "../lang";
const parse = (url) => {
  const urlObj = new URL(url);
  const params = Object.fromEntries(urlObj.searchParams.entries());
  return params;
};

const stringify = (params: Record<string, any>) => {
  return Object.keys(params)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(params[key]))
    .join("&");
};

const join = (url: string, params: Record<string, any>) => {
  if (isEmpty(params)) {
    return url;
  }
  // 1、 url 存在参数，则拼接参数
  if (url.includes("?")) {
    const urlParams = parse(url);
    return url + "&" + stringify({ ...urlParams, ...params });
  }
  // 2、 url 不存在参数，则直接拼接参数
  return url + "?" + stringify(params);
};

export const qs = {
  parse,
  stringify,
  join,
};
