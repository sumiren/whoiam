import useSWR from "swr";

export const useTweets = () => {
  const { data, error } = useSWR("/api/tweets", fetcher);
  if (error) {
    throw new Error("tweets fetch error");
  }
  if (!data) {
    return [];
  }
  return data;
};

const fetcher = async (url: string) => (await fetch(url)).json();
