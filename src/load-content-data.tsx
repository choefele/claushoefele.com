import path from 'path';
import { promises as fs } from 'fs';
import matter from 'gray-matter';

export type Book = {
  name: string;
  authors: string;
};

export type Publication = {
  name: string;
  date: string; // to keep it JSON
  description: string;
  image?: {
    alt: string;
    url: string;
  };
  action?: {
    name: string;
    url: string;
  };
};

export type GroupedPublication = {
  name: string;
  publications: Publication[];
};

export async function loadPublications(): Promise<GroupedPublication[]> {
  const dataFile = path.join(process.cwd(), 'data/publications.yml');
  const fileContents = await fs.readFile(dataFile, 'utf8');
  const data = matter(fileContents).data as GroupedPublication[];

  return data;
}

export type Post = {
  source: string;
  filePath: string;
  metadata: PostMetadata;
};

type PostMetadata = {
  title: string;
  slug: string;
};

export async function loadPosts(): Promise<Post[]> {
  const dataDir = path.join(process.cwd(), 'data/posts');
  const dirContents = await fs.readdir(dataDir, 'utf8');
  const posts = dirContents.map(async (filePath) => {
    const fileContents = await fs.readFile(
      path.join(dataDir, filePath),
      'utf8'
    );
    const { content, data } = matter(fileContents);
    return {
      source: content,
      filePath,
      metadata: data as PostMetadata,
    };
  });

  return Promise.all(posts);
}

export async function loadPost(slug: string): Promise<Post | undefined> {
  const posts = await loadPosts();
  const postWithSlug = posts.find((post) => post.metadata.slug === slug);

  return postWithSlug;
}
