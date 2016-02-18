import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import classnames from 'classnames'
import './Publish.css'

import {verifyLink} from 'actions/publishActions'

import Loading from '../components/shared/Loading'

class Publish extends Component {
  constructor() {
    super()

    this.state = {step: 1}
  }

  render() {
    const {step} = this.state

    return (
      <div className="publish container">
        {step === 1 && this.renderCriticizedNews() || this.renderPostDesigner()}
      </div>
    )
  }

  renderCriticizedNews() {
    const {link, urlContents} = this.props

    const inputClassName = classnames(
      'publish__link',
      {'is-invalid': !link.isValid && link.currentValue}
    )

    const isPublishLinkDisabled = urlContents.isFetching

    return (
      <div className="publish__criticized-news u-full-width">
        <h3>Qual o link da notícia que você está insatisfeito?</h3>

        <input
          ref="inputLink"
          className={inputClassName}
          type="text"
          onChange={this.verifyLink.bind(this)}
          autoFocus
          disabled={isPublishLinkDisabled} />

        <div className="publish__link-response">
          {urlContents.isFetching && <Loading />}
          {!link.isValid && link.currentValue && this.renderInvalidLinkMessage()}
          {urlContents.contents !== null && this.renderPreview()}
        </div>
      </div>
    )
  }

  renderPostDesigner() {
    return <div>bye</div>
  }

  renderInvalidLinkMessage() {
    return <div>A URL inserida é inválida :(</div>
  }

  renderPreview() {
    const {title, description, cover, domain, url} = this.props.urlContents.contents

    const publishLinkPreviewClassName = classnames(
      'publish__link-preview',
      {'has-cover': cover}
    )

    const publishLinkPreviewContentParagraphClassName = classnames(
      'text-silent',
      {'text-silent--dark': !cover},
      {'text-silent--light': cover}
    )

    return (
      <div className="publish__link-preview-container">
        <div className={publishLinkPreviewClassName}>
          {cover && (
            <div className="publish__link-preview-cover">
              <div className="publish__link-preview-overlay"></div>
              <img className="publish__link-preview-asset" src={cover} />
            </div>
          )}

          <div className="publish__link-preview-content">
            <h5 className="text-big">{title}</h5>
            <p className={publishLinkPreviewContentParagraphClassName}>{description}</p>
            <small><a href={url} target="_blank">{domain}</a></small>
          </div>
        </div>

        <button className="button-primary c-button--block">Avançar</button>
      </div>
    )
  }

  verifyLink() {
    const value = this.refs.inputLink.value
    this.props.dispatch(verifyLink(value))
  }
}

Publish.propTypes = {
  link: PropTypes.object,
  urlContents: PropTypes.object
}

const mapStateToProps = state => {
  const {link, urlContents} = state.publishReducer

  return {link, urlContents}
}

export default connect(mapStateToProps)(Publish)
