import type { NextApiRequest, NextApiResponse } from 'next';
import * as z from 'zod';

const subscribeConfigs = new Map([
  [
    process.env.NEXT_PUBLIC_SUBSCRIBE_ID_WEBSITE,
    {
      listId: 5,
      templateId: 1,
      redirectionUrl: 'https://claushoefele.com/newsletter',
    },
  ],
]);

export const subscribeRequestSchema = z.object({
  email: z.string().email(),
  subscribeId: z.string(),
});
export type SubscribeRequestData = z.infer<typeof subscribeRequestSchema>;
export type SubscribeResponseData = void;

// Client call to this API to subscribe email
export async function subscribeEmail(
  subscriberFormData: SubscribeRequestData
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
  // Validate request data
  const validation = subscribeRequestSchema.safeParse(req.body);
  if (!validation.success) {
    console.log('Invalid request data:', {
      body: req.body,
      validation,
    });
    res.status(400).end();
    return;
  }
  const requestData = validation.data;

  // Simple check where request came from
  const subscribeConfig = subscribeConfigs.get(requestData.subscribeId);
  if (!subscribeConfig) {
    console.log('Invalid subscribe ID:', {
      subscribeId: requestData.subscribeId,
    });

    res.status(400).end();
    return;
  }

  // Create contact
  const { status, message } = await createContactSiB(
    process.env.SENDINBLUE_API_KEY || '',
    requestData.email,
    subscribeConfig.listId,
    subscribeConfig.templateId,
    subscribeConfig.redirectionUrl
  );

  if (status >= 300) {
    console.log('Sib API returned an error:', { status, message });
  } else {
    console.log(`Successfully subscribed ${requestData.email}`);
  }

  res.status(status < 300 ? 204 : 500).end();
}
