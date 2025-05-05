const utils = window.FettUtils;
console.log(utils);
// utils.copyToClipboard("hello world");
console.log("today is", utils.dayjs().format("YYYY-MM-DD"));

// getDateObject
const dateObj = utils.getDateObject();
console.log("dateObj", dateObj);

// dayjs diff

const diff = utils.dayjs.duration(
  utils.dayjs().diff(utils.dayjs("Mon Aug 19 2024 21:28:39 GMT+0800 (中国标准时间)"))
);

console.log(diff.days(), diff.hours(), diff.minutes(), diff.seconds());

// setWaterMark
// 需要等待dom加载完成再调用，（需要自行判断时机）
setTimeout(() => {
  utils.setWaterMark({
    text: "hello world",
    platform: "web",
    // size: [400, 200],
  });
}, 1000);

// 日期区间
console.log("一分钟", utils.getDateRange("one-minute"));

const twoMonth = utils.getDateRange("twelve-month");

console.log(
  "十二个月",
  twoMonth[0].format("YYYY-MM-DD HH:mm:ss"),
  twoMonth[1].format("YYYY-MM-DD HH:mm:ss")
);


console.log("qs.parse",utils.qs.parse(""))