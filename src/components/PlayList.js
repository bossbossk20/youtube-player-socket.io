import React, { Component } from 'react';
import { Button } from 'antd';

export default class PlayList extends Component {
  render() {
    const { lists, searchs, showPlaylist, handleAdd, handleRemove } = this.props;
    return (
      <div>
        {
          showPlaylist ?
          lists.map((list, index) => (
            <div key={index} style={{display: 'flex', marginTop: '10px'}} >
              <div>
                <img src={list.img} alt="" style={{width:'250px'}} />
              </div>
              <div style={{display: 'flex', flexDirection:'column', justifyContent:'space-evenly', width: '100%', textAlign:'center', marginLeft: '8px'}}>
                <div>{list.title}</div>
                <Button type="primary" onClick={ () => handleRemove(index) } >REMOVE</Button>
              </div>
            </div>
          )):
          searchs.map((search, index) => (
            <div key={index} style={{display: 'flex', marginTop: '10px'}} >
              <div>
                <img src={search.snippet.thumbnails.medium.url} alt="" style={{width:'250px'}} />
              </div>
              <div style={{display: 'flex', flexDirection:'column', justifyContent:'space-evenly', width: '100%', textAlign:'center', marginLeft: '8px'}}>
                <div>{search.snippet.title}</div>
                <Button type="primary" onClick={ () => handleAdd(search.id.videoId, search.snippet.title, search.snippet.thumbnails.medium.url) } >ADD</Button>
              </div>
            </div>
          ))
        }
      </div>
    )
  }
}
