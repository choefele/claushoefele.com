import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { H1, H2, P, A } from '../../components/content';
import { loadPost, loadPosts, Post } from '../../load-content-data';

export default function Page({ post }: { post: Post }) {
  return (
    <>
      <Head>
        <title>Claus Höfele - {post.metadata.title}</title>
      </Head>

      <main>
        <H1>{post.metadata.title}</H1>
        <p>{post.content}</p>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params?.slug === undefined || typeof params?.slug !== 'string') {
    throw new Error(`Invalid slug: ${params?.slug}`);
  }
  const post = await loadPost(params.slug);

  return { props: { post } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await loadPosts();
  const paths = posts
    .map((post) => post.metadata.slug)
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
