import dayjs from "dayjs";

/**
 * 获取时间对象
 * @returns dateObject
 */
export const getDateObject = (date: string | number | Date | dayjs.Dayjs | null | undefined) => {
  const dateObject = dayjs(date);
  return {
    year: dateObject.year(),
    month: dateObject.month() + 1,
    day: dateObject.date(),
    week: dateObject.day(),
    hour: dateObject.hour(),
    minute: dateObject.minute(),
    second: dateObject.second(),
  };
};
