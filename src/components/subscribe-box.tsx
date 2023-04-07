import { Box } from '@chakra-ui/react';
import { P } from './content';
import SubscribeForm from './subscribe-form';

export default function SubscribeBox({
  message,
  optedInEmail,
}: {
  message?: string;
  optedInEmail?: string;
}) {
  return (
    <Box
      border="1px solid lightgray"
      borderRadius="md"
      p="1rem"
      background="gray.50"
      mt="2rem"
    >
      <P my="0">
        {message && <strong>{message + ' '}</strong>}
        Subscribe to <em>Drawn to Leadership</em> to receive email notifications
        about new articles.
      </P>
      <SubscribeForm optedInEmail={optedInEmail} />
    </Box>
  );
}
