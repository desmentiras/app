import request from 'superagent'
import is from 'is_js'
import api from 'meta/api'

export const GET_MOST_RECENT_POSTS         = 'GET_MOST_RECENT_POSTS'
export const GET_MOST_RECENT_POSTS_SUCCESS = 'GET_MOST_RECENT_POSTS_SUCCESS'
export const GET_MOST_RECENT_POSTS_FAIL    = 'GET_MOST_RECENT_POSTS_FAIL'

export function fetchMostRecentPosts() {
  return dispatch => {
    dispatch(getMostRecentPosts())

    request
      .get(api.posts.getMostRecent)
      .withCredentials()
      .set('Accept', 'application/json')
      .end((error, response) => {
        if (error) { dispatch(getMostRecentPostsFail()) }

        const posts = response.body

        dispatch(getMostRecentPostsSuccess(posts))
      })
  }
}

function getMostRecentPosts() {
  return {
    type: GET_MOST_RECENT_POSTS
  }
}

function getMostRecentPostsSuccess(posts) {
  return {
    type: GET_MOST_RECENT_POSTS_SUCCESS,
    posts
  }
}

function getMostRecentPostsFail(error) {
  return {
    type: GET_MOST_RECENT_POSTS_FAIL,
    error
  }
}

export const GET_POST_BY_ID               = 'GET_POST_BY_ID'
export const GET_POST_BY_ID_SUCCESS       = 'GET_POST_BY_ID_SUCCESS'
export const GET_POST_BY_ID_FAIL          = 'GET_POST_BY_ID_FAIL'
export const SET_POST_BY_ID_VOTES_BALANCE = 'SET_POST_BY_ID_VOTES_BALANCE'

export function fetchPostById(id) {
  return dispatch => {
    dispatch(getPostById())

    request
      .get(api.posts.getById(id))
      .withCredentials()
      .set('Accept', 'application/json')
      .end((error, response) => {
        if (error) { dispatch(getPostByIdFail(error)) }

        const post = response.body

        dispatch(setVotesBalance({upvotes: post.upvotes, downvotes: post.downvotes}))
        dispatch(getPostByIdSuccess(post))
      })
  }
}

function getPostById() {
  return {
    type: GET_POST_BY_ID
  }
}

function getPostByIdSuccess(post) {
  return {
    type: GET_POST_BY_ID_SUCCESS,
    post
  }
}

function getPostByIdFail(error) {
  return {
    type: GET_POST_BY_ID_FAIL,
    error
  }
}

function setPostByIdVotesBalance(votesBalance) {
  return {
    type: SET_POST_BY_ID_VOTES_BALANCE,
    votesBalance: votesBalance
  }
}

export const UPVOTE          = 'UPVOTE'
export const UPVOTE_SUCCESS  = 'UPVOTE_SUCCESS'
export const UPVOTES_INCREASE = 'UPVOTES_INCREASE'

export const DOWNVOTE          = 'DOWNVOTE'
export const DOWNVOTE_SUCCESS  = 'DOWNVOTE_SUCCESS'
export const DOWNVOTES_INCREASE = 'DOWNVOTES_INCREASE'

export function upvote({postId, userId, upvotes, downvotes}) {
  return dispatch => {
    dispatch(handleUpvoteIncreasement({
      userId: userId,
      upvotes: upvotes,
      downvotes: downvotes
    }))

    request
      .patch(api.posts.upvoteById(postId))
      .withCredentials()
      .set('Accept', 'application/json')
      .end((error, response) => {
        if (error) { console.log(error) }

        dispatch(upvoteSuccess())
      })
  }
}


export function downvote({postId, userId, upvotes, downvotes}) {
  return dispatch => {
    dispatch(handleDownvoteIncreasement({
      userId: userId,
      upvotes: upvotes,
      downvotes: downvotes
    }))

    request
      .patch(api.posts.downvoteById(postId))
      .withCredentials()
      .set('Accept', 'application/json')
      .end((error, response) => {
        if (error) { console.log(error) }

        dispatch(downvoteSuccess())
      })
  }
}

