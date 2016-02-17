import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import './Home.css'

/* Containers */
import News from './News'

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
    return (
      <div className="home">
        <div className="home__content container">
          <div className="home__presentation u-text-align-center">
            <h2>Está na hora de fazer da internet um lugar melhor</h2>
            <p className="home__sub-title text-medium">
              Vamos juntos desmentir notícias falsas ou tendenciosas para criar
              cidadãos mais inteligentes
            </p>
          </div>

          <News />
        </div>
        <div className="home__overlay"></div>
        <div className="home__hero"></div>
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
  const {user}  = state.userReducer.user

  return {user}
}

export default connect(mapStateToProps)(Home)
