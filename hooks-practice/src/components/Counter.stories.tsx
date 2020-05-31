import React from 'react';

import Counter from './Counter';

export default {
  component: Counter,
  title: 'Counter',
  excludeStories: /.*Data$/,
}

export const Default = () => <Counter />;