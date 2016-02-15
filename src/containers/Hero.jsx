import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import './Home.css'

/* Containers */
import Header from './Header'

/* Utils */
import Auth from 'utils/auth'

/* Actions */
import {signInOrUp} from 'actions/authActions'

class Home extends Component {
  constructor() {
    super()

    this.auth = new Auth
    this.state = {auth: false}
  }

  render() {
    const {user} = this.props

    return (
      <div className="page">
        <Header />

        <div className="home o-table">
          <div className="hero o-table-cell u-align-middle">
            <h2 className="font-regular">
              Está na hora de desmentir um pouco a internet.
            </h2>

            {user && this.renderPublishUnlie() || this.renderAuthenticationButton()}
          </div>
        </div>
      </div>
    )
  }

  renderAuthenticationButton() {
    return <button onClick={this.authenticate.bind(this)}>Autenticar com o face</button>
  }

  renderPublishUnlie() {
    return <button onClick={this.publish.bind(this)}>Publicar desmentira</button>
  }

  authenticate() {
    const {dispatch} = this.props

    this.auth.login()
      .then(user => {
        dispatch(signInOrUp(user))
      }, () => {
        // error
      })
  }

  publish() {

  }
}

Home.propTypes = {
  user: PropTypes.object
}

const mapStateToProps = state => {
  const {user} = state.userReducer.user

  return {user}
}

export default connect(mapStateToProps)(Home)
