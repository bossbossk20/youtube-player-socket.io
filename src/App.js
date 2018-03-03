import * as Grid from 'antd/lib/grid'

import React, { Component } from 'react'
import { URI, socket } from './config'

import Axios from 'axios'
import Form from 'antd/lib/form'
import GitHubForkRibbon from 'react-github-fork-ribbon'
import { Helmet } from 'react-helmet'
import Input from 'antd/lib/input'
import PlayList from './components/PlayList'
import Player from './components/Player'
import message from 'antd/lib/message'

const { Search } = Input
const { Col, Row } = Grid
class App extends Component {
  state = {
    list: '',
    lists: [],
    showPlaylist: true,
    searchs: []
  }
  componentDidMount = () => {
    socket.on('newVdo', data => {
      this.setState({
        lists: [...this.state.lists, data]
      })
    })
    socket.on('newLists', data => {
      this.setState({
        lists: data.lists
      })
    })
  }
  handleChange = e => {
    this.setState({
      list: e.target.value
    })
  }
  handleClick = value => {
    Axios.get(`${URI}/search?keyword=${value}`).then(res => {
      this.setState({
        showPlaylist: false,
        searchs: res.data.items
      })
    })
  }
  handleRemove = index => {
    let lists = this.state.lists
    lists.splice(index, 1)
    this.setState({ lists })
    socket.emit('newLists', { lists })
  }
  handleAdd = (id, title, img) => {
    let list = { id, title, img }
    this.setState({
      showPlaylist: true,
      lists: [...this.state.lists, list]
    })
    socket.emit('newVdo', list)
    message.success('Added To Playlist')
  }
  endVdo = () => {
    let lists = this.state.lists
    lists.shift()
    this.setState({ lists })
    socket.emit('newLists', { lists })
  }
  render() {
    const { lists, showPlaylist, searchs } = this.state
    return (
      <div style={{ marginTop: '30px', marginRight: '10px' }}>
        <Helmet>
          <title>Socket.io Youtube Player</title>
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="../public/icons/apple-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="../public/icons/apple-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="../public/icons/apple-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="../public/icons/apple-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="../public/icons/apple-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="../public/icons/apple-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="../public/icons/apple-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="../public/icons/apple-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="../public/icons/apple-icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="../public/icons/android-icon-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="../public/icons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="../public/icons/favicon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="../public/icons/favicon-16x16.png"
          />
          <link rel="manifest" href="../public/icons/manifest.json" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta
            name="msapplication-TileImage"
            content="../public/icons/ms-icon-144x144.png"
          />
          <meta name="theme-color" content="#ffffff" />
        </Helmet>
        <Row>
          <Col md={16} xs={24} style={{ textAlign: 'center' }}>
            <Player video={lists[0]} endVdo={this.endVdo} />
          </Col>
          <Col md={8} xs={24}>
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
        <GitHubForkRibbon
          href="https://github.com/bossbossk20/youtube-player-socket.io"
          target="_blank"
          position="left"
          color="green"
        >
          Fork me on GitHub
        </GitHubForkRibbon>
      </div>
    )
  }
}

export default Form.create()(App)
