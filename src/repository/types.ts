export type Dict = Record<string, any>;

export type ApiResponse = {
  detail: Dict;
  total: number;
  items: NameItem[];
  offset: number;
  genders: Dict;
};

export type NameItem = {
  detail: string;
  gender: 'boy' | 'girl';
  id: number;
  isFavorite: boolean;
  isModern: boolean;
  meaning: string;
  modernity: number;
  name: string;
  origin: 'Hebrew';
  popularityRanking: number;
  pronunciation: string;
};

export type StrippedNameItem = Pick<
  NameItem,
  'name' | 'detail' | 'meaning' | 'origin' | 'pronunciation'
>;

export type MapperFn<T = StrippedNameItem> = (nameItem: NameItem) => T;
