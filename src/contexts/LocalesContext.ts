import { createContext } from 'react';

import { LocalesContextValue } from '../types';

export const initialValue: LocalesContextValue = {
  locales: [],
  defaultLocale: '',
};

export const LocalesContext = createContext<LocalesContextValue>(null);

export const { Provider } = LocalesContext;
