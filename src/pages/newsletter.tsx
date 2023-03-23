import Head from 'next/head';
import { H1, H2, P, A } from '../components/content';
import SubscribeForm from '../components/subscribe-form';
import { loadPosts, Post } from '../load-content-data';

export default function Newsletter({ posts }: { posts: Post[] }) {
  const dev = process.env.NODE_ENV == 'development';

  return (
    <>
      <Head>
        <title>Claus Höfele - Newsletter</title>
      </Head>

      <main>
        <H1>Newsletter</H1>
        <SubscribeForm />
        <ul>
          {posts.map((post) => {
            return (
              dev && (
                <li key={post.filePath}>
                  <A href={`newsletter/${post.metadata.slug}`}>
                    {post.metadata.title}
                  </A>
                </li>
              )
            );
          })}
        </ul>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const posts = await loadPosts();

  return { props: { posts } };
}
