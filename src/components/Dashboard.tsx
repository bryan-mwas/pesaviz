import { useEffect } from "react";
import { Transaction } from "../service/getTaskResult";
import { getTransactionSummary } from "../service/reports.service";

export function Dashboard() {
  const report: Transaction[] = JSON.parse(
    localStorage.getItem("jsonReport") as string
  );

  console.log(
    report.reduce((acc: Record<string, number>, curr: Transaction) => {
      if (!acc[curr.category]) {
        acc[curr.category] = 0;
      }
      acc[curr.category] += curr.amount;
      return acc;
    }, {})
  );

  const summary = getTransactionSummary(report);

  console.log(summary);

  useEffect(() => {}, [report]);

  return <p>Dashboard her..</p>;
}
