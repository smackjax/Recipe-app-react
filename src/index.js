// Bootstrap imports (jquery & tether in index.html)
import 'bootstrap/dist/css/bootstrap.min.css';

// Font-awesome
import 'font-awesome/css/font-awesome.css';

import React from 'react';
import ReactDOM from 'react-dom';

import 'sanitize.css/sanitize.css';
import './index.css';
import App from './App';

import registerServiceWorker from './registerServiceWorker';
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
