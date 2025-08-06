import duratin from "dayjs/plugin/duration.js";
import dayjs from "dayjs";
// dayjs 注册插件，支持 dayjs.duration
dayjs.extend(duratin);
/**
 * external module
 */

export { dayjs };

/**
 * internal module
 */
export * from "./function";
export * from "./date";
export * from "./lang";
export * from "./platform";
export * from "./navigator";
export * from "./url";
export * from "./string";
