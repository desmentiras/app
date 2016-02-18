import {combineReducers} from 'redux'
import {
  VERIFY_LINK,
  VERIFY_LINK_VALID,
  VERIFY_LINK_INVALID,

  GET_URL_CONTENTS,
  GET_URL_CONTENTS_SUCCESS,
  GET_URL_CONTENTS_FAIL
} from 'actions/publishActions'

function link(state = {
  currentValue: null,
  url: null,
  isValid: true
}, action) {
  switch (action.type) {
    case VERIFY_LINK_VALID:
      return Object.assign({}, state, {
        currentValue: action.currentValue,
        url: action.url,
        isValid: true
      })
    case VERIFY_LINK_INVALID:
      return Object.assign({}, state, {
        currentValue: action.currentValue,
        url: null,
        isValid: false
      })
    default:
      return state
  }
}

function urlContents(state = {
  isFetching: false,
  contents: null,
  error: null
}, action) {
  switch (action.type) {
    case GET_URL_CONTENTS:
      return Object.assign({}, state, {
        isFetching: true,
        contents: null,
        error: false
      })
    case GET_URL_CONTENTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        contents: action.contents,
        error: false
      })
    case GET_URL_CONTENTS_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        contents: null,
        error: action.error
      })
    default:
      return state
  }
}

const publishReducer = combineReducers({link, urlContents})

export default publishReducer
