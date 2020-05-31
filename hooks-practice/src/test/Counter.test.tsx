import React from 'react';
import renderer from 'react-test-renderer';

import Counter from '../components/Counter';

test('render test', () => {
  const component = renderer.create(
    <Counter />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})