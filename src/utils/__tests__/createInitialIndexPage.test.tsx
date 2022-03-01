import { createInitialIndexPage } from '../createInitialIndexPage';

test('it returns function', () => {
  const result = createInitialIndexPage();

  expect(typeof result).toBe('function');
});

test('result function returns null', () => {
  const result = createInitialIndexPage()();

  expect(result).toBeNull();
});
