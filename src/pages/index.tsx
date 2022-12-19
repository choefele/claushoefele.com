import Head from 'next/head';
import { Alert, Heading, Text } from '@chakra-ui/react';

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Claus Höfele</title>
      </Head>

      <main>
        <Heading as="h1">H1 Heading</Heading>
        <Heading as="h2">H2 Heading</Heading>
        <Heading as="h3">H3 Heading</Heading>
        <Text>Text</Text>
        <Alert
          mt="4"
          role="none"
          status="warning"
          variant="left-accent"
          as="blockquote"
          rounded="4px"
          my="1.5rem"
        >
          Alert
        </Alert>
        <Text>Text</Text>
      </main>
    </>
  );
}
