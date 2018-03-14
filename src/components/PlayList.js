import React, { Component } from 'react'

import Button from 'antd/lib/button'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export const PlayItem = styled.div`
  display: flex;
  margintop: 10px;
`

const ItemImage = styled.img`
  width: 250px;
`

const DescWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  text-align: center;
  margin-left: 8px;
`

class PlayList extends Component {
  render() {
    const { lists, searchs, showPlaylist, handleAdd, handleRemove } = this.props
    return (
      <div>
        {showPlaylist
          ? lists.map((list, index) => (
              <PlayItem key={index}>
                <div>
                  <ItemImage src={list.img} alt="" />
                </div>
                <DescWrapper>
                  <div>{list.title}</div>
                  <Button type="primary" onClick={() => handleRemove(index)}>
                    REMOVE
                  </Button>
                </DescWrapper>
              </PlayItem>
            ))
          : searchs.map((search, index) => (
              <PlayItem key={index}>
                <div>
                  <ItemImage
                    src={search.snippet.thumbnails.medium.url}
                    alt={search.snippet.title + ' Image'}
                  />
                </div>
                <DescWrapper>
                  <div>{search.snippet.title}</div>
                  <Button
                    type="primary"
                    onClick={() =>
                      handleAdd(
                        search.id.videoId,
                        search.snippet.title,
                        search.snippet.thumbnails.medium.url
                      )
                    }
                  >
                    ADD
                  </Button>
                </DescWrapper>
              </PlayItem>
            ))}
      </div>
    )
  }
}

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
  handleAdd: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired
}

export default PlayList
