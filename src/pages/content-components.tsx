import Head from 'next/head';
import { H1, H2, H3, H4, P } from '../components/content';

export default function ContentComponents(): JSX.Element {
  return (
    <>
      <Head>
        <title>Claus Höfele - Content components test page</title>
      </Head>

      <main>
        <H1>H1 Heading</H1>
        <P>
          P Paragraph <em>emphasis</em> and <strong>strong</strong>
        </P>
        <H2>H2 Heading</H2>
        <P>P Paragraph</P>
        <H3>H3 Heading</H3>
        <P>P Paragraph</P>
        <H4>H4 Heading</H4>
        <P>P Paragraph</P>
      </main>
    </>
  );
}
