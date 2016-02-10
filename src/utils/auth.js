import hello from 'hellojs'

export default class {
  login() {
    return new Promise((resolve, reject) => {
      FB.login(response => {
        if (response.status === 'connected') {
          FB.api('/me?fields=email,first_name,last_name,name,link,picture', user => {
            resolve(user)
          })
        } else {
          reject()
        }
      }, {scope: 'public_profile, email'})
    })
  }

  authenticate() {
    return new Promise((resolve, reject) => {
      hello.on('auth.login', auth => {
        hello(auth.network).api('me').then(user => {
          resolve(user)
        })
      })
    })
  }
}
