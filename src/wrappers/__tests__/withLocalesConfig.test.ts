import { withLocalesConfig } from '../withLocalesConfig';

test('wrapper returns object', () => {
  const result = withLocalesConfig({});

  expect(typeof result).toBe('object');
});

test('wrapper returns object with trailingSlash and webpack function', () => {
  const result = withLocalesConfig({});

  expect(result.trailingSlash).toBeTruthy();
  expect(typeof result.webpack).toBe('function');
});
