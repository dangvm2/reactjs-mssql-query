import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import combineReducers from './reducers/reducer';
import thunk from 'redux-thunk'

export const store = createStore(combineReducers, composeWithDevTools(applyMiddleware(thunk)));
