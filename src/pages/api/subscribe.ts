import type { NextApiRequest, NextApiResponse } from 'next';

const listId = 5;
const templateId = 1;
const redirectionUrl = 'http://localhost:3000/newsletter';

async function createContactSiB(
  apiKey: string,
  email: string,
  listId: number,
  templateId: number,
  redirectionUrl: string
): Promise<{ status: number; message: Object }> {
  const url = 'https://api.sendinblue.com/v3/contacts/doubleOptinConfirmation';
  const headers = new Headers({
    'Content-Type': 'application/json; charset=utf-8',
    Accept: 'application/json',
    'Api-Key': apiKey,
  });
  const body = {
    includeListIds: [listId],
    email: email,
    templateId: templateId,
    redirectionUrl: redirectionUrl,
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

  return {
    status,
    message: {
      url,
      headers,
      body,
      status,
      message,
    },
  };
}

type Data = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> {
  // Simple check where request came from
  if (req.body.subscribeId !== process.env.NEXT_PUBLIC_SUBSCRIBE_ID) {
    console.log('Invalid subscribe ID:', {
      req: req.body.subscribeID,
      env: process.env.NEXT_PUBLIC_SUBSCRIBE_ID,
    });

    res.status(400).end();
  }

  // Create contact
  const { status, message } = await createContactSiB(
    process.env.SENDINBLUE_API_KEY || '',
    req.body.email,
    listId,
    templateId,
    redirectionUrl
  );

  if (status >= 300) {
    console.log('createContactSiB API returned an error:', message);
  }

  res.status(status < 300 ? 204 : 500).end();
}
