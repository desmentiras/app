export function isFirstTime(callback) {
  return new Promise(resolve => {
    const user = new Stamplay.User().Model

    user.currentUser().then(() => {
      if (Object.keys(user.instance).length > 0) {
        if (user.get('firstTime')) {
          resolve(callback)
        }
      }
    })
  })
}
