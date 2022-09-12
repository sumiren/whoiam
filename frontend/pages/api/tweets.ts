import type { NextApiRequest, NextApiResponse } from "next";
import { fetchTweets } from "../../lib/twitter-gateway";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const tweets = await fetchTweets();
  res.status(200).send(tweets);
};

export default handler;
