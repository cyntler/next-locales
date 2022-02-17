import App, { AppContext, AppProps } from 'next/app';
import React, { ComponentType, useEffect, useState } from 'react';

import { Provider } from '../contexts/LocalesContext';
import { createLangDetector } from '../utils/createLangDetector';

const LOADED_LOCALES = [];
const LOADED_DEFAULT_LOCALE = '';
const langDetector = createLangDetector(LOADED_LOCALES, LOADED_DEFAULT_LOCALE);

export const withLocales = (WrappedApp: ComponentType<AppProps>) => {
  const wrappedGetInitialProps = (WrappedApp as any)?.getInitialProps;

  const LocalesApp = (props: AppProps) => {
    const { pageProps, router } = props;
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      const detectedLang = langDetector.detect();

      const asyncRun = async () => {
        if (router.asPath === '/') {
          await router.replace(`/${detectedLang}${router.asPath}`);
        }

        if (
          router.route === '/_error' &&
          !router.asPath.includes(`/${detectedLang}/`)
        ) {
          await router.replace(`/${detectedLang}${router.asPath}`);
          return;
        }

        if (router.query.locale && router.query?.locale !== detectedLang) {
          langDetector.cache(router.query.locale?.toString());
        } else {
          langDetector.cache(detectedLang);
        }

        setIsMounted(true);
      };

      asyncRun();
    }, []);

    if (!isMounted && process.env.NODE_ENV === 'development') {
      return null;
    }

    const locales = pageProps?.nextLocales ?? [];
    const defaultLocale = pageProps?.nextDefaultLocale ?? '';

    return (
      <Provider value={{ locales, defaultLocale }}>
        <WrappedApp {...props} />
      </Provider>
    );
  };

  if (wrappedGetInitialProps) {
    LocalesApp.getInitialProps = async (appContext: AppContext) => {
      const appProps = await App.getInitialProps(appContext);
      const wrappedProps = await wrappedGetInitialProps(appContext);

      return { ...appProps, ...wrappedProps };
    };
  }

  return LocalesApp;
};
