import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import BlogProvider from './store/BlogProvider';

ReactDOM.render(<BlogProvider><BrowserRouter><App /></BrowserRouter></BlogProvider>, document.getElementById('root'));
