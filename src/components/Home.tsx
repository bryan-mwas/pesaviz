import { useGetTaskResult } from "../service/getTaskResult";
import FileUpload from "./FileUpload";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Alert, Progress } from "flowbite-react";

export function Home() {
  const [taskID, setTaskID] = useState("");
  const navigate = useNavigate();

  const { data } = useGetTaskResult(taskID);

  if (data?.ready && data.successful) {
    localStorage.setItem("jsonReport", JSON.stringify(data.response));
    navigate({
      to: "/report",
    });
  }

  const handleFileUpload = (taskID: string) => {
    setTaskID(taskID);
  };

  return (
    <div className="grid px-6 sm:px-48 ">
      <FileUpload onUpload={handleFileUpload} />
      {data?.failed && (
        <Alert color={"failure"}>{data?.response as string}</Alert>
      )}
      {data?.state === "PROGRESS" ? (
        <Progress
          labelProgress
          labelText
          progressLabelPosition="outside"
          textLabel="Doing Sayans"
          textLabelPosition="outside"
          size={"xl"}
          progress={
            (parseInt(data.response?.done || "0") /
              parseInt(data.response?.total || "0")) *
            100
          }
        />
      ) : null}
    </div>
  );
}
