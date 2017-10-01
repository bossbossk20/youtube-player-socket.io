import React from 'react'
import ReactDOM from 'react-dom'
import Router from 'react-router'
import routes from './routes'
import ReactGA from 'react-ga'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
// import 'bulma/css/bulma.css'
import 'antd/dist/antd.css'

ReactDOM.render(<App />, document.getElementById('root'))

ReactGA.initialize('UA-101263186-4');
function logPageView() {
  ReactGA.set({ page: window.location.pathname + window.location.search });
  ReactGA.pageview(window.location.pathname + window.location.search);
}
var app = document.getElementById('app');
ReactDOM.render(<Router routes={routes} onUpdate={logPageView} />, app);
registerServiceWorker()
