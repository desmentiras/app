import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {pushState} from 'redux-router'
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
            <div className="three columns">
              <div className="header__presentation">
                <a
                  className="header__anchor a-prevent-default"
                  href="/">

                  <h5 className="header__logo">desmentiras</h5>
                </a>
              </div>
            </div>

            <div className="nine columns">
              <nav className="header__nav u-float-right">
                <ul className="header__nav-list [ o-list o-list--inline ]">
                  <li className="header__item o-list__item">
                    <a className="header__anchor" href="/">Home</a>
                  </li>
                  <li className="header__item o-list__item">
                    <a className="header__anchor" href="/entenda">Sexo</a>
                  </li>
                  <li className="header__item o-list__item">
                    {!user && this.renderAuth() || this.renderProfile()}
                  </li>
                  {user && (
                    <li className="header__item o-list__item">
                      <button
                        className="header__publish-button button-primary"
                        onClick={this.publish.bind(this)}>Publicar</button>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
    )
  }

  renderAuth() {
    return <button onClick={this.login.bind(this)}>Entrar com o Face</button>
  }

  renderProfile() {
    const {user} = this.props

    return (
      <div className="header__profile">
        <img
          className="header__avatar [ o-avatar o-avatar--inline ]"
          src={user.picture} />

        <span className="text-small">{user.reputation}</span>
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

  publish() {
    this.props.dispatch(pushState(null, '/publicar'))
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
