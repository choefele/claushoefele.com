import path from 'path';
import { promises as fs } from 'fs';
import yaml from 'js-yaml';

type ContentData = {
  books: {
    name: string;
    authors: string;
  }[];
};

export default async function loadContentData(): Promise<ContentData> {
  const dataFile = path.join(process.cwd(), 'data/data.yml');
  const fileContents = await fs.readFile(dataFile, 'utf8');
  const data = yaml.load(fileContents) as ContentData;

  return data;
}
