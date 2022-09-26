import type { NextApiRequest, NextApiResponse } from "next";
import { fetchRepositories } from "../../lib/github-gateway";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const repositories = await fetchRepositories();
  res.status(200).send(repositories);
};

export default handler;
