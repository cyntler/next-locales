import { createLangDetector } from '../createLangDetector';

test('it returns next-language-detector detect method', () => {
  const result = createLangDetector([], '');

  expect(result.detect).toBeTruthy();
});
