import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

import { getProjectRoot } from './getProjectRoot';

const projectRoot = getProjectRoot();

export const getConfig = () => {
  const configFilePath = join(projectRoot, '.i18nrc.json');

  if (!existsSync(configFilePath)) {
    throw new Error(
      'No .i18nrc.json file with an internationalization config.',
    );
  }

  const { localesDir, locales, defaultLocale } = JSON.parse(
    readFileSync(configFilePath, 'utf8'),
  );

  return { localesDir, locales, defaultLocale };
};
