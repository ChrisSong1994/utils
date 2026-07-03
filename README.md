# @fett/utils

常用的 JavaScript 函数集合。

## 安装

```bash
npm install @fett/utils
```

## 使用

```ts
import { isMobile, copyToClipboard, qs, request, deepClone, uniq } from "@fett/utils";
```

## 模块

### function — 高级函数 & 辅助函数

| 函数 | 说明 |
|------|------|
| `to(promise)` | 将 Promise 结果转为 `[data, error]` 元组，避免 try/catch |
| `request(url, options?)` | 基于 fetch 的 HTTP 请求封装，支持请求/响应拦截器、超时、query 参数拼接 |
| `parallelToSerial(items, concurrency?)` | 将并发任务队列转为串行执行，可控制每次并发数 |
| `getStrLength(str)` | 计算字符串长度，英文字符算 1，中文字符算 2 |
| `setWaterMark(options)` | 在页面添加文本水印，支持旋转角度、透明度，含 DOM 保护 |
| `genUUID()` | 生成 UUID v4 |
| `genTimeBasedId(length?)` | 基于时间戳 + 随机数生成短 ID |
| `genRandomStringId(length?)` | 生成指定长度的随机字符串 ID |
| `splitOnFirst(string, separator)` | 按分隔符分割字符串，仅匹配第一次出现的位置 |
| `rafTimeout(callback, delay?)` | 基于 `requestAnimationFrame` 的 setTimeout |
| `rafInterval(callback, delay)` | 基于 `requestAnimationFrame` 的 setInterval，自动修正时间漂移 |
| `sleep(ms)` | 延时 Promise |
| `retry(fn, times?, delay?)` | 失败重试，默认 3 次，间隔 1000ms |
| `throttle(fn, delay)` | 节流函数（leading-edge） |
| `memoize(fn)` | 函数结果缓存，相同参数返回缓存值 |
| `fileDownload(url, options?)` | 多模式文件下载（link / fetch / iframe），fetch 模式支持进度回调 |

### date — 日期工具（基于 dayjs）

| 函数 | 说明 |
|------|------|
| `getDateObject(date?)` | 获取日期对象，返回 `{ year, month, day, week, hour, minute, second }` |
| `DateRangeTypeEnum` | 日期范围枚举，包含 `one-minute` / `five-minute` / `one-hour` / `today` / `yesterday` / `week` / `month` / `three-month` 等 |
| `DATE_RANGE_TYPE_OPTIONS` | 日期范围选项配置列表，每个选项包含 `value`、`label`、`refresh` 和 `time()` 函数 |

### lang — 数据类型判断

| 函数 | 说明 |
|------|------|
| `isNull(value)` | 判断是否为 `null` |
| `isNumber(value)` | 判断是否为数字 |
| `isObject(value)` | 判断是否为对象 / 函数 |
| `isObjectLike(value)` | 判断是否为非 null 的对象 |
| `isLength(value)` | 判断是否为有效数组长度 |
| `isArrayLike(value)` | 判断是否为类数组 |
| `isEmpty(value)` | 判断是否为空（null/undefined/空数组/空字符串/空对象/空 Set/空 Map/NaN） |
| `isSet(value)` | 判断是否为 `Set` |
| `isMap(value)` | 判断是否为 `Map` |

### platform — 端环境判断

| 函数 | 说明 |
|------|------|
| `isMobile()` | 判断是否为移动端 |
| `isIOS()` | 判断是否为 iOS |
| `isAndroid()` | 判断是否为 Android |
| `isWX()` | 判断是否为微信环境 |
| `isAlipay()` | 判断是否为支付宝环境 |

### navigator — 浏览器系统工具

| 函数 | 说明 |
|------|------|
| `isOnline()` | 判断网络是否在线 |
| `copyToClipboard(text)` | 复制文本到剪贴板，优先使用 `navigator.clipboard`，降级到 `document.execCommand` |

### url — URL 工具

| 函数 | 说明 |
|------|------|
| `qs.parse(input)` | 解析 URL 或查询字符串为键值对象 |
| `qs.stringify(params)` | 将对象序列化为查询字符串 |
| `qs.join(url, params)` | 拼接 URL 与参数，自动处理已有参数 |

### string — 字符串工具

| 函数 | 说明 |
|------|------|
| `isURL(value)` | 判断是否为合法 URL |
| `isHttpUrl(url)` | 判断是否为 `http://` 或 `https://` 开头的链接 |
| `camelCase(str)` | 转驼峰命名 `foo-bar` → `fooBar` |
| `kebabCase(str)` | 转短横线命名 `fooBar` → `foo-bar` |
| `capitalize(str)` | 首字母大写 |
| `truncate(str, maxLen)` | 截断并加省略号 |
| `escapeHtml(str)` | 转义 HTML 特殊字符 |

### array — 数组工具

| 函数 | 说明 |
|------|------|
| `uniq(arr)` | 数组去重 |
| `flatten(arr, depth?)` | 数组扁平化，默认展开 1 层 |
| `chunk(arr, size)` | 按固定大小切分数组 |
| `groupBy(arr, key)` | 按属性名或函数分组 |
| `shuffle(arr)` | Fisher-Yates 洗牌 |
| `range(start, end, step?)` | 生成数字范围数组 |

### object — 对象工具

| 函数 | 说明 |
|------|------|
| `deepClone(obj)` | 深拷贝，兼容循环引用、Date、RegExp |
| `pick(obj, keys)` | 从对象中选取指定属性 |
| `omit(obj, keys)` | 排除对象中的指定属性 |
| `get(obj, path, defaultValue?)` | 按路径 `a.b.c` 安全取值 |

### number — 数字工具

| 函数 | 说明 |
|------|------|
| `versionCompare(v1, v2)` | 版本号比较，返回 `-1 / 0 / 1` |
| `clamp(num, min, max)` | 钳制数字在范围内 |
| `formatThousands(num)` | 千分位格式化 `1000` → `1,000` |
| `random(min, max)` | 区间随机整数 `[min, max]` |

### storage — localStorage 工具

| 函数 | 说明 |
|------|------|
| `getItem(key)` | 取值，自动 `JSON.parse` |
| `setItem(key, value)` | 存值，自动 `JSON.stringify` |
| `removeItem(key)` | 移除指定项 |

### format — 格式化工具

| 函数 | 说明 |
|------|------|
| `formatFileSize(bytes)` | 文件大小格式化 `1024` → `1 KB` |
| `formatDuration(ms)` | 毫秒转时间 `3661000` → `01:01:01` |

### constants — 常量

| 名称 | 说明 |
|------|------|
| `HTTP_URL_PATTERN` | HTTP/HTTPS URL 正则表达式 |

### 其他

| 导出 | 说明 |
|------|------|
| `dayjs` | 重新导出的 dayjs 实例（已注册 duration 插件） |

## License

MIT
