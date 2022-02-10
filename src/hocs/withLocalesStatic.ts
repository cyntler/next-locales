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

    const modifyPaths = (customPaths: any) => {
      if (Array.isArray(customPaths)) {
        const finalPaths = [];

        customPaths.forEach((customPath) => {
          localePaths.forEach(({ params: { locale } }) => {
            if (typeof customPath === 'string') {
              finalPaths.push(
                `/${locale}${
                  customPath?.startsWith('/') ? customPath : `/${customPath}`
                }`,
              );
            } else if (customPath?.params) {
              finalPaths.push({
                params: {
                  ...customPath.params,
                  locale,
                },
              });
            }
          });
        });

        return finalPaths;
      }

      return customPaths;
    };

    return {
      ...customFnResult,
      paths: customFnResult?.paths
        ? modifyPaths(customFnResult.paths)
        : localePaths,
      fallback: false,
    };
  };
