import React from 'react';
import ReactDOM from 'react-dom';
import Player from './Player';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props = {
    video: {
      id: 'OT5iufs218g',
    },
    endVdo: () => console.log('video ended'),
  };
  ReactDOM.render(<Player {...props} />, div);
});

it('renders without param', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Player />, div);
});
