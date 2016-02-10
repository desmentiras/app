import {combineReducers} from 'redux'

import {
  SET_CIVILIZATION
} from 'actions/civilizationActions'

function civilization(state = {
  civilization: null
}, action) {
  switch (action.type) {
    case SET_CIVILIZATION:
      return Object.assign({}, state, action.civilization)
    default:
      return state
  }
}

const civilizationReducer = combineReducers({civilization})

export default civilizationReducer
