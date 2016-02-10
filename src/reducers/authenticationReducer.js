import {combineReducers} from 'redux'
import {
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAIL,

  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from 'actions/authenticationActions'

function register(state = {
  isFetching: false,
  error: false,
  user: null
}, action) {
  switch (action.type) {
    case REGISTER:
      return Object.assign({}, state, {
        isFetching: true,
        error: false
      })
    case REGISTER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        error: false,
        user: action.user
      })
    case REGISTER_FAIL:
      return Object.assign({}, state,  {
        isFetching: false,
        error: action.error
      })
    default:
      return state
  }
}

function login(state = {
  isFetching: false,
  error: false,
  user: null
}, action) {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state, {
        isFetching: true,
        error: false
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, state,  {
        isFetching: false,
        error: false,
        user: action.user
      })
    case LOGIN_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        error: true
      })
    default:
      return state
  }
}

const authenticationReducer = combineReducers({register, login})

export default authenticationReducer
