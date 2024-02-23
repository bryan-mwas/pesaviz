import { useQuery } from "@tanstack/react-query";
import axiosClient from "./axios.instance";
import { API_URL } from "../utils/constant";

export type TaskResult = {
  state: string;
  info?: { done: string; total: string };
  ready?: boolean;
  successful?: string;
  data?: {
    category: string;
    completion_time: string;
    amount: string;
    recipient_id: string;
    recipient_name: string;
  };
};

export const useGetTaskResult = (taskID: string) => {
  return useQuery({
    queryKey: ["task", taskID],
    queryFn: async (): Promise<TaskResult> => {
      console.log(API_URL);
      console.log(axiosClient.getUri());
      const { data } = await axiosClient.get<TaskResult>(`result/${taskID}`);
      return data;
    },
    enabled: !!taskID,
    refetchInterval: (query) => {
      const data = query.state.data;
      return data?.state === "SUCCESS" || data?.ready ? false : 1000;
    },
  });
};
