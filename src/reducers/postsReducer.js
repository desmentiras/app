import {combineReducers} from 'redux'

import {
  GET_MOST_RECENT_POSTS,
  GET_MOST_RECENT_POSTS_SUCCESS,
  GET_MOST_RECENT_POSTS_FAIL,

  GET_POST_BY_ID,
  GET_POST_BY_ID_SUCCESS,
  GET_POST_BY_ID_FAIL,

  UPVOTES_INCREASE,
  DOWNVOTES_INCREASE,

  SET_VOTES_BALANCE,
  SET_MY_VOTE
} from 'actions/postsActions'

function recentPosts(state = {
  posts: [],
  error: false,
  isFetching: true
}, action) {
  switch (action.type) {
    case GET_MOST_RECENT_POSTS:
      return Object.assign({}, state, {
        posts: [],
        error: false,
        isFetching: true
      })
    case GET_MOST_RECENT_POSTS_SUCCESS:
      return Object.assign({}, state, {
        posts: action.posts,
        error: false,
        isFetching: false
      })
    case GET_MOST_RECENT_POSTS_FAIL:
      return Object.assign({}, state, {
        posts: [],
        error: action.error,
        isFetching: false
      })
    default:
      return state
  }
}

function postById(state = {
  post: null,
  error: false,
  isFetching: true
}, action) {
  switch (action.type) {
    case GET_POST_BY_ID:
      return Object.assign({}, state, {
        post: null,
        error: false,
        isFetching: true
      })
    case GET_POST_BY_ID_SUCCESS:
      return Object.assign({}, state, {
        post: action.post,
        error: false,
        isFetching: false
      })
    case GET_POST_BY_ID_FAIL:
      return Object.assign({}, state, {
        post: action.post,
        error: action.error,
        isFetching: false
      })
    default:
      return state
  }
}

function votes(state = {
  upvotes: [],
  downvotes: [],
  balance: 0
}, action) {
  switch (action.type) {
    case SET_VOTES_BALANCE:
      return Object.assign({}, state, {
        upvotes: action.upvotes,
        downvotes: action.downvotes,
        balance: action.upvotes.length - action.downvotes.length
      })
    case UPVOTES_INCREASE:
      return Object.assign({}, state, {
        upvotes: action.upvotes,
        downvotes: action.downvotes,
        balance: action.balance
      })
    case DOWNVOTES_INCREASE:
      return Object.assign({}, state, {
        upvotes: action.upvotes,
        downvotes: action.downvotes,
        balance: action.balance
      })
    default:
      return state
  }
}

function myVote(state = null, action) {
  switch (action.type) {
    case SET_MY_VOTE:
      return action.vote
    default:
      return state
  }
}

const postsReducer = combineReducers({recentPosts, postById, votes, myVote})

export default postsReducer
