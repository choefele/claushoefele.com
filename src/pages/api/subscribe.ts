import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Simple check where request came from
  if (req.body.subscribeId !== process.env.NEXT_PUBLIC_SUBSCRIBE_ID) {
    console.log('Invalid subscribe ID:', {
      req: req.body.subscribeID,
      env: process.env.NEXT_PUBLIC_SUBSCRIBE_ID,
    });

    res.status(400).end();
  }

  // Send to ConvertKit
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

    status = response.status === 200 ? 200 : 500;
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
