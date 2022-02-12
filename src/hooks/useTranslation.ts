import { useRouter } from 'next/router';
import mustache from 'mustache';

import { useLocalesContext } from './useLocalesContext';
import { TranslateValues } from '../types';
import { useCallback, useMemo } from 'react';

export const useTranslation = () => {
  const { query } = useRouter();
  const { locales, defaultLocale } = useLocalesContext();

  const currentLangName = query?.locale;

  const currentLangTranslations = useMemo(
    () => locales.find((l) => l.name === currentLangName)?.translations,
    [locales, currentLangName],
  );

  const defaultLangTranslations = useMemo(
    () => locales.find((l) => l.name === defaultLocale)?.translations,
    [locales, defaultLocale],
  );

  const t = useCallback((key: string, values?: TranslateValues) => {
    const translations =
      currentLangTranslations || defaultLangTranslations || {};

    const translationStr = key
      .split('.')
      .reduce(
        (acc, current: string) => (acc && acc[current]) || null,
        translations,
      )
      ?.toString();

    try {
      return mustache.render(translationStr, values);
    } catch (err) {
      if (translationStr) {
        return translationStr;
      }

      return key;
    }
  }, []);

  return {
    t,
    defaultLocale,
  };
};
