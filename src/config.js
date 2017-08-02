import io from 'socket.io-client'

const socket = io.connect('https://api.kody-koy.me:7001')

export default socket
