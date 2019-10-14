import React from 'react'
import PropTypes from 'prop-types'
import Youtube from 'react-youtube'

const playerOptions = {
  height: 390,
  width: 640,
  playerVars: {
    autoplay: 1
  }
}

const Player = ({ video, endVideo }) => (
  <div>
    {video ? (
      <Youtube videoId={video.id} opts={playerOptions} onEnd={endVideo} />
    ) : (
      <h1>Please enter a keyword to search</h1>
    )}
  </div>
)

Player.propTypes = {
  video: PropTypes.shape({
    id: PropTypes.string.isRequired
  }),
  endVideo: PropTypes.func
}

export default Player
