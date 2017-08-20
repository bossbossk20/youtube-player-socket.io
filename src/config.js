import io from 'socket.io-client'

const uri = 'http://188.166.236.179:7001'
export const socket = io.connect(uri)
export const URI = uri
