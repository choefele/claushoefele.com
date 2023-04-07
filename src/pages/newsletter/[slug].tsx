import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { Box } from '@chakra-ui/react';
import { serialize } from 'next-mdx-remote/serialize';
import * as content from '../../components/content';
import { A, P } from '../../components/content';
import SubscribeBox from '../../components/subscribe-box';
import { loadPost, loadPosts, Post } from '../../load-content-data';

// See also https://github.com/chakra-ui/chakra-ui-docs/blob/main/src/components/mdx-components/mdx-components.tsx
const mdxComponents = {
  h1: content.H1,
  h2: content.H2,
  h3: content.H3,
  h4: content.H4,
  p: content.P,
  a: content.A,
  ul: content.Ul,
  ol: content.Ol,
  li: content.Li,
  blockquote: content.Blockquote,
  hr: content.Hr,
  // strong, em, br
};

interface Props {
  mdxSource: MDXRemoteSerializeResult;
  post: Post;
}

export default function Page({ mdxSource, post }: Props) {
  // Avoids "Warning: A title element received an array..." because
  // https://github.com/vercel/next.js/discussions/38256#discussioncomment-3070196
  const title = `${post.metadata.title} | Claus Höfele`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={post.metadata.description} />
        <meta name="author" content="Claus Höfele" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@claushoefele" />
        <meta name="twitter:creator" content="@claushoefele" />
        <meta name="twitter:title" content={post.metadata.title} />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://claushoefele.com/newsletter/${post.metadata.slug}`}
        />
        <meta property="og:image" content={post.metadata.image?.url} />
        <meta property="og:image:alt" content={post.metadata.image?.alt} />
        <meta property="og:site_name" content="Claus Höfele" />
        <meta property="og:title" content={post.metadata.title} />
        <meta property="og:description" content={post.metadata.description} />
      </Head>

      <main>
        <A href="../newsletter">{'<'} More articles...</A>
        <MDXRemote {...mdxSource} components={mdxComponents} />
        <SubscribeBox message="More of this?" />
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
