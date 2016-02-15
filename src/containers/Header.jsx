import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import './Header.css'

import {unsetUser, signInOrUp} from 'actions/authActions'

import Auth from 'utils/auth'

class Header extends Component {
  constructor() {
    super()

    this.auth = new Auth
  }

  render() {
    const {user} = this.props

    return (
      <header className="header">
        <div className="container">
          <div className="row">
            <div className="six columns">
              <div className="header__presentation">
                <a
                  className="header__anchor a-prevent-default"
                  href="/">

                  <h5 className="header__logo">desmentiras</h5>
                </a>
              </div>
            </div>

            <div className="six columns">
              <div className="header__content">
                {!user && this.renderAuth() || this.renderProfile()}
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  }

  renderAuth() {
    return (
      <div className="header__auth u-float-right">
        <span>Seja bem-vindo(a)!</span>
        <button onClick={this.login.bind(this)}>Entrar com o Face</button>
      </div>
    )
  }

  renderProfile() {
    const {user} = this.props

    return (
      <div className="header__profile u-float-right">
        <img
          className="header__avatar [ o-avatar o-avatar--inline ]"
          src={user.picture} />

        <span className="text-small">{user.reputation}</span>
        {/*<span><button onClick={this.logout.bind(this)}>Sair</button></span>*/}
      </div>
    )
  }

  login() {
    const {dispatch} = this.props

    this.auth.login()
      .then(user => dispatch(signInOrUp(user)), () => {
        // error
      })
  }

  logout() {
    const {dispatch} = this.props

    dispatch(unsetUser())

    // FB.getLoginStatus(function(response) {
    //   if (response && response.status === 'connected') {
    //     FB.logout(function(response) {
    //       FB.logout(() => {
    //         dispatch(unsetUser())
    //       })
    //     });
    //   }
    // })
  }
}

Header.propTypes = {
  user: PropTypes.object
}

const mapStateToProps = state => {
  const {user} = state.userReducer.user

  return {user}
}

export default connect(mapStateToProps)(Header)
