import _ from "lodash";
import { Transaction } from "./getTaskResult";
import dayjs from "dayjs";
import { sortByMonthOrder } from "../utils/constant";

const formatDate = (date: string, format = "MMM") => {
  return dayjs(date).format(format);
};

export const transformToBarChartData = (
  _value: Record<string, Record<string, number | string>>
) => {
  return Object.entries(_value)
    .map(([key, value]) => {
      return {
        month: key,
        ...value,
      };
    })
    .sort(sortByMonthOrder);
};

export const transformToPieChartData = (_value: Record<string, number>) => {
  return Object.keys(_value).map((key) => {
    return {
      id: key,
      value: _value[key],
    };
  });
};

export const getTransactionSummaryByDate = (
  transactions: Transaction[],
  year: string
) => {
  const dateGroups = _.chain(transactions)
    .filter(
      (transaction) => formatDate(transaction.completion_time, "YYYY") === year
    )
    .groupBy((transaction) => formatDate(transaction.completion_time))
    .value();

  const categoryGroups = _.mapValues(dateGroups, (dateGroup) =>
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
      (transaction) => formatDate(transaction.completion_time, "YYYY") === year
    )
    .groupBy("category")
    .value();
  const result = _.mapValues(groups, (catGroup) => _.sumBy(catGroup, "amount"));
  return result;
};
