import React, { Component } from 'react'
import Youtube from 'react-youtube'
import { Row, Col, Input, Form, message } from 'antd'

import socket from './config'

const { Search } = Input
const FormItem = Form.Item;
class App extends Component {
  state = {
    list: '',
    lists: []
  }
  componentDidMount = () => {
    console.log('test')
    socket.on('newVdo', (data) => {
      console.log(data)
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
    // console.log(this.state.list)
    let { lists } = this.state
    if (lists.filter(item => item.link== value).length === 0) {
      socket.emit('newVdo', {link: value})
      this.setState({
        lists: [ ...this.state.lists, {link: value} ],
        list: ''
      })
      message.success('Added to playlist')
    } else {
      message.error('This link is already added')
    }
  }
  handleRemove = (index) => {
    let lists = this.state.lists
    lists.splice(index, 1)
    this.setState({ lists})
    socket.emit('newLists', { lists})
  }
  endVdo = () => {
    let lists = this.state.lists
    lists.shift()
    this.setState({ lists})
    socket.emit('newLists', { lists})
  }
  render () {
    const { lists } = this.state
    const { getFieldDecorator } = this.props.form
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 1
      }
    }
    return (
      <div style={{marginTop: '30px', marginRight: '10px'}}>
        <Row>
          <Col xs={16} style={{textAlign: 'center'}}>
          {!this.state.lists[0] ?
             <h1>Please Enter Link</h1> :
             <Youtube videoId={this.state.lists[0].link.split('=')[1]} opts={opts} onEnd={this.endVdo} />}
          </Col>
          <Col xs={8}>
          <Search onSearch={value => this.handleClick(value)} />
          <div>
            {
              lists.map((item, index) => (
                <div key={item.link+index}>
                  <span> {item.link} </span>
                  <a onClick={() => this.handleRemove(index)}>Remove</a>
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
