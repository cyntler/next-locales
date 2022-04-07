import { getAvailableLocales } from '../getAvailableLocales';
import { getConfig } from '../getConfig';

jest.mock('../getConfig', () => {
  const actual = jest.requireActual('../getConfig');

  return {
    __esModule: true,
    ...actual,
    getConfig: jest.fn(),
  };
});

const mockedGetConfig = jest.mocked(getConfig);

test('return empty array', () => {
  mockedGetConfig.mockReturnValue({
    localesDir: '',
    locales: [],
    defaultLocale: '',
  });

  const result = getAvailableLocales();

  expect(result).toStrictEqual([]);
});

test('return an array with 2 of length', () => {
  mockedGetConfig.mockReturnValue({
    localesDir: 'src/utils/__tests__/__mocks__',
    locales: ['en', 'pl'],
    defaultLocale: 'en',
  });

  const result = getAvailableLocales();

  expect(result.length).toBe(2);
});

test('return an array with 2 of length even when in the input locales array is "empty"', () => {
  mockedGetConfig.mockReturnValue({
    localesDir: 'src/utils/__tests__/__mocks__',
    locales: ['en', 'pl', 'empty'],
    defaultLocale: 'en',
  });

  const result = getAvailableLocales();

  expect(result.length).toBe(2);
});
