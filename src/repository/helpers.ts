import { NameItem } from './types';

export const stripItem = (item: NameItem) => ({
  name: item.name,
  detail: item.detail || '',
  meaning: item.meaning || '',
  origin: item.origin || 'Hebrew',
  pronunciation: item.pronunciation || '',
});
