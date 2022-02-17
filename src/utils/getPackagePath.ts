import { join } from 'path';

import { getProjectRoot } from './getProjectRoot';

export const getPackagePath = () =>
  join(getProjectRoot(), 'node_modules', 'next-locales');
