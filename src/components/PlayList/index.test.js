import PlayList from './index'
import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'

describe('Playlist', () => {
  let context
  beforeEach(() => {
    context = {
      props: {
        lists: [
          {
            img: 'first-img',
            title: 'first'
          },
          {
            img: 'second-img',
            title: 'second'
          },
          {
            img: 'third-img',
            title: 'third'
          }
        ],
        searchs: [
          {
            snippet: {
              thumbnails: {
                medium: {
                  url: 'search-url-1'
                }
              },
              title: 'search-title-1'
            },
            id: {
              videoId: 'search-video-1'
            }
          },
          {
            snippet: {
              thumbnails: {
                medium: {
                  url: 'search-url-2'
                }
              },
              title: 'search-title-2'
            },
            id: {
              videoId: 'search-video-2'
            }
          }
        ],
        showPlaylist: false,
        handleAdd: jest.fn(),
        handleRemove: jest.fn()
      }
    }
  })

  it('should render without crashing', () => {
    const { props } = context
    const wrapper = shallow(<PlayList {...props} />)
    expect(wrapper.type()).toBe('div')
  })
  it('should render list items if showPlayList is true', () => {
    const { props } = context
    props.showPlaylist = true
    const wrapper = shallow(<PlayList {...props} />)
    expect(wrapper.props().children.length).toBe(3)
  })
  it('shoud render search items if showPlaylist is false', () => {
    const { props } = context
    const wrapper = shallow(<PlayList {...props} />)
    expect(wrapper.props().children.length).toBe(2)
  })
  it('shoud render search items if showPlaylist is false', () => {
    const { props } = context
    const wrapper = shallow(<PlayList {...props} />)
  })
})

it('renders without crashing', () => {
  const div = document.createElement('div')
  const lists = []
  const searchs = []
  const showPlaylist = true

  ReactDOM.render(
    <PlayList
      lists={lists}
      searchs={searchs}
      showPlaylist={showPlaylist}
      handleAdd={() => {
        console.log('added')
      }}
      handleRemove={() => {
        console.log('removed list')
      }}
    />,
    div
  )
})
