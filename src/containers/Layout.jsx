import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import Header from './Header'
import Footer from './Footer'

import {getUser} from 'actions/authActions'

class Layout extends Component {
  componentDidMount() {
    this.props.dispatch(getUser())
  }

  render() {
    const {children} = this.props

    return (
      <div className="layout">
        <Header />

        {children}
      </div>
    )
  }
}

Layout.propTypes = {
  user: PropTypes.object
}

const mapStateToProps = state => {
  const {user} = state.userReducer.user

  return {user}
}

export default connect(mapStateToProps)(Layout)
