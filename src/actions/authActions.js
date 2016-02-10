import request from 'superagent'
import api from 'meta/api'

export const SET_USER   = 'SET_USER'
export const UNSET_USER = 'UNSET_USER'

export function setUser(user) {
  return {
    type: SET_USER,
    user
  }
}

export function unsetUser(user) {
  return {
    type: UNSET_USER
  }
}

export function getUser() {
  return dispatch => {
    request
      .get(api.user.me)
      .withCredentials()
      .set('Accept', 'application/json')
      .end((error, response) => {
        if (error) { throw new Error('User not set') }

        const user = response.body
        dispatch(setUser(user))
      })
  }
}

export function signInOrUp(user) {
  return dispatch => {
    user.picture = user.picture.data.url

    request
      .post(api.user.authenticate)
      .send(user)
      .withCredentials()
      .set('Accept', 'application/json')
      .end((error, response) => {
        if (error) { throw new Error('User not set') }

        const user = response.body

        dispatch(setUser(user))
      })
  }
}
