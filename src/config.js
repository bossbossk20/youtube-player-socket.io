import io from 'socket.io-client'

const socket = io.connect('http://localhost:7001')

export default socket