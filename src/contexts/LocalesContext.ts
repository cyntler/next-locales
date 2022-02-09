import { createContext } from 'react';

import { LocalesContextValue } from '../types';

export const initialValue: LocalesContextValue = {
  locales: [],
  defaultLocale: '',
};

export const LocalesContext = createContext<LocalesContextValue>(initialValue);

export const { Provider } = LocalesContext;
