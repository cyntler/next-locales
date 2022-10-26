import { NEXT_DATA } from 'next/dist/shared/lib/utils';

import { getDirAttrValue } from './getDirAttrValue';
import { getLangAttrValue } from './getLangAttrValue';

export const getHtmlLocaleAttributes = (nextData: NEXT_DATA) => ({
  lang: getLangAttrValue(nextData),
  dir: getDirAttrValue(nextData),
});
