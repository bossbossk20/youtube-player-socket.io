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

const Player = ({ video, endVdo }) => (
  <div>
    {video ? (
      <Youtube videoId={video.id} opts={playerOptions} onEnd={endVdo} />
    ) : (
      <h1>Please enter a keyword to search</h1>
    )}
  </div>
)

Player.propTypes = {
  video: PropTypes.shape({
    id: PropTypes.string.isRequired
  }),
  endVdo: PropTypes.func
}

export default Player
