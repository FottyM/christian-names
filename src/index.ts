import {config} from 'dotenv'
config()

import { storeNameItemsInMarkDown, storeNameItemsInJSON } from './service';

(async () => {
  await Promise.all([
    storeNameItemsInMarkDown('names'),
    storeNameItemsInJSON('names'),
  ]);
})();
