import { createLangDetector } from '../createLangDetector';

test('has detect method from next-language-detector', () => {
  const result = createLangDetector([], '');

  expect(result.detect).toBeDefined();
});
