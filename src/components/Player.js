import React, { Component } from 'react';
import Youtube from 'react-youtube'

export default class Player extends Component {
  render () {
    const { video, endVdo } = this.props;
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 1
      }
    };
    return (
      <div>
        {
          video ?
          <Youtube videoId={video.id} opts={opts} onEnd={endVdo} />:
          <h1>Please enter a keyword to search for, or a Youtube link</h1>  
        }
      </div>
    )
  }
}