import React from 'react';
import ReactDOM from 'react-dom';
import './asset/css/App.css';
// import App from './App';
import App from './components/Location';
import { store } from './_store';
import { Provider } from 'react-redux';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));

