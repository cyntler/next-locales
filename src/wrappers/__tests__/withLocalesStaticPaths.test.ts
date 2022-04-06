import { withLocalesStaticPaths } from '../withLocalesStaticPaths';

test('wrapper returns function', () => {
  const result = withLocalesStaticPaths();

  expect(typeof result).toBe('function');
});
