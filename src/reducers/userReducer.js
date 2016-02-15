import {combineReducers} from 'redux'
import {
  SET_USER,
  UNSET_USER
} from 'actions/authActions'

function user(state = {user: null}, action) {
  switch (action.type) {
    case SET_USER:
      return Object.assign({}, state, {
        user: action.user
      })
    case UNSET_USER:
      return Object.assign({}, state, {user: null})
    default:
      return state
  }
}

const userReducer = combineReducers({user})

export default userReducer
