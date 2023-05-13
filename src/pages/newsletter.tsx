import Head from 'next/head';
import { useRouter } from 'next/router';
import { SimpleGrid } from '@chakra-ui/react';
import { H1, H2, P, A, Ul, Li } from '../components/content';
import SubscribeBox from '../components/subscribe-box';
import ArticleCard from '../components/article-card';
import { loadPosts, Post } from '../load-content-data';

export default function Newsletter({ posts }: { posts: Post[] }) {
  const emailBase64 = useRouter().query.e;
  const email =
    typeof emailBase64 === 'string'
      ? Buffer.from(emailBase64, 'base64').toString('utf8')
      : undefined;

  return (
    <>
      <Head>
        <title>Drawn to Leadership | Claus Höfele</title>
      </Head>

      <main>
        <H1>Drawn to Leadership</H1>
        <P fontSize="lg" fontWeight="bold">
          Discover concepts and tools for engineering leaders – one sketchnote
          at a time.
        </P>
        <P>
          Remember how everyone wants you to read a million leadership books? And then read 10 more? I‘ve done that for you and I'm giving you the gist – in the form of a sketchnote.

          Use the sketchnote as a time saver, a memory aid, and an inspiration. Then apply the concepts at work with practical activities.
        </P>
        <SubscribeBox message="Be the first to know." optedInEmail={email} />
         
        <H2>Latest Issues</H2>
        <SimpleGrid
          as="ul"
          listStyleType="none"
          spacing={4}
          columns={{ base: 1, md: 2, lg: 3 }}
        >
          {posts.map((post) => {
            return (
              <Li key={post.filePath}>
                <A
                  textDecoration="none"
                  _hover={{ textDecoration: 'none' }}
                  href={`newsletter/${post.metadata.slug}`}
                >
                  <ArticleCard {...post.metadata} />
                </A>
              </Li>
            );
          })}
        </SimpleGrid>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const posts = await loadPosts();

  // Ignore draft posts in the list. They exist at their slug, though.
  const filteredPosts = posts.filter((post) => {
    return post.metadata.title !== undefined;
  });

  return { props: { posts: filteredPosts } };
}
