import { useContext } from 'react';

import { LocalesContext } from '../contexts/LocalesContext';

export const useLocalesContext = () => {
  const context = useContext(LocalesContext);

  if (!context) {
    throw new Error("No LocalesContext's Provider rendered.");
  }

  return context;
};
