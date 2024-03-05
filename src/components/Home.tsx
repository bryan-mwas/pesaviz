import { Progress } from "reactstrap";
import { useGetTaskResult } from "../service/getTaskResult";
import FileUpload from "./FileUpload";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export function Home() {
  const [taskID, setTaskID] = useState("");

  const { data } = useGetTaskResult(taskID);

  if (data?.ready) {
    localStorage.setItem("jsonReport", JSON.stringify(data.data));
  }

  const handleFileUpload = (taskID: string) => {
    setTaskID(taskID);
  };
  return (
    <div className="w-50">
      <FileUpload onUpload={handleFileUpload} />
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
        <Navigate to={"/report"} />
      ) : null}
    </div>
  );
}
