import { useQuery } from "@tanstack/react-query";
import axiosClient from "./axios.instance";
import { API_URL } from "../utils/constant";

export interface Transaction extends Record<string, string | number> {
  category: string;
  completion_time: string;
  amount: number;
  recipient_id: string;
  receipt_id: string;
  recipient_name: string;
}

export type InfoResult = {
  done: string;
  total: string;
};

type NetworkReponse = {
  ready: boolean;
  successful?: boolean;
  failed: boolean;
};

type NetworkLoadingState = {
  state: "PROGRESS";
  response: InfoResult;
} & NetworkReponse;

type NetworkPendingState = {
  state: "PENDING";
  response: null;
} & NetworkReponse;

type NetworkProgressState = {
  state: "SUCCESS";
  response: Transaction[];
} & NetworkReponse;

type NetworkSuccessState = {
  state: "FAILURE";
  response: string;
} & NetworkReponse;

export type TaskResult =
  | NetworkLoadingState
  | NetworkPendingState
  | NetworkProgressState
  | NetworkSuccessState;

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
