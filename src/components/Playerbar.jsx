import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import './Playerbar.css'

class Playerbar extends Component {
  render() {
    const {player, civilization} = this.props

    return (
      <div className="playerbar">
        <h1>{player.get('displayName')}</h1>
        <h2>Nível da civilização: {civilization.get('level')}</h2>
        <h2>Ouro da civilização: {civilization.get('gold')}</h2>
        <h2>HP: {civilization.get('current_hp')}/{civilization.get('total_hp')}</h2>
      </div>
    )
  }
}

Playerbar.propTypes = {
  player: PropTypes.object.isRequired,
  civilization: PropTypes.object.isRequired,

  dispatch: PropTypes.func
}

const mapStateToProps = state => {
  const {player} = state.playerReducer
  const {civilization} = state.civilizationReducer

  return {player, civilization}
}

export default connect(mapStateToProps)(Playerbar)
