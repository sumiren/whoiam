import type { NextApiRequest, NextApiResponse } from "next";
import { insertContact } from "../../lib/microcms-blog-gateway";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // API RouteはPOSTできる権限の鍵を隠蔽したいだけのため、バリデーションは一旦オミット
  await insertContact(JSON.parse(req.body));
  res.status(200).send({});
};

export default handler;
