import { createInitialIndexPage } from '../createInitialIndexPage';

test('return function', () => {
  const result = createInitialIndexPage();

  expect(typeof result).toBe('function');
});

test('result function returns null', () => {
  const result = createInitialIndexPage()();

  expect(result).toBeNull();
});
