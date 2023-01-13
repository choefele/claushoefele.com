import Head from 'next/head';
import { GetStaticProps } from 'next';
import { Flex, Image, Stack, StackDivider } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { A, H1, H2, H3, P } from '../components/content';
import loadContentData, { Publication } from '../load-content-data';

export const getStaticProps: GetStaticProps = async () => {
  const contentData = await loadContentData();
  const publications = contentData.publications;

  return {
    props: { publications },
  };
};

const Row1 = ({ publication }: { publication: Publication }) => (
  <Flex justifyContent="flex-start" alignItems="stretch">
    {publication.image && (
      <Image
        mr="0.5rem"
        height="7rem"
        alt={publication.image.alt}
        src={publication.image.url}
      />
    )}
    <Flex flex={1} flexDirection="column">
      <H3 mt="0">{publication.name}</H3>
      <P noOfLines={2} mt={0}>
        {publication.description}
      </P>
      {publication.action && (
        <Stack justifyContent="flex-end" isInline>
          <A href={publication.action.url} mt="0.5rem" isExternal>
            {publication.action.name} <ExternalLinkIcon />
          </A>
        </Stack>
      )}
    </Flex>
  </Flex>
);

export default function Publications({
  publications,
}: {
  publications: Publication[];
}): JSX.Element {
  return (
    <>
      <Head>
        <title>Claus Höfele - Speaking & Publications</title>
      </Head>

      <main>
        <H1>Talks, Podcasts, Articles, and other Publications</H1>
        <P>TBD</P>
        <H2>Publications in 2022</H2>
        <Stack divider={<StackDivider />} spacing="4">
          {publications.map((publication) => {
            return <Row1 key={publication.name} publication={publication} />;
          })}
        </Stack>
      </main>
    </>
  );
}
