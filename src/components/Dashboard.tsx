import { useEffect } from "react";
import { Transaction } from "../service/getTaskResult";
import lo from "lodash";

export function Dashboard() {
  const report: Transaction[] = JSON.parse(
    localStorage.getItem("jsonReport") as string
  );
  console.log(lo.groupBy(report, "category"));

  useEffect(() => {}, [report]);

  return <p>Dashboard her..</p>;
}
