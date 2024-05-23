import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import axiosClient from "../service/axios.instance";
import axios from "axios";
import { Button, Label, TextInput, Alert, FileInput } from "flowbite-react";

interface FileUploadProps {
  onUpload: (taskID: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const { mutate } = useMutation({
    mutationFn: (data: FormData) => axiosClient.post("/", data),
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.includes("pdf")) {
        setError("Only PDF files are allowed.");
        return;
      }
      setSelectedFile(file);
      setError(null);
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedFile) {
      setError("Please select a file.");
      return;
    }

    if (!password) {
      setError("Please enter a password.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("password", password);

    mutate(formData, {
      onSuccess: async (response) => {
        const data = await response.data;
        if (data["taskID"]) {
          onUpload(data["taskID"]);
        }
      },
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data.error);
        } else {
          setError(error.message);
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-1/2">
      <div>
        <span className="h4">Time to get in your bag</span>{" "}
        <span className="vector_emoji">💰</span>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="file">Select File (PDF only)</Label>
        </div>
        <FileInput id="file" accept=".pdf" onChange={handleFileChange} />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password">Password</Label>
        </div>
        <TextInput
          type="password"
          id="password"
          onChange={handlePasswordChange}
        />
      </div>

      {error && (
        <Alert color="failure" className="my-2">
          {error}
        </Alert>
      )}

      <Button
        type="submit"
        className="bg-slate-900 my-4 float-end
      "
      >
        Upload
      </Button>
    </form>
  );
};

export default FileUpload;
