import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'

import './Loading.css'

class Loading extends Component {
  render() {
    const {center} = this.props
    const className = classnames('loading', {'loading--center': center})

    return (
      <div className="loading__container">
        <div className={className}></div>
      </div>
    )
  }
}

Loading.propTypes = {
  center: PropTypes.bool
}

export default Loading