function handleUpvoteIncreasement({userId, upvotes, downvotes}) {
  return dispatch => {
    const shallowUpvotes = upvotes
    const shallowDownvotes = downvotes

    if (is.inArray(userId, upvotes)) {
      const userIdInUpvotesIndex = upvotes.indexOf(userId)

      shallowUpvotes.splice(userIdInUpvotesIndex, 1)

      const votesBalance = shallowUpvotes.length - shallowDownvotes.length

      dispatch(downvotesIncrease({
        upvotes: shallowUpvotes,
        downvotes: downvotes,
        balance: votesBalance
      }))
    } else if (is.inArray(userId, downvotes)) {
      const userIdInDownvotesIndex = shallowDownvotes.indexOf(userId)

      shallowUpvotes.push(userId)
      shallowDownvotes.splice(userIdInDownvotesIndex, 1)

      const votesBalance = shallowUpvotes.length - shallowDownvotes.length

      dispatch(upvotesIncrease({
        upvotes: shallowUpvotes,
        downvotes: shallowDownvotes,
        balance: votesBalance,
        plus: 1
      }))
    } else {
      shallowUpvotes.push(userId)

      const votesBalance = shallowUpvotes.length - shallowDownvotes.length

      dispatch(upvotesIncrease({
        upvotes: upvotes,
        downvotes: shallowDownvotes,
        balance: votesBalance
      }))
    }
  }
}

function handleDownvoteIncreasement({userId, upvotes, downvotes}) {
  return dispatch => {
    const shallowUpvotes = upvotes
    const shallowDownvotes = downvotes

    if (is.inArray(userId, upvotes)) {
      const userIdInUpvotesIndex = upvotes.indexOf(userId)

      shallowUpvotes.splice(userIdInUpvotesIndex, 1)
      shallowDownvotes.push(userId)

      const votesBalance = shallowUpvotes.length - shallowDownvotes.length

      dispatch(
        downvotesIncrease({
          upvotes: shallowUpvotes,
          downvotes: shallowDownvotes,
          balance: votesBalance,
          plus: 1
        }))
    } else if (is.inArray(userId, shallowDownvotes)) {
      const userIdInShallowDownvotesIndex = shallowDownvotes.indexOf(userId)

      shallowDownvotes.splice(userIdInShallowDownvotesIndex, 1)

      const votesBalance = shallowUpvotes.length - shallowDownvotes.length

      dispatch(upvotesIncrease({
        upvotes: shallowUpvotes,
        downvotes: shallowDownvotes,
        balance: votesBalance
      }))
    } else {
      shallowDownvotes.push(userId)

      const votesBalance = shallowUpvotes.length - shallowDownvotes.length

      dispatch(downvotesIncrease({
        upvotes: shallowUpvotes,
        downvotes: shallowDownvotes,
        balance: votesBalance
      }))
    }
  }
}

function upvotesIncrease({upvotes, downvotes, balance, plus}) {
  return {
    type: UPVOTES_INCREASE,
    upvotes: upvotes,
    downvotes: downvotes,
    balance: balance,
    plus: plus
  }
}

function downvotesIncrease({upvotes, downvotes, balance, plus}) {
  return {
    type: DOWNVOTES_INCREASE,
    upvotes: upvotes,
    downvotes: downvotes,
    balance: balance,
    plus: plus
  }
}

function upvoteSuccess() {
  return {
    type: UPVOTE_SUCCESS
  }
}

function downvoteSuccess() {
  return {
    type: DOWNVOTE_SUCCESS
  }
}

export const SET_VOTES_BALANCE = 'SET_VOTES_BALANCE'

export function setVotesBalance({upvotes, downvotes}) {
  return {
    type: SET_VOTES_BALANCE,
    upvotes: upvotes,
    downvotes: downvotes
  }
}

export const SET_MY_VOTE = 'SET_MY_VOTE'

export function checkMyVote({userId, upvotes, downvotes}) {
  return dispatch => {
    if (is.inArray(userId, upvotes)) {
      dispatch(setMyVote('upvote'))
      return
    }

    if (is.inArray(userId, downvotes)) {
      dispatch(setMyVote('downvote'))
      return
    }

    dispatch(setMyVote(null))
  }
}

export function setMyVote(vote) {
  return {
    type: SET_MY_VOTE,
    vote: vote
  }
}
