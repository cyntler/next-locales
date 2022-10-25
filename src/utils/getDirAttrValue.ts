import { NEXT_DATA } from 'next/dist/shared/lib/utils';

export const getDirAttrValue = (nextData: NEXT_DATA): string => {
  console.log(nextData);

  return 'ltr';
};
