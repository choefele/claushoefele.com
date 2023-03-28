import Head from 'next/head';
import { H1, H2, H3, H4, P } from '../components/content';

export default function ContentComponents(): JSX.Element {
  return (
    <>
      <Head>
        <title>Content components test page | Claus Höfele</title>
      </Head>

      <main>
        <H1 id="h1">H1 Heading</H1>
        <P>
          P Paragraph <em>em emphasis</em> , <strong>strong</strong>,{' '}
          <del>del deleted</del>, <ins>ins inserted</ins>, and <code>code</code>
          <blockquote>
            Blockquote text text text text text text text text text text text
            text text{' '}
          </blockquote>
        </P>
        <H2 id="h2">H2 Heading</H2>
        <P>P Paragraph</P>
        <H3 id="h3">H3 Heading</H3>
        <P>P Paragraph</P>
        <H4 id="h4">H4 Heading</H4>
        <P>P Paragraph</P>
      </main>
    </>
  );
}
