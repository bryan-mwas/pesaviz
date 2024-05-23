import { useGetTaskResult } from "../service/getTaskResult";
import FileUpload from "./FileUpload";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Progress } from "flowbite-react";

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
    <div className="flex justify-center">
      <FileUpload onUpload={handleFileUpload} />
      {data?.state === "PROGRESS" && !Array.isArray(data.result) ? (
        <>
          <div className="text-center">Doing Sayans</div>
          <Progress
            labelProgress
            progress={
              (parseInt(data.result?.done || "0") /
                parseInt(data.result?.total || "0")) *
              100
            }
          />
        </>
      ) : null}
    </div>
  );
}
