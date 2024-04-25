import { Progress } from "reactstrap";
import { useGetTaskResult } from "../service/getTaskResult";
import FileUpload from "./FileUpload";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

export function Home() {
  const [taskID, setTaskID] = useState("");
  const navigate = useNavigate();

  const { data } = useGetTaskResult(taskID);

  if (data?.ready && data.successful) {
    localStorage.setItem("jsonReport", JSON.stringify(data.result));
    navigate({
      to: "/report",
    });
  }

  const handleFileUpload = (taskID: string) => {
    setTaskID(taskID);
  };

  return (
    <div className="w-50">
      <FileUpload onUpload={handleFileUpload} />
      {data?.state === "PROGRESS" && !Array.isArray(data.result) ? (
        <>
          <div className="text-center">Doing Sayans</div>
          <Progress
            animated
            color="info"
            striped
            value={(
              (parseInt(data.result?.done || "0") /
                parseInt(data.result?.total || "0")) *
              100
            ).toFixed(0)}
          />
        </>
      ) : null}
    </div>
  );
}
