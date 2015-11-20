'use strict';
import {createStore as _createStore, combineReducers} from 'redux';
import {routeReducer} from 'redux-simple-router';

// reducers
import post from './post/reducer';

const reducers = combineReducers({
  routing: routeReducer,
  post,
});

export default function createStore(initialState) {
  return _createStore(reducers, initialState);
}
