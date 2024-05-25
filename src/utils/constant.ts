export const API_URL: string = import.meta.env.VITE_APP_API_URL;
export const MONTHS: Record<string, number> = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12,
};
export const sortByMonthOrder = (
  a: { month: string },
  b: { month: string }
) => {
  return MONTHS[a.month] - MONTHS[b.month];
};
