import path from 'path';
import { promises as fs } from 'fs';
import yaml from 'js-yaml';

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

export type ContentData = {
  books: Book[];
  groupedPublications: GroupedPublication[];
};

export default async function loadContentData(): Promise<ContentData> {
  const dataFile = path.join(process.cwd(), 'data/data.yml');
  const fileContents = await fs.readFile(dataFile, 'utf8');
  const data = yaml.load(fileContents) as ContentData;

  return data;
}
