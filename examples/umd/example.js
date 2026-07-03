const utils = window.FettUtils;
console.log("=== @fett/utils examples ===", utils);

// ==================== function ====================
console.log("\n--- function ---");

// to: 将 Promise 结果转为 [data, error] 元组
async function testTo() {
  const [data, err] = await utils.to(Promise.resolve("success"));
  console.log("to (success):", data, err);

  const [data2, err2] = await utils.to(Promise.reject(new Error("fail")));
  console.log("to (fail):", data2, err2?.message);
}
testTo();

// sleep
async function testSleep() {
  console.log("sleep: before");
  await utils.sleep(500);
  console.log("sleep: after 500ms");
}
testSleep();

// retry
async function testRetry() {
  let count = 0;
  const result = await utils.retry(async () => {
    count++;
    if (count < 3) throw new Error("temp error");
    return `retry success at ${count}th try`;
  }, 5, 200);
  console.log("retry:", result);
}
testRetry();

// memoize
function testMemoize() {
  let callCount = 0;
  const add = utils.memoize((a, b) => {
    callCount++;
    return a + b;
  });
  console.log("memoize 1+2:", add(1, 2), "calls:", callCount);
  console.log("memoize 1+2:", add(1, 2), "calls:", callCount); // cached
  console.log("memoize 3+4:", add(3, 4), "calls:", callCount);
}
setTimeout(testMemoize, 100);

// throttle
function testThrottle() {
  const fn = utils.throttle(() => console.log("throttle: called"), 200);
  fn();
  fn();
  fn();
  setTimeout(fn, 250);
}
setTimeout(testThrottle, 200);

// ==================== string ====================
console.log("\n--- string ---");
console.log("camelCase('foo-bar'):", utils.camelCase("foo-bar"));
console.log("kebabCase('fooBar'):", utils.kebabCase("fooBar"));
console.log("capitalize('hello'):", utils.capitalize("hello"));
console.log("truncate('hello world', 5):", utils.truncate("hello world", 5));
console.log("escapeHtml('<div>'):", utils.escapeHtml("<div>"));

// ==================== array ====================
console.log("\n--- array ---");
console.log("uniq([1,2,2,3]):", utils.uniq([1, 2, 2, 3]));
console.log("flatten([1,[2,[3]]], 2):", utils.flatten([1, [2, [3]]], 2));
console.log("chunk([1,2,3,4,5], 2):", utils.chunk([1, 2, 3, 4, 5], 2));
console.log("range(0, 10, 2):", utils.range(0, 10, 2));
console.log("shuffle([1,2,3,4,5]):", utils.shuffle([1, 2, 3, 4, 5]));

const items = [
  { type: "fruit", name: "apple" },
  { type: "fruit", name: "banana" },
  { type: "veg", name: "carrot" },
];
console.log("groupBy(items, 'type'):", utils.groupBy(items, "type"));

// ==================== object ====================
console.log("\n--- object ---");
const obj = { a: 1, b: { c: 2 }, d: 3 };
const cloned = utils.deepClone(obj);
console.log("deepClone:", cloned, "same ref:", cloned === obj, "nested same:", cloned.b === obj.b);

console.log("pick({a:1,b:2,c:3}, ['a','c']):", utils.pick({ a: 1, b: 2, c: 3 }, ["a", "c"]));
console.log("omit({a:1,b:2,c:3}, ['b']):", utils.omit({ a: 1, b: 2, c: 3 }, ["b"]));
console.log("get(obj, 'a.b.c'):", utils.get({ a: { b: { c: 42 } } }, "a.b.c"));
console.log("get(obj, 'a.x', 'default'):", utils.get({ a: 1 }, "a.x", "default"));

// ==================== number ====================
console.log("\n--- number ---");
console.log("versionCompare('1.2.3', '1.2.0'):", utils.versionCompare("1.2.3", "1.2.0"));
console.log("versionCompare('1.0.0', '2.0.0'):", utils.versionCompare("1.0.0", "2.0.0"));
console.log("clamp(15, 0, 10):", utils.clamp(15, 0, 10));
console.log("clamp(-5, 0, 10):", utils.clamp(-5, 0, 10));
console.log("formatThousands(1234567):", utils.formatThousands(1234567));
console.log("random(1, 100):", utils.random(1, 100));

// ==================== storage ====================
console.log("\n--- storage ---");
utils.setItem("demo_user", { name: "John", age: 30 });
console.log("getItem('demo_user'):", utils.getItem("demo_user"));
utils.removeItem("demo_user");
console.log("getItem('demo_user') after remove:", utils.getItem("demo_user"));

// ==================== format ====================
console.log("\n--- format ---");
console.log("formatFileSize(1024):", utils.formatFileSize(1024));
console.log("formatFileSize(1536000):", utils.formatFileSize(1536000));
console.log("formatDuration(3661000):", utils.formatDuration(3661000));
console.log("formatDuration(65000):", utils.formatDuration(65000));

// ==================== legacy examples ====================
console.log("\n--- legacy ---");
console.log("today is", utils.dayjs().format("YYYY-MM-DD"));

// getDateObject
const dateObj = utils.getDateObject();
console.log("getDateObject:", dateObj);

// date range
console.log("getDateRange('one-minute'):", utils.getDateRange("one-minute"));

// qs
console.log("qs.parse('?a=1&b=2&c=3'):", utils.qs.parse("?a=1&b=2&c=3"));
console.log("qs.stringify({a:1,b:2}):", utils.qs.stringify({ a: 1, b: 2 }));

// setWaterMark
setTimeout(() => {
  utils.setWaterMark({
    text: "hello world",
    size: [400, 200],
  });
}, 500);

// ==================== fileDownload ====================
console.log("\n--- fileDownload ---");
console.log("fileDownload link mode:", utils.fileDownload("https://example.com/sample.pdf"));
console.log(
  "fileDownload link + fileName:",
  utils.fileDownload("https://example.com/data.json", { fileName: "mydata.json" })
);
console.log("fileDownload iframe mode:", utils.fileDownload("https://example.com/report.xlsx", { mode: "iframe" }));
// fetch mode with progress (requires a real server)
// utils.fileDownload("https://example.com/bigfile.zip", {
//   mode: "fetch",
//   onProgress: (p) => console.log(`Download: ${Math.round(p * 100)}%`),
// });
