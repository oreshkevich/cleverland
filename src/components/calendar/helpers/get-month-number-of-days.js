export const getMonthNumberOfDays = (monthIndex, yearNumber = new Date().getFullYear()) =>
  new Date(yearNumber, monthIndex + 1, 0).getDate();
