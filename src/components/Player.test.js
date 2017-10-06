import React from 'react';
import ReactDOM from 'react-dom';
import Player from './Player';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Player video="https://www.youtube.com/watch?v=OT5iufs218g" endVdo={() => {
    console.log('video ended');
  }}/>, div);
});

it('renders without param', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Player />, div);
});

