import { NEXT_DATA } from 'next/dist/shared/lib/utils';
import { getConfig } from './getConfig';

export const getLangAttrValue = (nextData: NEXT_DATA): string => {
  if (typeof nextData?.query?.locale === 'string') {
    return nextData.query.locale;
  }

  const config = getConfig();
  if (config.defaultLocale) {
    return config.defaultLocale;
  }

  return '';
};
