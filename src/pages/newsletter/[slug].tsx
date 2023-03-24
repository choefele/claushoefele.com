import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { H1, H2, P, A } from '../../components/content';
import { loadPost, loadPosts, Post } from '../../load-content-data';

const components = {};

interface Props {
  mdxSource: MDXRemoteSerializeResult;
  post: Post;
}

export default function Page({ mdxSource, post }: Props) {
  // Avoids "Warning: A title element received an array..." because
  // https://github.com/vercel/next.js/discussions/38256#discussioncomment-3070196
  const title = `Claus Höfele - ${post.metadata.title}`;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main>
        <MDXRemote {...mdxSource} components={components} />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (params?.slug === undefined || typeof params?.slug !== 'string') {
    throw new Error(`Invalid slug: ${params?.slug}`);
  }
  const post = await loadPost(params.slug);
  if (post === undefined) {
    throw new Error(`Can't find post for slug: ${params.slug}`);
  }

  const mdxSource = await serialize(post.source, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: post.metadata,
  });

  return { props: { mdxSource, post } };
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
