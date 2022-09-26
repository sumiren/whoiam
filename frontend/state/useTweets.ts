import useSWR from "swr";
import { fetcher } from "./fetcher";
import { Tweet } from "../lib/twitter-gateway";

export const useTweets: () => Tweet[] = () => {
  const { data, error } = useSWR("/api/tweets", fetcher);
  if (error) {
    throw new Error("tweets fetch error");
  }
  if (!data) {
    return [];
  }
  return data;
};
