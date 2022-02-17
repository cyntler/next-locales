import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

import { Locale } from '../types';
import { getConfig } from './getConfig';
import { getProjectRoot } from './getProjectRoot';
import { parseFileContentToObj } from './parseFileContentToObj';

const projectRoot = getProjectRoot();
const { localesDir, locales } = getConfig();

export const getAvailableLocales = (): Locale[] => {
  const localesAbsolutePath = join(projectRoot, localesDir);
  const localeFileNames = readdirSync(localesAbsolutePath);

  const resultLocales: Locale[] = [];

  for (let i = 0; i < localeFileNames.length; i += 1) {
    const fileName = localeFileNames[i];
    const fileNameDotSegments = fileName.split('.');

    let localeName = '';
    const segementExists = fileNameDotSegments?.find((segment) => {
      const includes = locales?.includes(segment);

      if (includes) {
        localeName = segment;
      }

      return includes;
    });

    if (!segementExists) {
      continue;
    }

    const fileContent = readFileSync(
      join(localesAbsolutePath, fileName),
      'utf8',
    );

    if (fileContent && localeName) {
      resultLocales.push({
        name: localeName,
        translations: parseFileContentToObj(fileContent),
      });
    }
  }

  return resultLocales;
};
