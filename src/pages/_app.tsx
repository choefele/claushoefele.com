import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import Header from '../components/header';
import Footer from '../components/footer';
import Theme from '../theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChakraProvider theme={Theme}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ChakraProvider>
    </>
  );
}
