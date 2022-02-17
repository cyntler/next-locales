import { existsSync, readFileSync, writeFileSync } from 'fs';

export const replaceLocaleConsts = (
  path: string,
  locales: string[],
  defaultLocale: string,
) => {
  if (existsSync(path)) {
    const fileContent = readFileSync(path, 'utf8')
      .replace(
        /const LOADED_LOCALES = \[(.*)\];/gm,
        `const LOADED_LOCALES = ${JSON.stringify(locales)};`,
      )
      .replace(
        /const LOADED_DEFAULT_LOCALE = (.*);/gm,
        `const LOADED_DEFAULT_LOCALE = '${defaultLocale}';`,
      );

    writeFileSync(path, fileContent);
  }
};
