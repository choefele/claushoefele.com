import Head from 'next/head';
import { useRouter } from 'next/router';
import { H1, H2, P, A, Ul, Li } from '../components/content';
import SubscribeForm from '../components/subscribe-form';
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
        <SubscribeForm optedInEmail={email} />
        <Ul mt="1rem">
          {posts.map((post) => {
            return (
              <Li key={post.filePath}>
                <A href={`newsletter/${post.metadata.slug}`}>
                  {post.metadata.title}
                </A>
              </Li>
            );
          })}
        </Ul>
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
