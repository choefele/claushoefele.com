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
        <meta
          name="description"
          content="Discover concepts and tools for engineering leaders – one sketchnote at a time. Written by Claus Höfele."
        />
        <meta name="author" content="Claus Höfele" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@claushoefele" />
        <meta name="twitter:creator" content="@claushoefele" />
        <meta
          name="twitter:title"
          content="Drawn to Leadership | Claus Höfele"
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://claushoefele.com/d2l" />
        <meta
          property="og:image"
          content="https://claushoefele.com/d2l/d2l-preview.jpg"
        />
        <meta property="og:image:alt" content="Drawn to Leadership Logo" />
        <meta property="og:site_name" content="Claus Höfele" />
        <meta
          property="og:title"
          content="Drawn to Leadership | Claus Höfele"
        />
        <meta
          property="og:description"
          content="Discover concepts and tools for engineering leaders – one sketchnote at a time. Written by Claus Höfele."
        />
      </Head>

      <main>
        <H1>Drawn to Leadership</H1>
        <P fontSize="lg" fontWeight="bold">
          Discover concepts and tools for engineering leaders – one sketchnote
          at a time.
        </P>
        <SubscribeBox optedInEmail={email} />

        <H2>Recent Issues</H2>
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
                  href={`d2l/${post.metadata.slug}`}
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
