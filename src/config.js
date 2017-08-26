import io from 'socket.io-client'

const uri = 'https://api.kody-koy.me'
export const socket = io.connect(uri)
export const URI = uri
