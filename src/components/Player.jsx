import Youtube from 'react-youtube'
import React, { Component } from 'react'

const opts = {
  height: '390',
  width: '640',
  playerVars: {
    autoplay: 1
  }
}

class Player extends Component {
  render () {
    const {lists, endVdo} = this.props

    return !lists
      ? <h1>Please Enter Link</h1>
      : <Youtube videoId={lists[0].id} opts={opts} onEnd={endVdo} />
  }
}

Player.propTypes = {
  lists: React.PropTypes.array,
  endVdo: React.PropTypes.func
}

export default Player
