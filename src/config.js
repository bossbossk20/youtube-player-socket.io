import io from 'socket.io-client'

const socket = io.connect('https://api.kody-koy.me')
// const socket = io.connect('localhost:7001')
export default socket
