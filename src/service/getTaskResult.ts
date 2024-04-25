import { useQuery } from "@tanstack/react-query";
import axiosClient from "./axios.instance";
import { API_URL } from "../utils/constant";

export interface Transaction {
  category: string;
  completion_time: string;
  amount: number;
  recipient_id: string;
  recipient_name: string;
}

type InfoResult = {
  done: string;
  total: string;
};

export type TaskResult = {
  state: string;
  ready?: boolean;
  successful?: boolean;
  failed?: boolean;
  result?: Transaction[] | InfoResult;
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
