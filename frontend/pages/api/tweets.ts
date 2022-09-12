import type { NextApiRequest, NextApiResponse } from "next";
import { fetchTweets } from "../../lib/twitter-gateway";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // API RouteはPOSTできる権限の鍵を隠蔽したいだけのため、バリデーションは一旦オミット
  const tweets = await fetchTweets();
  res.status(200).send(tweets);
};

export default handler;
