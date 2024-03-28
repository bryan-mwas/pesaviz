import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";
import axiosClient from "../service/axios.instance";
import axios from "axios";

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
    <Form onSubmit={handleSubmit}>
      <div>
        <span className="h4">Time to get in your bag</span>{" "}
        <span className="vector_emoji">💰</span>
      </div>
      <FormGroup>
        <Label for="file">Select File (PDF only)</Label>
        <Input
          type="file"
          id="file"
          accept=".pdf"
          onChange={handleFileChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </FormGroup>
      {error && <Alert color="danger">{error}</Alert>}
      <Button type="submit" color="primary">
        Upload
      </Button>
    </Form>
  );
};

export default FileUpload;
