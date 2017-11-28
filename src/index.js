import {  BrowserRouter as Router, } from 'react-router-dom';

// Bootstrap imports (jquery, tether, and popper in index.html)
import 'bootstrap/dist/css/bootstrap.min.css';

// Font-awesome
import 'font-awesome/css/font-awesome.css';

import React from 'react';
import ReactDOM from 'react-dom';

import 'sanitize.css/sanitize.css';
import './index.css';
import App from './App';

// import registerServiceWorker from './registerServiceWorker';
ReactDOM.render((
<Router>
    <App />
</Router>), 
document.getElementById('root'));
// registerServiceWorker();
