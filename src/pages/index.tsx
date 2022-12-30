import Head from 'next/head';
import { GetStaticProps } from 'next';
import {
  Box,
  Center,
  Grid,
  GridItem,
  Image,
  Flex,
  Spacer,
  Square,
  VStack,
} from '@chakra-ui/react';
import { H1, H2, P } from '../components/content';
import LinkedInButton from '../components/linked-in-button';
import loadContentData from '../load-content-data';

export const getStaticProps: GetStaticProps = async () => {
  const contentData = await loadContentData();
  console.log(contentData.books);

  return {
    props: {},
  };
};

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
        <H2>----</H2>
        <Flex color="white" columnGap="6" rowGap="3" flexFlow="row wrap">
          <Box flex="1" bg="tomato" height="150px">
            <P>
              Box 1 lkjd lakjsd lakjsd lkasjd laksjdl askjdlaksjd lksjd lskj
              dlslkjd lakjsd l lkas ldkahsd jahs dkjahsdk ajhsdk ajshdk ajshdk
              ajshd kjashd kajshd kajhs dkajshdk ajhsdk ajhdk a 123
            </P>
          </Box>
          <Box flex="2" bg="tomato">
            <P>Box 2</P>
          </Box>
          <Box flex="2" bg="tomato">
            <P>Box 3</P>
          </Box>
          <Box flexBasis="100%" height="0" bg="tomato" />
          <Box flex="2" bg="tomato">
            <P>Box 3</P>
          </Box>
          <Box flex="2" bg="tomato">
            <P>Box 3</P>
          </Box>
        </Flex>
        <H2>-----</H2>
        <Grid templateColumns="repeat(5, 1fr)" templateRows="auto" gap={6}>
          <GridItem gridColumn="auto / span 1" h="10" bg="blue.500">
            Meet me at
          </GridItem>
          <GridItem gridColumn="auto / span 2" h="10" bg="blue.500" />
          <GridItem gridColumn="auto / span 2" h="10" bg="blue.500">
            Meet me at
          </GridItem>
          <GridItem gridColumn="auto / span 2" h="10" bg="blue.500" />
          <GridItem gridColumn="auto / span 2" h="10" bg="blue.500" />
          <GridItem gridColumn="auto / span 2" h="10" bg="blue.500" />
        </Grid>
      </main>
    </>
  );
}
