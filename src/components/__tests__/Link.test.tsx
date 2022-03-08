/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';

import { Link } from '../Link';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: '',
    };
  },
}));

test('it renders link with "/" href', () => {
  const linkHref = '/';
  const linkContent = 'test';

  render(<Link href={linkHref}>{linkContent}</Link>);

  const linkElement = screen.getByText(linkContent);
  expect(linkElement).toBeDefined();
  expect(linkElement.getAttribute('href')).toBe(linkHref);
});

test('it renders link with "test" href and elements content', () => {
  const linkHref = '/test';
  const linkContent = (
    /* eslint-disable jsx-a11y/anchor-is-valid */
    <a role="link">
      example content with <span>span</span>
    </a>
  );

  render(<Link href={linkHref}>{linkContent}</Link>);

  const linkElement = screen.getByRole('link');
  expect(linkElement).toBeDefined();
  expect(linkElement.getAttribute('href')).toBe(linkHref);
});
