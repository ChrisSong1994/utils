import "./App.css";

import {
  copyToClipboard,
  genUUID,
  genRandomStringId,
  genTimeBasedId,
  // array
  uniq,
  flatten,
  chunk,
  groupBy,
  shuffle,
  range,
  // object
  deepClone,
  pick,
  omit,
  get,
  // string
  camelCase,
  kebabCase,
  capitalize,
  truncate,
  escapeHtml,
  // number
  versionCompare,
  clamp,
  formatThousands,
  random,
  // storage
  getItem,
  setItem,
  removeItem,
  // format
  formatFileSize,
  formatDuration,
  // function
  sleep,
  retry,
  throttle,
  memoize,
  fileDownload,
  // other
  dayjs,
  getDateObject,
  qs,
  setWaterMark,
} from "@fett/utils";

// @ts-ignore
import ReactLogo from "./assets/react.svg?component";
// @ts-ignore
import styles from "./index.module.css";

const logGroup = (title: string, fn: () => void) => {
  console.log(`\n=== ${title} ===`);
  fn();
};

// Demo card component
const Section = ({ title, items }: { title: string; items: [string, string][] }) => (
  <details style={{ margin: "8px 0", padding: "8px", background: "#1a1a2e", borderRadius: 8 }}>
    <summary style={{ cursor: "pointer", fontWeight: "bold", color: "#e94560" }}>{title}</summary>
    <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 6 }}>
      {items.map(([label, result], i) => (
        <span key={i} style={{ background: "#16213e", padding: "4px 10px", borderRadius: 4, fontSize: 13 }}>
          <code style={{ color: "#0f3460" }}>{label}</code>
          <span style={{ marginLeft: 6, color: "#53d8b7" }}>{result}</span>
        </span>
      ))}
    </div>
  </details>
);

