import { GetStaticPaths, GetStaticProps } from 'next';

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

export const withLocalesStaticPaths =
  (customFn?: GetStaticPaths): GetStaticPaths =>
  async (ctx) => {
    const customFnResult: any = customFn ? await customFn(ctx) : {};

    const locales = getAvailableLocales();

    const localePaths = locales?.map(({ name }) => ({
      params: {
        locale: name,
      },
    }));

    return {
      ...customFnResult,
      paths: customFnResult?.paths
        ? [...customFnResult.paths, ...localePaths]
        : localePaths,
      fallback: false,
    };
  };
