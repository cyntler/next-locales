export interface LocalesContextValue {
  locales: Locale[];
  defaultLocale: string;
}

export interface Locale {
  name: string;
  translations: Translations;
}

export type Translations = { [key: string]: Translations | string };

export interface NextLocaleAppProps {
  nextLocales: Locale[];
}

export type TranslateValues = { [key: string]: unknown };
