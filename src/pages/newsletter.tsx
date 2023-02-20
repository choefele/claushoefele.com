import { ChangeEvent, useState } from 'react';
import Head from 'next/head';
import { H1, H2, P } from '../components/content';
import SubscribeForm from '../components/subscribe-form';

export default function Newsletter() {
  return (
    <>
      <Head>
        <title>Claus Höfele - Newsletter</title>
      </Head>

      <main>
        <H1>Newsletter</H1>
        <SubscribeForm />
      </main>
    </>
  );
}
