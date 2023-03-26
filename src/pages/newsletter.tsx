import Head from 'next/head';
import { H1, H2, P, A } from '../components/content';
import SubscribeForm from '../components/subscribe-form';
import { loadPosts, Post } from '../load-content-data';

export default function Newsletter({ posts }: { posts: Post[] }) {
  return (
    <>
      <Head>
        <title>Claus Höfele - Drawn to Leadership</title>
      </Head>

      <main>
        <H1>Drawn to Leadership</H1>
        <P fontSize="lg" fontWeight="bold">
          Discover new ways to become a better engineering leader – one
          sketchnote at a time.
        </P>
        <SubscribeForm />
        <ul>
          {posts.map((post) => {
            return (
              <li key={post.filePath}>
                <A href={`newsletter/${post.metadata.slug}`}>
                  {post.metadata.title}
                </A>
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const posts = await loadPosts();

  // Ignore test and draft posts in the list. They exist at their slug, though.
  const filteredPosts = posts.filter((post) => {
    return (
      post.metadata.title !== undefined &&
      post.metadata.slug !== 'test-components'
    );
  });

  return { props: { posts: filteredPosts } };
}
