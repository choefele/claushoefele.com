import Head from 'next/head';
import { GetStaticProps } from 'next';
import { Box, Flex, Image, Stack, StackDivider } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { A, H1, H2, H3, P } from '../components/content';
import {
  loadPublications,
  Publication,
  GroupedPublication,
} from '../load-content-data';
import { Fragment } from 'react';

interface Props {
  groupedPublications: GroupedPublication[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const groupedPublications = await loadPublications();

  return {
    props: { groupedPublications },
  };
};

const Row = ({ publication }: { publication: Publication }) => (
  <Flex justifyContent="flex-start" alignItems="stretch">
    {publication.image && (
      <Image
        mr="1rem"
        width="7rem"
        height="7rem"
        objectFit="contain"
        borderRadius="md"
        border="1px solid lightgray"
        alt={publication.image.alt}
        src={publication.image.url}
      />
    )}
    <Flex flex={1} flexDirection="column">
      <H3 mt="0">{publication.name}</H3>
      <P mt={0}>{publication.description}</P>
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
  groupedPublications,
}: Props): JSX.Element {
  return (
    <>
      <Head>
        <title>Speaking & Writing | Claus Höfele</title>
      </Head>

      <main>
        <H1 mt="2rem" mb=".25rem">
          Talks, Podcasts, Articles, and other Publications
        </H1>
        <P>
          Over time, I’ve contributed to a number of publicly available
          resources that mix my ideas with those of others. Please{' '}
          <A href="/about">reach out</A> if you have a podcast, round table, or
          conference where I might be able to contribute.
        </P>
        <Box
          mt="4rem"
          border="1px solid lightgray"
          borderRadius="md"
          backgroundColor="#282828"
        >
          <iframe
            style={{ borderRadius: '12px' }}
            src="https://open.spotify.com/embed/episode/3U29RKSLuI4DfvD56lkMIf?utm_source=generator&theme=0"
            width="100%"
            height="152"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>{' '}
        </Box>
        {groupedPublications.map((group) => {
          return (
            <Fragment key={group.name}>
              <H2 mt="4rem" mb=".25rem">
                {group.name}
              </H2>
              <Stack
                mt="2rem"
                mb=".25rem"
                divider={<StackDivider />}
                spacing="6"
              >
                {group.publications.map((publication) => {
                  return (
                    <Row key={publication.name} publication={publication} />
                  );
                })}
              </Stack>
            </Fragment>
          );
        })}
      </main>
    </>
  );
}
