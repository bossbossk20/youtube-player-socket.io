import * as Grid from 'antd/lib/grid'

import React, { Component } from 'react'
import { URI, socket } from './config'
import PlayList from './components/PlayList'
import Player from './components/Player'

import Axios from 'axios'
import Form from 'antd/lib/form'
import GitHubForkRibbon from './components/GitHubForkRibbon'

import Input from 'antd/lib/input'
import message from 'antd/lib/message'
import styled from 'styled-components'

const { Search } = Input
const { Col, Row } = Grid

const PageWrapper = styled.main`
  margin-top: 30px;
  margin-right: 10px;
`

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

  handleSearch = async value => {
    try {
      const { data: { items } } = await Axios.get(
        `${URI}/search?keyword=${value}`
      )
      this.setState({
        showPlaylist: false,
        searchs: items
      })
    } catch (err) {
      console.log(err)
    }
  }

  handleRemove = index => {
    const lists = this.state.lists
    lists.splice(index, 1)
    this.setState({ lists })
    socket.emit('newLists', { lists })
  }

  handleAdd = (id, title, img) => {
    const list = { id, title, img }
    this.setState({
      showPlaylist: true,
      lists: [...this.state.lists, list]
    })
    socket.emit('newVdo', list)
    message.success('Added To Playlist')
  }

  endVdo = () => {
    const lists = this.state.lists
    lists.shift()
    this.setState({ lists })
    socket.emit('newLists', { lists })
  }

  render() {
    const { lists, showPlaylist, searchs } = this.state
    return (
      <PageWrapper>
        <Row>
          <Col md={16} xs={24} style={{ textAlign: 'center' }}>
            <Player video={lists[0]} endVdo={this.endVdo} />
          </Col>
          <Col md={8} xs={24}>
            <Search onSearch={value => this.handleSearch(value)} autoFocus />
            <PlayList
              lists={lists}
              searchs={searchs}
              showPlaylist={showPlaylist}
              onAdd={this.handleAdd}
              onRemove={this.handleRemove}
            />
          </Col>
        </Row>
        <GitHubForkRibbon />
      </PageWrapper>
    )
  }
}

export default Form.create()(App)
