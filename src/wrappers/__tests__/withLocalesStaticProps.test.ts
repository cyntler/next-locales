import { withLocalesStaticProps } from '../withLocalesStaticProps';

test('wrapper returns function', () => {
  const result = withLocalesStaticProps();

  expect(typeof result).toBe('function');
});
