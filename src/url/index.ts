/**
 * url 工具：解析、拼接等
 */
import { isEmpty } from "../lang";
import { splitOnFirst } from "../function";

/**
 * @param input: string   url or query string
 */
const parse = (input: string) => {
  const params: Record<string, string> = {};
  if (typeof input !== "string") {
    return params;
  }

  // url
  if (URL.canParse(input)) {
    const urlObj = URL.parse(input);
    for (const [key, value] of urlObj.searchParams.entries()) {
      params[key] = value;
    }
  }
  // query string
  else {
    const query = input.trim().replace(/^[?#&]/, ""); // 去除开头的 ? # &
    for (const parameter of query.split("&")) {
      if (parameter === "") {
        continue;
      }
      const [key, value] = splitOnFirst(parameter, "=");
      params[key] = value;
    }
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
