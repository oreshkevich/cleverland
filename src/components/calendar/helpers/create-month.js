import { createDate } from './create-date';
import { getMonthNumberOfDays } from './get-month-number-of-days';

export const createMonth = (params) => {
  const date = params?.date ?? new Date();
  const locale = params?.locale ?? 'default';

  const d = createDate({ date, locale });
  const { month: monthName, year, monthNumber, monthIndex } = d;

  const getDay = (dayNumber) => createDate({ date: new Date(year, monthIndex, dayNumber), locale });

  const createMonthDays = () => {
    const days = [];

    for (let i = 0; i <= getMonthNumberOfDays(monthIndex, year) - 1; i += 1) {
      days[i] = getDay(i + 1);
    }

    return days;
  };

  return {
    getDay,
    monthName,
    monthIndex,
    monthNumber,
    year,
    createMonthDays,
  };
};
