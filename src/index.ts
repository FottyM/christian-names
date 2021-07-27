import { storeNameItemsInMarkDown, storeNameItemsInJSON } from './service';
require('dotenv').config();

(async () => {
  await Promise.all([
    storeNameItemsInMarkDown('names'),
    storeNameItemsInMarkDown('names-ending-in-l', 'l'),
    storeNameItemsInJSON('names'),
  ]);
})().catch(console.error);
