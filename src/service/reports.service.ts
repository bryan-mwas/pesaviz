import _ from "lodash";
import { Transaction } from "./getTaskResult";
import dayjs from "dayjs";
import { MONTHS, sortByMonthOrder } from "../utils/constant";

const getDateMonth = (date: string, format = "MMM") => {
  return dayjs(date).format(format);
};

export const transformToBarChartData = (
  monthSummary: Record<string, Record<string, number | string>>
) => {
  const monthsOfYear = Object.keys(MONTHS).map((month) => ({
    month,
  }));

  // Polynomial runtime 0(n^3): Potential performance bottleneck
  Object.entries(monthSummary).forEach(([key, value]) => {
    const pos = monthsOfYear.map((m) => m.month).indexOf(key);
    monthsOfYear[pos] = {
      ...value,
      ...monthsOfYear[pos],
    };
  });

  return monthsOfYear.sort(sortByMonthOrder);
};

export const transformToPieChartData = (
  monthSummary: Record<string, number>
) => {
  return Object.keys(monthSummary).map((key) => {
    return {
      id: key,
      value: monthSummary[key],
    };
  });
};

export function filteredCategory(transactions: Transaction[], year: string) {
  return _.chain(transactions)
    .filter(
      (transaction) =>
        getDateMonth(transaction.completion_time, "YYYY") === year
    )
    .groupBy("category")
    .value();
}

export const getTransactionSummaryByMonth = (
  transactions: Transaction[],
  year: string
) => {
  const monthGroups = _.chain(transactions)
    .filter(
      (transaction) =>
        getDateMonth(transaction.completion_time, "YYYY") === year
    )
    .groupBy((transaction) => getDateMonth(transaction.completion_time))
    .value();

  const categoryGroups = _.mapValues(monthGroups, (dateGroup) =>
    _.groupBy(dateGroup, "category")
  );

  const dateCategoryAmountGroup = _.mapValues(
    categoryGroups,
    (categoryGroup) => {
      const result = _.mapValues(categoryGroup, (items) =>
        _.sumBy(items, "amount")
      );
      return result;
    }
  );

  return dateCategoryAmountGroup;
};

export const getTransactionSummaryByCategory = (
  transactions: Transaction[],
  year: string
) => {
  const groups = _.chain(transactions)
    .filter(
      (transaction) =>
        getDateMonth(transaction.completion_time, "YYYY") === year
    )
    .groupBy("category")
    .value();
  const result = _.mapValues(groups, (catGroup) => _.sumBy(catGroup, "amount"));
  return result;
};

export const mPesaGroup = (
  transactions: Record<string, unknown[]> | undefined
) => {
  if (!transactions) {
    return [];
  }
  return Object.keys(transactions).reduce(
    (acc, key) => {
      if (!acc[key]) {
        const res = _.groupBy(transactions[key], "recipient_name");
        acc[key] = _.mapValues(res, (it) => _.sumBy(it, "amount"));
      }
      return acc;
    },
    {} as Record<string, unknown>
  );
};
