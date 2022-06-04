import { NextConfig } from 'next';
import { lstatSync, readlinkSync } from 'fs';
import { join } from 'path';

import { getConfig } from '../utils/getConfig';
import { getPackagePath } from '../utils/getPackagePath';
import { replaceLocaleConsts } from '../utils/replaceLocaleConsts';
import { getSymlinkAbsolutePath } from '../utils/getSymlinkAbsolutePath';

export const withLocalesConfig = (nextConfig: NextConfig): NextConfig => ({
  ...nextConfig,
  trailingSlash: true,
  webpack: (config, context) => {
    if (nextConfig.webpack) {
      nextConfig.webpack(config, context);
    }

    if (context.isServer) {
      const { locales, defaultLocale } = getConfig();

      if (locales && defaultLocale) {
        const packagePath = getPackagePath();
        const stat = lstatSync(packagePath);

        const jsFilePath = 'dist/wrappers/withLocales.js';

        if (stat?.isSymbolicLink()) {
          const symlink = readlinkSync(packagePath);
          if (symlink) {
            replaceLocaleConsts(
              join(getSymlinkAbsolutePath(symlink), jsFilePath),
              locales,
              defaultLocale,
            );
          }
        } else {
          replaceLocaleConsts(
            join(packagePath, jsFilePath),
            locales,
            defaultLocale,
          );
        }
      }
    }

    return config;
  },
});
