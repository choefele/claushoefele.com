import type { NextApiRequest, NextApiResponse } from 'next';
import * as z from 'zod';

const listId = 5;
const templateId = 1;
const redirectionUrl = 'http://localhost:3000/newsletter';

export const subscribeFormSchema = z.object({
  email: z.string().email(),
  subscribeId: z.string(),
});
export type SubscribeFormData = z.infer<typeof subscribeFormSchema>;
export type SubscribeResponseData = {};

// Client call to this API to subscribe email
export async function subscribeEmail(
  subscriberFormData: SubscribeFormData
): Promise<{ status: number; message: Object }> {
  let status: number;
  let message: unknown;

  try {
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: subscriberFormData.email,
        subscribeId: subscriberFormData.subscribeId,
      }),
    });

    status = response.status;
    message = response;
  } catch (error) {
    status = 500;
    message = error;
  }

  return {
    status,
    message: {
      subscriberFormData,
      message,
    },
  };
}

// Server call to Sendinblue to create or update a contact
async function createContactSiB(
  apiKey: string,
  email: string,
  listId: number,
  templateId: number,
  redirectionUrl: string
): Promise<{ status: number; message: Object }> {
  const url = 'https://api.sendinblue.com/v3/contacts/doubleOptinConfirmation';
  const headers = new Headers({
    'Content-Type': 'application/json',
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

export default async function subscribeHandler(
  req: NextApiRequest,
  res: NextApiResponse<SubscribeResponseData>
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
