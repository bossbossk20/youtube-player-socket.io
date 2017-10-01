import { Button } from 'antd'
import React, { Component } from 'react'

class PlayerList extends Component {
  removePlayList (id) {
    this.props.handleRemove(id)
  }

  addPlayList (search) {
    const videoId = search.id.videoId
    const title = search.snippet.title
    const thumbnailUrl = search.snippet.thumbnails.medium.url

    this.props.handleAdd(videoId, title, thumbnailUrl)
  }

  render () {
    const {showPlaylist, lists, searches} = this.props

    return <div>
      {
        showPlaylist
          ? (
            lists.map((list, index) => (
              <div key={index} style={{display: 'flex', marginTop: '10px'}}>
                <div>
                  <img src={list.img} alt='' style={{width: '250px'}} />
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                  width: '100%',
                  textAlign: 'center',
                  marginLeft: '8px'
                }}>
                  <div>{ list.title }</div>
                  <Button type='primary' onClick={() => this.removePlayList()}>REMOVE</Button>
                </div>
              </div>
            ))
          )

          : (
            searches.map((search, index) => (
              <div key={index} style={{display: 'flex', marginTop: '10px'}}>
                <div>
                  <img src={search.snippet.thumbnails.medium.url} alt='' style={{width: '250px'}} />
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                  width: '100%',
                  textAlign: 'center',
                  marginLeft: '8px'
                }}>
                  <div>{ search.snippet.title }</div>
                  <Button type='primary' onClick={() => this.addPlayList(search)}>
                    ADD
                  </Button>
                </div>
              </div>
            ))
          )

      }
    </div>
  }
}

PlayerList.propTypes = {
  showPlaylist: React.PropTypes.bool,
  lists: React.PropTypes.array,
  searches: React.PropTypes.array,
  handleRemove: React.PropTypes.func,
  handleAdd: React.PropTypes.func
}

export default PlayerList
