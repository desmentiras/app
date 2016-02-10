export const REGISTER         = 'REGISTER'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAIL    = 'REGISTER_FAIL'

export function register(user) {
  return {
    type: REGISTER,
    user
  }
}

export function registerSuccess(user) {
  return {
    type: REGISTER_SUCCESS,
    user: user
  }
}

export function registerFail(error) {
  return {
    type: REGISTER_FAIL,
    error: error
  }
}

export function tryToRegister(user) {
  return dispatch => {
    const newUser = new Stamplay.User().Model

    dispatch(register(user))

    newUser.signup(user).then(() => {
      newUser.save()
      return dispatch(registerSuccess(user))
    }, error => {
      return dispatch(registerFail(error))
    })
  }
}

export const LOGIN         = 'LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL    = 'LOGIN_FAIL'

export function login(user) {
  return {
    type: LOGIN,
    user
  }
}

export function loginSuccess({user}) {
  return {
    type: LOGIN_SUCCESS,
    user: user
  }
}

export function loginFail() {
  return {
    type: LOGIN_FAIL,
    error: true
  }
}

export function tryToLogin(userData) {
  return dispatch => {
    const user = new Stamplay.User().Model

    dispatch(login(userData))

    user
      .login(userData.email, userData.password)
      .then(() => {
        return dispatch(loginSuccess({user: user.instance}))
      }, () => {
        return dispatch(loginFail())
      })
  }
}
