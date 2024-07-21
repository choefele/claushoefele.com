import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ChakraProvider, Container } from '@chakra-ui/react';
import { Analytics } from '@vercel/analytics/react';
import Header from '../components/header';
import Footer from '../components/footer';
import Theme from '../theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider theme={Theme}>
        <Container maxW="5xl">
          <Header />
          <Component {...pageProps} />
          <Footer />
        </Container>
      </ChakraProvider>
      <Analytics />
    </>
  );
}
