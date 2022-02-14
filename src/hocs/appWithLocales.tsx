import App, { AppContext, AppProps } from 'next/app';
import React, { ComponentType, useEffect, useState } from 'react';

import { Provider } from '../contexts/LocalesContext';
import { createLangDetector } from '../utils/createLangDetector';

const LOADED_LOCALES = [];
const LOADED_DEFAULT_LOCALE = '';
const langDetector = createLangDetector(LOADED_LOCALES, LOADED_DEFAULT_LOCALE);

export const appWithLocales = (WrappedDocument: ComponentType<AppProps>) => {
  const wrappedGetInitialProps = (WrappedDocument as any)?.getInitialProps;

  const LocalesApp = (props: AppProps) => {
    const { pageProps, router } = props;
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      const detectedLang = langDetector.detect();

      const asyncRun = async () => {
        if (router.asPath === '/') {
          await router.replace(`/${detectedLang}${router.asPath}`);
        }

        langDetector.cache(detectedLang);
        setIsMounted(true);
      };

      asyncRun();
    }, []);

    if (!isMounted) {
      return null;
    }

    const locales = pageProps?.nextLocales ?? [];
    const defaultLocale = pageProps?.nextDefaultLocale ?? '';

    return (
      <Provider value={{ locales, defaultLocale }}>
        <WrappedDocument {...props} />
      </Provider>
    );
  };

  LocalesApp.getInitialProps = async (appContext: AppContext) => {
    const appProps = await App.getInitialProps(appContext);
    const wrappedProps = wrappedGetInitialProps
      ? await wrappedGetInitialProps(appContext)
      : {};

    return { ...appProps, ...wrappedProps };
  };

  return LocalesApp;
};