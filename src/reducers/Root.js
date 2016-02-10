import {routerStateReducer as router} from 'redux-router'
import {combineReducers} from 'redux'

import userReducer from 'reducers/userReducer'
import playerReducer from 'reducers/playerReducer'
import civilizationReducer from 'reducers/civilizationReducer'

export default combineReducers({
  userReducer,
  playerReducer,
  civilizationReducer,
  router
})
