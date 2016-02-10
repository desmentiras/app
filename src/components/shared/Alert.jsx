import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'

class Alert extends Component {
  render() {
    const {error, warning} = this.props
    const className
      = classnames(
        'c-alert',
        {'c-alert--warning': warning, 'c-alert--error': error}
      )

    return (
      <div className={className}>{this.props.children}</div>
    )
  }
}

Alert.propTypes = {
  children: PropTypes.node.isRequired,

  error: PropTypes.bool,
  warning: PropTypes.bool
}

export default Alert
