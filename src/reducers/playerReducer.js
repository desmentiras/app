import {combineReducers} from 'redux'

import {
  SET_PLAYER
} from 'actions/playerActions'

function player(state = {
  player: null
}, action) {
  switch (action.type) {
    case SET_PLAYER:
      return Object.assign({}, state, action.player)
    default:
      return state
  }
}

const playerReducer = combineReducers({player})

export default playerReducer
