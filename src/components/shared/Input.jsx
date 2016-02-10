import React, {PropTypes} from 'react'
import Formsy from 'formsy-react'
import classnames from 'classnames'

export default React.createClass({
  propTypes: {
    placeholder: PropTypes.string
  },

  mixins: [Formsy.Mixin],

  changeValue(event) {
    this.setValue(event.currentTarget.value)
  },

  render() {
    const className = classnames('c-input', {'is-invalid': this.showError()})
    const errorMessage = this.getErrorMessage()

    const {placeholder} = this.props

    return (
      <div className="o-input-group">
        <input placeholder={placeholder} type="text" className={className} onChange={this.changeValue} value={this.getValue()} />
        <span className="t-hint is-invalid">{errorMessage}</span>
      </div>
    )
  }
})
