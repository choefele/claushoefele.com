import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const url = `https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`;
  const headers = new Headers({
    'Content-Type': 'application/json; charset=utf-8',
  });
  const body = {
    api_key: process.env.CONVERTKIT_API_KEY,
    email: req.body.email,
  };

  let status: number;
  let message: unknown;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    status = response.status;
    message = response;
  } catch (err) {
    status = 500;
    message = err;
  }

  if (status !== 200) {
    console.log(
      'ConvertKit API returned an error when subscribing a new new email:',
      { url, headers, body, message }
    );
  }

  res.status(status).end();
}
