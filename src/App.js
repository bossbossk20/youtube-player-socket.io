import React, { Component } from 'react'
import Youtube from 'react-youtube'
import { Row, Col, Input, Form, message, Button } from 'antd'
import Axios from 'axios'
import { socket, URI } from './config'

const { Search } = Input
class App extends Component {
  state = {
    list: '',
    lists: [],
    showPlaylist: true,
    searchs: []
  }
  componentDidMount = () => {
    socket.on('newVdo', (data) => {
      this.setState({
        lists: [ ...this.state.lists, data ]
      })
    })
    socket.on('newLists', (data) => {
      this.setState({
        lists: data.lists
      })
    })
  }
  handleChange = (e) => {
    this.setState({
      list: e.target.value
    })
  }
  handleClick = (value) => {
    Axios.get(`${URI}/search?keyword=${value}`).then((res) => {
      this.setState({
        showPlaylist: false,
        searchs: res.data.items
      })
    })
  }
  handleRemove = (index) => {
    let lists = this.state.lists
    lists.splice(index, 1)
    this.setState({ lists})
    socket.emit('newLists', { lists})
  }
  handleAdd = (id, title, img) => {
    let list = { id, title, img }
    this.setState({
      showPlaylist: true,
      lists: [ ...this.state.lists, list ]
    })
    socket.emit('newVdo', list )
    message.success('Added To Playlist')
  }
  endVdo = () => {
    let lists = this.state.lists
    lists.shift()
    this.setState({ lists})
    socket.emit('newLists', { lists})
  }
  render () {
    const { lists, showPlaylist, searchs } = this.state
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 1
      }
    }
    return (
      <div style={{marginTop: '30px', marginRight: '10px'}}>
        <a href={'https://github.com/bossbossk20/youtube-player-socket.io'}>
        <img style={{position: 'absolute', top: '0', left: '0', border: '0'}} src={'https://camo.githubusercontent.com/8b6b8ccc6da3aa5722903da7b58eb5ab1081adee/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f6c6566745f6f72616e67655f6666373630302e706e67'} alt={'Fork me on GitHub'} data-canonical-src={'https://s3.amazonaws.com/github/ribbons/forkme_left_orange_ff7600.png'} />
        </a>
        <Row>
          <Col md={16} xs={24} style={{textAlign: 'center'}}>
          {!lists[0] ?
             <h1>Please Enter Link</h1> :
             <Youtube videoId={lists[0].id} opts={opts} onEnd={this.endVdo} />}
          </Col>
          <Col md={8} xs={24} >
          <Search onSearch={value => this.handleClick(value)} />
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
                     <Button type="primary" onClick={ () => this.handleRemove(index) } >REMOVE</Button>
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
                       <Button type="primary" onClick={ () => this.handleAdd(search.id.videoId, search.snippet.title, search.snippet.thumbnails.medium.url) } >ADD</Button>
                    </div>
                  </div>
                ))
            }
          </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Form.create()(App)
