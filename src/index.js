import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './component/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
