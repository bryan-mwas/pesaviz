import _ from "lodash";
import { Transaction } from "./getTaskResult";
import dayjs from "dayjs";

const formatDate = (date: string) => {
  return dayjs(date).format("DD MMMM YYYY");
};

export const getTransactionSummary = (transactions: Transaction[]) => {
  const groups = _.chain(transactions)
    .groupBy((transaction) => formatDate(transaction.completion_time))
    .value();
  console.log(groups);
  return _.mapValues(groups, (items) => _.groupBy(items, "category"));
};
