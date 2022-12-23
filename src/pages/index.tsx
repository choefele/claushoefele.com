import Head from 'next/head';
import { Center, Grid, GridItem, Image, VStack } from '@chakra-ui/react';
import { H1, H2, P } from '../components/content';
import LinkedInButton from '../components/linked-in-button';

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>Claus Höfele - Aligning teams, tech, and outcomes</title>
      </Head>

      <main>
        <Grid
          templateColumns={{ base: '1fr', md: '2fr 1fr' }}
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
              me for insights into the work of an engineering leader and let’s
              learn together so that we don’t have to make the same mistakes
              twice. Happy to get to know more about your current interests.
            </P>
            <P>
              <LinkedInButton float="right">Get in touch on</LinkedInButton>
            </P>
          </GridItem>
          <GridItem
            gridRow="1"
            gridColumn={{ base: 1, md: 2 }}
            ps={{ base: 0, md: '2rem' }}
          >
            <Center>
              <VStack>
                <Image
                  alt="Claus Höfele"
                  border="1px"
                  borderColor="gray.400"
                  borderRadius="full"
                  src="/claus.jpeg"
                  w={{ base: '30%', md: '100%' }}
                />
              </VStack>
            </Center>
          </GridItem>
        </Grid>
        <H2>Recent</H2>
      </main>
    </>
  );
}
