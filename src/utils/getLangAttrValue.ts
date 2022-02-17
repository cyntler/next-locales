import { getConfig } from './getConfig';

export const getLangAttrValue = (nextData: any): string => {
  if (nextData?.query?.locale) {
    return nextData.query.locale;
  }

  const config = getConfig();

  if (config.defaultLocale) {
    return config.defaultLocale;
  }

  return '';
};
