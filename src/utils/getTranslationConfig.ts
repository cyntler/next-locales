import { Translations } from '../types';

export const getLocaleConfig = (
  translations: Translations,
): { dir?: string } => {
  if ('__config' in translations) {
    // eslint-disable-next-line
    return translations.__config as Translations;
  }

  return {
    dir: '',
  };
};
