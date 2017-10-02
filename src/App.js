import React, { Component } from 'react'
import { Row, Col, Input, Form, message } from 'antd'
import Player from './components/Player'
import PlayList from './components/PlayList'
import Axios from 'axios'
import GitHubForkRibbon from 'react-github-fork-ribbon';
import { socket, URI } from './config'
import { Helmet } from "react-helmet";

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
    return (
      <div style={{marginTop: '30px', marginRight: '10px'}}>
        <Helmet>
            <title>Socket.io Youtube Player</title>
        </Helmet>
        <Row>
          <Col md={16} xs={24} style={{textAlign: 'center'}}>
            <Player
              video={lists[0]}
              endVdo={this.endVdo}
            />
          </Col>
          <Col md={8} xs={24} >
            <Search onSearch={value => this.handleClick(value)} autoFocus />
            <PlayList
              lists={lists}
              searchs={searchs}
              showPlaylist={showPlaylist}
              handleAdd={this.handleAdd}
              handleRemove={this.handleRemove}
            />
          </Col>
        </Row>
        <GitHubForkRibbon href="https://github.com/bossbossk20/youtube-player-socket.io"
          target="_blank"
          position="left"
          color="green">
            Fork me on GitHub
        </GitHubForkRibbon>
      </div>
    )
  }
}

export default Form.create()(App)