'use-strict';

import thunk from 'redux-thunk';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import VhxApi from '@vhx/vhxjs/dist/index.js';
import { reducers } from './analytics/reducers.js'

const vhx = new VhxApi('MK59abazQMa2xXRA5hAy2hFwvW2vvkaa');
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	combineReducers(reducers),
	composeEnhancers(applyMiddleware(thunk.withExtraArgument(vhx)))
);

export {
	store
};