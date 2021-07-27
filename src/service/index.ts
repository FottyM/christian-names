import * as fs from 'fs';
import * as path from 'path';
import json2md from 'json2md';

import { fetchAllChunks } from '../repository';
import { stripItem } from '../repository/helpers';
import { StrippedNameItem } from '../repository/types';

const BASE_FOLDER = 'data';

export function fetchAllNameItems() {
  return fetchAllChunks();
}

export function fetchAllStrippedNameItems() {
  return fetchAllChunks<StrippedNameItem>(stripItem);
}

export async function storeNameItemsInJSON(fileName: string) {
  const items = await fetchAllStrippedNameItems();
  const stream = fs.createWriteStream(
    path.join(BASE_FOLDER, fileName + '.json')
  );
  stream.write(JSON.stringify(items, null, 2));
  stream.end();
}

export async function storeNameItemsInMarkDown(fileName: string) {

  const items = await fetchAllStrippedNameItems();

  const stream = await fs.createWriteStream(
    path.join(BASE_FOLDER, fileName + '.md')
  );

  stream.write(json2md(items));
  stream.end();
}
