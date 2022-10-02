import useSWR from "swr";
import { fetcher } from "./fetcher";
import { GitHubRepository } from "../lib/github-gateway";

export const useRepositories: () => GitHubRepository[] = () => {
  const { data, error } = useSWR("/api/repositories", fetcher);
  if (error) {
    throw new Error("repositories fetch error");
  }
  if (!data) {
    return [];
  }
  return data;
};
