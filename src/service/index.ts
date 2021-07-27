import * as fs from 'fs';
import json2md from 'json2md';
import * as path from 'path';

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

export async function storeNameItemsInMarkDown(
  fileName: string,
  filterBy?: string
) {
  const items: StrippedNameItem[] = await fetchAllStrippedNameItems();
  const stream = await fs.createWriteStream(
    path.join(BASE_FOLDER, fileName + '.md')
  );

  if (!items.length) return;

  const headers = ['name', 'pronunciation', 'meaning', 'detail', 'origin'];
  const title = `Hebrews and Christian names ${filterBy ? `ending with ${filterBy}` : ''}`
  
  stream.write(
    json2md([
      { h1: title},
      {
        table: {
          headers,
          rows: items
            .sort((a, b) => a.name.localeCompare(b.name))
            .filter(item => (filterBy ? item.name.endsWith(filterBy) : true))
            .map(item => [
              item.name,
              item.pronunciation,
              item.meaning,
              item.detail,
              item.origin,
            ]),
        },
      },
    ])
  );

  stream.end();
}
