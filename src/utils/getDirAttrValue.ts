import { NEXT_DATA } from 'next/dist/shared/lib/utils';

import { getAvailableLocales } from './getAvailableLocales';
import { getLangAttrValue } from './getLangAttrValue';
import { getLocaleConfig } from './getLocaleConfig';

export const getDirAttrValue = (nextData: NEXT_DATA): string => {
  const lang = getLangAttrValue(nextData);
  const availableLocales = getAvailableLocales();

  const currentLocale = availableLocales.find((locale) => locale.name === lang);
  if (currentLocale) {
    const localeConfig = getLocaleConfig(currentLocale.translations);

    if (['ltr', 'rtl', 'auto'].includes(localeConfig.dir)) {
      return localeConfig.dir;
    }
  }

  return 'ltr';
};
