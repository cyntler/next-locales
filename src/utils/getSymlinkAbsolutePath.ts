import { dirname, join } from 'path';

import { getPackagePath } from './getPackagePath';

export const getSymlinkAbsolutePath = (symlink: string) =>
  join(dirname(getPackagePath()), symlink);
