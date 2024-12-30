import dayjs from "dayjs";

export enum DateRangeTypeEnum {
  "one-minute" = "one-minute",
  "five-minute" = "five-minute",
  "fiftten-minute" = "fiftten-minute",
  "one-hour" = "one-hour",
  "four-hour" = "four-hour",
  "one-day" = "one-day",
  "today" = "today",
  "yesterday" = "yesterday",
  "one-week" = "one-week",
  "week" = "week",
  "last-week" = "last-week",
  "seven-day" = "seven-day",
  "thirty-day" = "thirty-day",
  "month" = "month",
  "last-month" = "last-month",
  "three-month" = "three-month",
  "six-month" = "six-month",
  "twelve-month" = "twelve-month",
}

export const DATE_RANGE_TYPE_OPTIONS = [
  {
    value: DateRangeTypeEnum["one-minute"],
    label: "1分钟",
    refresh: true, // 是否需要更新
    time: () => {
      return [dayjs().subtract(1, "minute"), dayjs()];
    },
  },
  {
    value: DateRangeTypeEnum["five-minute"],
    label: "5分钟",
    refresh: true,
    time: () => {
      return [dayjs().subtract(5, "minute"), dayjs()];
    },
  },
  {
    value: DateRangeTypeEnum["fiftten-minute"],
    label: "15分钟",
    refresh: true,
    time: () => {
      return [dayjs().subtract(15, "minute"), dayjs()];
    },
  },
  {
    value: DateRangeTypeEnum["one-hour"],
    label: "1小时",
    refresh: true,
    time: () => {
      return [dayjs().subtract(1, "hour"), dayjs()];
    },
  },
  {
    value: DateRangeTypeEnum["four-hour"],
    label: "4小时",
    refresh: true,
    time: () => {
      return [dayjs().subtract(4, "hour"), dayjs()];
    },
  },
  {
    value: DateRangeTypeEnum["one-day"],
    label: "1天",
    refresh: true,
    time: () => {
      return [dayjs().subtract(24, "hour"), dayjs()];
    },
  },
  {
    value: DateRangeTypeEnum["today"],
    label: "今天",
    refresh: true,
    time: () => {
      return [dayjs().startOf("day"), dayjs()];
    },
  },
  {
    value: DateRangeTypeEnum["yesterday"],
    label: "昨天",
    refresh: false,
    time: () => {
      const date = dayjs().subtract(1, "day");
      return [date.startOf("day"), date.endOf("day")];
    },
  },
  {
    value: DateRangeTypeEnum["one-week"],
    label: "一周",
    refresh: true,
    time: () => {
      return [dayjs().subtract(7, "day"), dayjs()];
    },
  },
  {
    value: DateRangeTypeEnum["week"],
    label: "本周",
    refresh: true,
    time: () => {
      return [dayjs().startOf("week"), dayjs()];
    },
  },
  {
    value: DateRangeTypeEnum["last-week"],
    label: "上周",
    refresh: false,
    time: () => {
      const date = dayjs().subtract(1, "week");
      return [date.startOf("week"), date.endOf("week")];
    },
  },
  {
    value: DateRangeTypeEnum["seven-day"],
    label: "7天",
    refresh: true,
    time: () => {
      return [dayjs().subtract(7, "day"), dayjs()];
    },
  },
  {
    value: DateRangeTypeEnum["thirty-day"],
    label: "30天",
    refresh: true,
    time: () => {
      return [dayjs().subtract(30, "day"), dayjs()];
    },
  },
  {
    value: DateRangeTypeEnum["month"],
    label: "本月",
    refresh: true,
    time: () => {
      const date = dayjs().subtract(1, "month");
      return [date.startOf("month"), dayjs()];
    },
  },
  {
    value: DateRangeTypeEnum["last-month"],
    label: "上月",
    refresh: false,
    time: () => {
      const date = dayjs().subtract(1, "month");
      return [date.startOf("month"), date.endOf("month")];
    },
  },
  {
    value: DateRangeTypeEnum["three-month"],
    label: "3个月",
    refresh: false,
    time: () => {
      const date = dayjs().subtract(3, "month");
      return [date.startOf("month"), dayjs()];
    },
  },
  {
    value: DateRangeTypeEnum["three-month"],
    label: "6个月",
    refresh: false,
    time: () => {
      const date = dayjs().subtract(6, "month");
      return [date.startOf("month"), dayjs()];
    },
  },
  {
    value: DateRangeTypeEnum["twelve-month"],
    label: "12个月",
    refresh: false,
    time: () => {
      const date = dayjs().subtract(12, "month");
      return [date.startOf("month"), dayjs()];
    },
  },
];

// 获取日期区间
export const getDateRange = (rangeType: DateRangeTypeEnum) => {
  const rangeOption = DATE_RANGE_TYPE_OPTIONS.find((item) => item.value === rangeType);
  if (rangeOption) {
    return rangeOption.time();
  }
  return null;
};
