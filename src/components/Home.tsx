import { Progress } from "reactstrap";
import { useGetTaskResult } from "../service/getTaskResult";
import FileUpload from "./FileUpload";
import { useState } from "react";

export function Home() {
  const [taskID, setTaskID] = useState("");

  const { data, isPending } = useGetTaskResult(taskID);

  const handleFileUpload = (taskID: string) => {
    setTaskID(taskID);
  };
  return (
    <div className="w-50">
      <FileUpload onUpload={handleFileUpload} />
      {isPending ? "Pending" : "Else"}
      {data?.state === "PROGRESS" ? (
        <>
          <div className="text-center">Doing Sayans</div>
          <Progress
            animated
            color="info"
            striped
            value={(
              (parseInt(data.info?.done || "0") /
                parseInt(data.info?.total || "0")) *
              100
            ).toFixed(0)}
          />
        </>
      ) : data?.ready ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : null}
    </div>
  );
}
