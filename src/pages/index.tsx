import Head from 'next/head';
import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  Icon,
  Image,
  Text,
  chakra,
  HStack,
} from '@chakra-ui/react';
import { A, H1, H2, P } from '../components/content';
import { FaLinkedin } from 'react-icons/fa';
import { SiLinkedin } from 'react-icons/si';

function LinkedinButton() {
  return (
    <Button colorScheme={'linkedin'}>
      <A href="https://www.linkedin.com/in/claushoefele/">
        <chakra.span display="inline-flex" alignItems="center">
          Get in touch on Linked{' '}
          <Icon as={FaLinkedin} mb="0.250rem" boxSize="1.5rem" />
        </chakra.span>
      </A>
    </Button>
  );
}

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Claus Höfele - Aligning teams, tech, and outcomes</title>
      </Head>

      <main>
        <Grid
          templateColumns={{ base: '1fr', md: '3fr 1fr' }}
          templateRows="auto"
          mt="1rem"
        >
          <GridItem>
            <H1 mt="0">Hi, I’m Claus 👋</H1>
            <P fontSize="lg" fontWeight="bold">
              I support cross-functional software teams and team leads as an
              engineering leader.
            </P>
            <P>
              I’m writing about tech & leadership and enjoy sketchnoting. Join
              me for insights into the work of an engineering leader and benefit
              from my learnings so that we don’t have to make the same mistakes.
              Happy to learn more about your current interests.
            </P>
            <P float="right">
              <LinkedinButton />
            </P>
          </GridItem>
          <GridItem
            gridRow="1"
            gridColumn={{ base: 1, md: 2 }}
            ps={{ base: 0, md: '2rem' }}
          >
            <Center>
              <Image
                alt="Claus Höfele"
                border="1px"
                borderColor="gray.400"
                borderRadius="full"
                src="/claus.jpeg"
                w={{ base: '30%', md: '100%' }}
              />
            </Center>
          </GridItem>
        </Grid>
        <P>
          P Paragraph <em>emphasis</em> and <strong>strong</strong>
        </P>
      </main>
    </>
  );
}