const App = () => {
  // Log all new functions to console
  logGroup("genId", () => {
    console.log("genUUID:", genUUID());
    console.log("genRandomStringId:", genRandomStringId(10));
    console.log("genTimeBasedId:", genTimeBasedId(10));
  });

  logGroup("array", () => {
    console.log("uniq:", uniq([1, 2, 2, 3]));
    console.log("flatten:", flatten([1, [2, [3]]], 3));
    console.log("chunk:", chunk([1, 2, 3, 4, 5], 2));
    console.log("range:", range(0, 10, 2));
    console.log("shuffle:", shuffle([1, 2, 3, 4, 5]));
    console.log(
      "groupBy:",
      groupBy(
        [
          { type: "fruit", name: "apple" },
          { type: "fruit", name: "banana" },
          { type: "veg", name: "carrot" },
        ],
        "type"
      )
    );
  });

  logGroup("object", () => {
    const obj = { a: 1, b: { c: 2 } };
    const cloned = deepClone(obj);
    console.log("deepClone (nested same ref?):", cloned.b === obj.b);
    console.log("pick:", pick({ a: 1, b: 2, c: 3 }, ["a", "c"]));
    console.log("omit:", omit({ a: 1, b: 2, c: 3 }, ["b"]));
    console.log("get:", get({ a: { b: { c: 42 } } }, "a.b.c"));
  });

  logGroup("string", () => {
    console.log("camelCase:", camelCase("foo-bar"));
    console.log("kebabCase:", kebabCase("fooBar"));
    console.log("capitalize:", capitalize("hello"));
    console.log("truncate:", truncate("hello world", 5));
    console.log("escapeHtml:", escapeHtml("<div>"));
  });

  logGroup("number", () => {
    console.log("versionCompare:", versionCompare("2.1.0", "2.0.5"));
    console.log("clamp:", clamp(15, 0, 10));
    console.log("formatThousands:", formatThousands(1234567));
    console.log("random:", random(1, 100));
  });

  logGroup("storage", () => {
    setItem("demo", { msg: "hello" });
    console.log("getItem:", getItem("demo"));
    removeItem("demo");
    console.log("after remove:", getItem("demo"));
  });

  logGroup("format", () => {
    console.log("formatFileSize:", formatFileSize(1048576));
    console.log("formatDuration:", formatDuration(3661000));
  });

  logGroup("date", () => {
    console.log("dayjs:", dayjs().format("YYYY-MM-DD HH:mm:ss"));
    console.log("getDateObject:", getDateObject());
  });

  logGroup("url", () => {
    console.log("qs.parse:", qs.parse("https://example.com?a=1&b=2"));
    console.log("qs.stringify:", qs.stringify({ x: 1, y: 2 }));
    console.log("qs.join:", qs.join("https://example.com", { a: "1" }));
  });

  return (
    <div className="content" style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>
      <div style={{ margin: "12px auto", textAlign: "center" }}>
        <ReactLogo style={{ width: "100px", height: "100px" }} />
        <h1 className={styles.title}>@fett/utils Demo</h1>
        <button style={{ width: 120 }} onClick={() => copyToClipboard("hello world!")}>
          copyToClipboard
        </button>
      </div>

      <Section
        title="array — 数组工具"
        items={[
          ["uniq([1,2,2,3])", JSON.stringify(uniq([1, 2, 2, 3]))],
          ["flatten([1,[2,[3]]])", JSON.stringify(flatten([1, [2, [3]]], 2))],
          ["chunk([1..5], 2)", JSON.stringify(chunk([1, 2, 3, 4, 5], 2))],
          ["range(0, 10, 2)", JSON.stringify(range(0, 10, 2))],
          ["groupBy(items,'type')", JSON.stringify(groupBy([{ type: "a", val: 1 }, { type: "b", val: 2 }, { type: "a", val: 3 }], "type"))],
        ]}
      />

      <Section
        title="object — 对象工具"
        items={[
          ["deepClone({a:1,b:{c:2}})", "nested !== original"],
          ["pick({a:1,b:2,c:3}, ['a','c'])", JSON.stringify(pick({ a: 1, b: 2, c: 3 }, ["a", "c"]))],
          ["omit({a:1,b:2,c:3}, ['b'])", JSON.stringify(omit({ a: 1, b: 2, c: 3 }, ["b"]))],
          ["get(obj, 'a.b.c')", String(get({ a: { b: { c: 42 } } }, "a.b.c"))],
          ["get(obj, 'a.x', 'd')", String(get({ a: 1 }, "a.x", "default"))],
        ]}
      />

      <Section
        title="string — 字符串工具"
        items={[
          ["camelCase('foo-bar')", camelCase("foo-bar")],
          ["kebabCase('fooBar')", kebabCase("fooBar")],
          ["capitalize('hello')", capitalize("hello")],
          ["truncate('hello world', 5)", truncate("hello world", 5)],
          ["escapeHtml('<div>')", escapeHtml("<div>")],
        ]}
      />

      <Section
        title="number — 数字工具"
        items={[
          ["versionCompare('2.1','2.0')", String(versionCompare("2.1", "2.0"))],
          ["clamp(15, 0, 10)", String(clamp(15, 0, 10))],
          ["formatThousands(1234567)", formatThousands(1234567)],
          ["random(1, 100)", String(random(1, 100))],
        ]}
      />

      <Section
        title="function — 高级函数"
        items={[
          ["sleep(100)", "Promise (check console)"],
          ["retry(fn, 3, 500)", "Promise (check console)"],
          ["throttle(fn, 200)", "leading-edge"],
          ["memoize(fn)", "cached"],
          ["fileDownload(url, {mode:'link'})", "triggers <a> download"],
        ]}
      />

      <Section
        title="format — 格式化"
        items={[
          ["formatFileSize(1048576)", formatFileSize(1048576)],
          ["formatFileSize(1536)", formatFileSize(1536)],
          ["formatDuration(3661000)", formatDuration(3661000)],
          ["formatDuration(65000)", formatDuration(65000)],
        ]}
      />

      <Section
        title="date — 日期"
        items={[
          ["dayjs().format('YYYY-MM-DD')", dayjs().format("YYYY-MM-DD")],
          ["getDateObject()", JSON.stringify(getDateObject())],
        ]}
      />

      <Section
        title="url — URL 工具"
        items={[
          ["qs.parse('?a=1&b=2')", JSON.stringify(qs.parse("?a=1&b=2"))],
          ["qs.stringify({a:1,b:2})", qs.stringify({ a: 1, b: 2 })],
        ]}
      />

      <Section
        title="genId — 生成唯一 ID"
        items={[
          ["genUUID()", genUUID().slice(0, 13) + "..."],
          ["genTimeBasedId()", genTimeBasedId()],
          ["genRandomStringId(8)", genRandomStringId(8)],
        ]}
      />
    </div>
  );
};

export default App;
