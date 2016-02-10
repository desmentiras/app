import {createStore, applyMiddleware, compose} from 'redux'
import {reduxReactRouter} from 'redux-router'
import thunk from 'redux-thunk'
import createHistory from 'history/lib/createBrowserHistory'

import routes from '../routes'
import rootReducer from 'reducers/Root'

const finalCreateStore = compose(
  applyMiddleware(thunk),
  reduxReactRouter({routes, createHistory})
)(createStore)

export default function Store(initialState) {
  return finalCreateStore(rootReducer, initialState)
}
