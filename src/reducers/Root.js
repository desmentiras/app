import {routerStateReducer as router} from 'redux-router'
import {combineReducers} from 'redux'

import userReducer from 'reducers/userReducer'
import postsReducer from 'reducers/postsReducer'
import publishReducer from 'reducers/publishReducer'

export default combineReducers({
  userReducer,
  postsReducer,
  publishReducer,
  router
})
