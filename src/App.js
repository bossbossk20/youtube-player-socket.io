import React, { Component } from 'react'
import Youtube from 'react-youtube'
import socket from './config'

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
  handleClick = () => {
    // console.log(this.state.list)
    socket.emit('newVdo', {link: this.state.list})
    this.setState({
      lists: [ ...this.state.lists, {link: this.state.list} ]
    })
  }
  handleRemove = (index) => {
    let lists = this.state.lists
    lists.splice(index, 1)
    this.setState({ lists })
    socket.emit('newLists', { lists })
  }
   endVdo = () => {
      let lists = this.state.lists
      lists.shift()
      this.setState({ lists })
      socket.emit('newLists', { lists })
  }
  render () {
    let { lists } = this.state
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 1
      }
    }

    return (
      <div>
      <div className="columns">
        <div className="column">
        {
          !this.state.lists[0]? 
          <h1>Please Enter Link</h1> : 
          <Youtube
            videoId={this.state.lists[0].link.split('=')[1]}
            opts={opts}
            onEnd={this.endVdo}
          />
        }
        </div>
        <div className="column">
        <div className="columns">
          <div className="column is-three-quarters">
            <div className="field">
              <div className="control">
                <input className="input is-primary" type="text" onChange={this.handleChange} placeholder="Link" />
              </div>
            </div>
          </div>
          <div className="column">
            <a className="button is-info" onClick={this.handleClick}>Add</a>
          </div>
        </div>
        {
          lists.map((item, index) => (
        <div className="columns" key={item.link+index}>
          <div className="column is-three-quarters">
            <div className="field">
              <div className="control">
                <span> {item.link} </span>
              </div>
            </div>
          </div>
          <div className="column">
            <a className="button is-danger" onClick={ () => this.handleRemove(index)}>Remove</a>
          </div>
        </div>
          ))
        }
        </div>
      </div>
      </div>
    )
  }
}

export default App
