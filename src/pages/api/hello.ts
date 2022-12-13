// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name?: string;
  method?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const name =
    req.query.name && !Array.isArray(req.query.name)
      ? req.query.name
      : undefined;

  if (req.method === 'POST') {
    console.log('POST');
  } else {
    console.log(`Request method: ${req.method}`);
  }
  res.status(200).json({
    name: name,
    method: req.method,
  });
}
