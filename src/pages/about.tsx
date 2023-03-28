import Head from 'next/head';
import { H1, H2, P } from '../components/content';

export default function About(): JSX.Element {
  return (
    <>
      <Head>
        <title>About | Claus Höfele</title>
      </Head>

      <main>
        <H1>About</H1>
      </main>
    </>
  );
}
