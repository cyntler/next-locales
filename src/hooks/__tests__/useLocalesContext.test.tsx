/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';

import { Provider } from '../../contexts/LocalesContext';
import { useLocalesContext } from '../useLocalesContext';

const UseLocalesContextComponent = () => {
  useLocalesContext();

  return null;
};

test('render component with useLocalesContext hook without provider throws an error', () => {
  expect(() => render(<UseLocalesContextComponent />)).toThrowError(
    "No LocalesContext's Provider rendered.",
  );
});

test('render component with useLocalesContext hook with provider not throws an error', () => {
  expect(() =>
    render(
      <Provider value={{ defaultLocale: '', locales: [] }}>
        <UseLocalesContextComponent />
      </Provider>,
    ),
  ).not.toThrowError();
});
