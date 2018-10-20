import React from 'react'
import PropTypes from 'prop-types'
import PlayListItem from './PlayListItem'

const PlayList = ({ lists, searchs, showPlaylist, onAdd, onRemove }) => (
  <div>
    {showPlaylist &&
      lists.map((list, index) => (
        <PlayListItem
          image={list.img}
          title={list.title}
          onRemove={() => onRemove(index)}
          key={index}
        />
      ))}
    {!showPlaylist &&
      searchs.map((search, index) => (
        <PlayListItem
          image={search.snippet.thumbnails.medium.url}
          alt={`${search.snippet.title} Image`}
          title={search.snippet.title}
          onAdd={() =>
            onAdd(
              search.id.videoId,
              search.snippet.title,
              search.snippet.thumbnails.medium.url
            )
          }
          key={index}
        />
      ))}
  </div>
)

const searchPropTypes = PropTypes.shape({
  snippet: PropTypes.object.isRequired,
  id: PropTypes.shape({
    videoId: PropTypes.string.isRequired
  }).isRequired
})

PlayList.propTypes = {
  lists: PropTypes.arrayOf(
    PropTypes.shape({
      img: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  ).isRequired,
  searchs: PropTypes.arrayOf(searchPropTypes),
  showPlaylist: PropTypes.bool,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
}

export default PlayList
