import superagent from 'superagent'
import is from 'is_js'

import api from 'meta/api'

export const VERIFY_LINK         = 'VERIFY_LINK'
export const VERIFY_LINK_VALID   = 'VERIFY_LINK_VALID'
export const VERIFY_LINK_INVALID = 'VERIFY_LINK_INVALID'

let getUrlContentsTimeout

export function verifyLink(value) {
  return dispatch => {
    clearTimeout(getUrlContentsTimeout)

    if (is.url(value)) {
      dispatch(verifyLinkValid({currentValue: value, url: value}))

      getUrlContentsTimeout = setTimeout(() => {
        dispatch(fetchUrlContents(value))
      }, 1000)
      return
    }

    dispatch(verifyLinkInvalid(value))
  }
}

function verifyLinkValid({currentValue, url}) {
  return {
    type: VERIFY_LINK_VALID,
    currentValue: currentValue,
    url: url
  }
}

function verifyLinkInvalid(currentValue) {
  return {
    type: VERIFY_LINK_INVALID,
    currentValue: currentValue
  }
}

export const GET_URL_CONTENTS         = 'GET_URL_CONTENTS'
export const GET_URL_CONTENTS_SUCCESS = 'GET_URL_CONTENTS_SUCCESS'
export const GET_URL_CONTENTS_FAIL    = 'GET_URL_CONTENTS_FAIL'

function fetchUrlContents(url) {
  return dispatch => {
    dispatch(getUrlContents())

    superagent
      .get(api.links.getInfo(url))
      .withCredentials()
      .end((error, response) => {
        if (error) { dispatch(getUrlContentsFail()) }

        const contents = response.body
        dispatch(getUrlContentsSuccess(contents))
      })
  }
}

function getUrlContents() {
  return {
    type: GET_URL_CONTENTS
  }
}

function getUrlContentsSuccess(contents) {
  return {
    type: GET_URL_CONTENTS_SUCCESS,
    contents: contents
  }
}

function getUrlContentsFail() {
  return {
    type: GET_URL_CONTENTS_FAIL
  }
}
