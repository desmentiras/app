import {routerStateReducer as router} from 'redux-router'
import {combineReducers} from 'redux'

import userReducer from 'reducers/userReducer'
import postsReducer from 'reducers/postsReducer'

export default combineReducers({
  userReducer,
  postsReducer,
  router
})
