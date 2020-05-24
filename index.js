import {combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';
import React from 'react';
import ReactDom from 'react-dom';
import {App} from './App';

const userReducers = require('./reducers/index');
const store = createStore(combineReducers({userReducers}));

ReactDom.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('root')
);