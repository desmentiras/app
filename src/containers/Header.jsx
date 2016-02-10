import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import './Header.css'

import {unsetUser} from 'actions/authActions'

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
        {user && this.renderProfile()}
      </header>
    )
  }

  renderProfile() {
    const {user} = this.props

    return (
      <div className="header__profile">
         <img className="header__avatar o-avatar" src={user.picture} />
         <span>{user.name} &middot; <button onClick={this.logout.bind(this)}>Sair</button></span>
      </div>
    )
  }

  logout() {
    const {dispatch} = this.props

    dispatch(unsetUser())

    FB.getLoginStatus(function(response) {
      if (response && response.status === 'connected') {
        console.log('here?');
        FB.logout(function(response) {
          FB.logout(() => {
            dispatch(unsetUser())
          })
        });
      }
    })
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
