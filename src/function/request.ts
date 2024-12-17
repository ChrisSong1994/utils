/**
 * 基于 fetch 的请求逻辑
 * 1、能够实现请求拦截、响应拦截
 * 2、封装请求参数
 * 3、返回数据类型
 * 4、可以设置请求前端超时时间
 */
import { isEmpty } from "../lang";
import { qs } from "../url";

const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

export interface IRequestOptions {
  method?: string;
  headers?: Record<string, any>;
  credentials?: RequestCredentials;
  body?: Record<string, any>;
  query?: Record<string, any>;
  contentType?: "json" | "text" | "blob";
  requestMiddlewares?: Array<(data: IFetchOptions) => IFetchOptions>;
  responseMiddlewares?: Array<(res: any) => any>;
  timeout?: number;
  signal?: AbortSignal;
  signType?: number; // 请求签名
  [key: string]: any;
}

export interface IFetchOptions {
  method: string;
  headers: Record<string, any>;
  credentials?: RequestCredentials;
  body?: string;
  signal: AbortSignal;
}

// 不包含 body 请求方式
const WITHOUT_BODY_METHODS = ["GET", "HEAD", "DELETE", "OPTIONS"];

// 基础请求方法
export const request = async function (url: string, options?: IRequestOptions) {
  const {
    method = "GET", // 默认 post 请求
    credentials = "include", // 默认带上 cookie
    headers = {},
    body = {},
    query = {},
    contentType = "json",
    requestMiddlewares = [],
    responseMiddlewares = [],
    timeout = 5000,
    signal,
  } = options || {};

  let timer;
  const controller = new AbortController();
  if (timeout && !signal) {
    timer = setTimeout(() => {
      controller.abort();
    }, timeout);
  }

  // 1、拼接 url
  const fetchUrl = qs.join(url, query);

  // 2、构建fetch 请求 init
  let requestOptions: IFetchOptions = {
    method,
    credentials,
    headers: {
      ...DEFAULT_HEADERS,
      ...headers,
    },
    // 遵循前后端签名协议
    body: JSON.stringify(isEmpty(body) ? {} : body),
    signal: signal || controller.signal,
  };

  if (WITHOUT_BODY_METHODS.includes(method)) {
    Reflect.deleteProperty(requestOptions, "body");
  }

  //  3、请求拦截器
  if (requestMiddlewares?.length) {
    requestOptions = requestMiddlewares.reduce((acc, middleFn) => middleFn(acc), requestOptions);
  }

  // 4、发起请求
  const response = await fetch(fetchUrl, requestOptions);
  let responseContent = await response[contentType]();

  // 5、响应拦截器
  if (responseMiddlewares?.length) {
    responseContent = responseMiddlewares.reduce((acc, middleFn) => middleFn(acc), responseContent);
  }

  // 6、清除定时器
  if (timer) clearTimeout(timer);

  // 返回值
  return responseContent;
};

// 常用方法封装
request.post = (url: string, options?: IRequestOptions) => {
  return request(url, {
    ...options,
    method: "POST",
  });
};

request.get = (url: string, options?: IRequestOptions) => {
  return request(url, {
    ...options,
    method: "GET",
  });
};
