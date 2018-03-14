import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
// import 'bulma/css/bulma.css'
import 'antd/dist/antd.css'

ReactDOM.render(<App />, document.getElementById('root'))

ReactGA.initialize('UA-101263186-4', { debug: true });
registerServiceWorker()
