import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {pushState} from 'redux-router'
import './Civilization.css'

/* Utils */
import {isUserNotAuthenticated} from 'utils/auth'

/* Components */
import Playerbar from 'components/Playerbar'

/* Actions */
import {setPlayer} from 'actions/playerActions'
import {setCivilization} from 'actions/civilizationActions'

class Civilization extends Component {
  componentWillMount() {
    const {dispatch} = this.props

    isUserNotAuthenticated()
      .then(() => {
        dispatch(pushState(null, '/?authenticated=false'))
      })

    const user = new Stamplay.User().Model
    const civilizations = new Stamplay.Cobject('civilizations').Collection

    user.currentUser().then(() => {
      civilizations.equalTo('owner', user.get('id')).fetch().then(() => {
        const civilization = civilizations.instance[0]

        dispatch(setPlayer(user))
        dispatch(setCivilization(civilization))
      })
    })
  }

  render() {
    const {player, civilization} = this.props

    if (!civilization.instance) {
      return this.renderLoading()
    }

    return (
      <div className="civilization">
        <Playerbar player={player} civilization={civilization} />
      </div>
    )
  }

  renderLoading() {
    return <div>Carregando...</div>
  }
}

Civilization.propTypes = {
  user: PropTypes.object,
  player: PropTypes.object,
  civilization: PropTypes.object,
  dispatch: PropTypes.func
}

const mapStateToProps = state => {
  const {user} = state.authenticationReducer.login
  const {player} = state.playerReducer
  const {civilization} = state.civilizationReducer

  return {user, player, civilization}
}

export default connect(mapStateToProps)(Civilization)
