/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';

import { Provider } from '../../contexts/LocalesContext';
import { useTranslation } from '../useTranslation';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: '',
    };
  },
}));

const contextValue = {
  defaultLocale: 'pl',
  locales: [
    {
      name: 'pl',
      translations: {
        test: 'Hello in the test string!',
      },
    },
  ],
};

const UseTranslationComponent = ({ translationKey }) => {
  const { t } = useTranslation();

  return <>{t(translationKey)}</>;
};

test('return valid mocked translation', () => {
  render(
    <Provider value={contextValue}>
      <UseTranslationComponent translationKey="test" />
    </Provider>,
  );

  expect(screen.getByText('Hello in the test string!')).toBeDefined();
});

test('return passed translation key when translation does not exists', () => {
  render(
    <Provider value={contextValue}>
      <UseTranslationComponent translationKey="this.is.invalid.key" />
    </Provider>,
  );

  expect(screen.getByText('this.is.invalid.key')).toBeDefined();
});
