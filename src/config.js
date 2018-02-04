import io from 'socket.io-client'

const uri = 'https://api-music.herokuapp.com'
export const socket = io.connect(uri)
export const URI = uri
