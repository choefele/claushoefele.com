import Head from 'next/head';
import { Heading, Text } from '@chakra-ui/react';

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Claus Höfele</title>
      </Head>

      <main>
        <Heading as="h1">Welcome</Heading>

        <Text>Text</Text>
      </main>
    </>
  );
}
