import { GetStaticPaths } from 'next';

import { getAvailableLocales } from '../utils/getAvailableLocales';

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
