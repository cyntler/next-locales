import { GetStaticProps } from 'next';

import { getAvailableLocales } from '../utils/getAvailableLocales';
import { getConfig } from '../utils/getConfig';

export const withLocalesStaticProps =
  (customFn?: GetStaticProps): GetStaticProps =>
  async (ctx) => {
    const customFnResult: any = customFn ? await customFn(ctx) : {};

    const locales = getAvailableLocales();
    const defaultLocale = getConfig()?.defaultLocale;

    return {
      ...customFnResult,
      props: {
        ...customFnResult.props,
        nextLocales: locales,
        nextDefaultLocale: defaultLocale,
      },
    };
  };
