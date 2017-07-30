import io from 'socket.io-client'

const socket = io.connect('http://188.166.236.179:7001')

export default socket