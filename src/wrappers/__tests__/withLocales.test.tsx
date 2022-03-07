/**
 * @jest-environment jsdom
 */
import { renderToString } from 'react-dom/server';

import { withLocales } from '../withLocales';

let hocResult: (props: unknown) => JSX.Element;

beforeEach(() => {
  hocResult = withLocales(() => <div>test</div>);
});

test('hoc returns function', () => {
  expect(typeof hocResult).toBe('function');
});

test('hoc result returns react component', () => {
  const Component = () => hocResult({});

  const componentRenderResult = renderToString(<Component />);

  expect(componentRenderResult).toBe('<div>test</div>');
});
