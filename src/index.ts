import { config } from 'dotenv';

import { storeNameItemsInMarkDown, storeNameItemsInJSON } from './service';
config()(async () => {
  await Promise.all([
    storeNameItemsInMarkDown('names'),
    storeNameItemsInJSON('names'),
  ]);
})();
