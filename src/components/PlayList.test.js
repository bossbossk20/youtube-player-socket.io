import React from 'react';
import ReactDOM from 'react-dom';
import PlayList from './PlayList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const lists = [];
  const searchs = [];
  const showPlaylist = true;

  ReactDOM.render(<PlayList
    lists={lists}
    searchs={searchs}
    showPlaylist={showPlaylist}
    handleAdd={() = > {
      console.log('added');
    }}
    handleRemove={() => {
      console.log('removed list')
    }}
  />, div);
});
