/**
 * url 工具：解析、拼接等
 */
import { isEmpty } from "../lang";
const parse = (url: string) => {
  const params: Record<string, string> = {};
  try {
    const urlObj = new URL(url);
    urlObj.searchParams.forEach((value, key) => {
      params[key] = value;
    });
  } catch (err) {
    console.warn(err?.message);
  }
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
