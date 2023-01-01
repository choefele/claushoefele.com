import Head from 'next/head';
import { H1, H2, P } from '../components/content';

export default function About(): JSX.Element {
  return (
    <>
      <Head>
        <title>Claus Höfele - About me</title>
      </Head>

      <main>
        <H1>About</H1>
      </main>
    </>
  );
}
