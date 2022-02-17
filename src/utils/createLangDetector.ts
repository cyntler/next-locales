import languageDetector from 'next-language-detector';

export const createLangDetector = (locales: string[], defaultLocale: string) =>
  languageDetector({
    supportedLngs: locales,
    fallbackLng: defaultLocale,
  });
