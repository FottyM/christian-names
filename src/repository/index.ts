import got, { Response } from 'got';
import sleep from '../utils/sleep';
import {LIMIT, OFFSET, ORDER, SORT_BY } from './constants';
import { ApiResponse, MapperFn, NameItem, StrippedNameItem } from './types';



const fetchNameItems = async (
  offset = OFFSET,
  limit = LIMIT,
  order = ORDER,
  sortBy = SORT_BY
): Promise<NameItem[]> => {
  const BASE_URI = process.env.BASE_URI;
  
  if (!BASE_URI) throw new Error('BASE_UI is not defined');

  const { body }: Response<ApiResponse> = await got(BASE_URI, {
    responseType: 'json',
    searchParams: {
      order,
      sortBy,
      limit,
      offset,
    },
  });

  return body.items;
};

export async function* fetchNamesItemsInChunks(chunkSize = 500) {
  let defaultOffset = 0;
  while (true) {
    const items = await fetchNameItems(defaultOffset, chunkSize);

    if (items.length === 0) {
      return;
    }

    defaultOffset += chunkSize;

    yield items;

    await sleep(250);
  }
}

export async function fetchAllChunks<T = StrippedNameItem>(
  mapper?: MapperFn<T>
) {
  const allItems = [];

  for await (const items of fetchNamesItemsInChunks()) {
    allItems.push(...items);
  }

  if (mapper) return allItems.map(mapper);

  return allItems;
}
