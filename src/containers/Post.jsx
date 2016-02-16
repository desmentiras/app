import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import './Post.css'

import {fetchPostById} from 'actions/postsActions'

import Vote from 'components/shared/Vote'
import Loading from 'components/shared/Loading'

class Post extends Component {
  constructor() {
    super()
  }

  componentWillMount() {
    const {dispatch, routeParams} = this.props

    const id = routeParams.postSlug.substr(0, routeParams.postSlug.indexOf('-'))

    dispatch(fetchPostById(id))
  }

  render() {
    const {post} = this.props.postById

    if (!post) { return <Loading /> }

    return (
      <div className="post o-table">
        {this.renderPostLink()}

        <div className="post__container">
          <div className="post__conscious o-table-cell">
            <header className="post__conscious-header">
              <small className="text-small">... entretanto...</small>
            </header>

            <div className="post__body">
              <div className="post__voting">
                <Vote upvotes={post.upvotes} downvotes={post.downvotes} postId={post.id} />
              </div>

              <div className="post__content">
                <h3 className="post__title">{post.title}</h3>
                <p className="text-paragraph">
                  A galera do bolsonaro tá inventando de mais nos últimos tempos.
                  Os inclusos acham que a Dilma vai pra SP pra encontrar com o Lula, kkkk vm ri
                </p>
                <p className="text-paragraph">
                  A galera do bolsonaro tá inventando de mais nos últimos tempos.
                  Os inclusos acham que a Dilma vai pra SP pra encontrar com o Lula, kkkk vm ri
                  A galera do bolsonaro tá inventando de mais nos últimos tempos.
                  Os inclusos acham que a Dilma vai pra SP pra encontrar com o Lula, kkkk vm ri
                  A galera do bolsonaro tá inventando de mais nos últimos tempos.
                  Os inclusos acham que a Dilma vai pra SP pra encontrar com o Lula, kkkk vm ri
                </p>
                <p className="text-paragraph">
                  A galera do bolsonaro tá inventando de mais nos últimos tempos.
                  Os inclusos acham que a Dilma vai pra SP pra encontrar com o Lula, kkkk vm ri
                </p>
                <p className="text-paragraph">
                  A galera do bolsonaro tá inventando de mais nos últimos tempos.
                  Os inclusos acham que a Dilma vai pra SP pra encontrar com o Lula, kkkk vm ri
                </p>
                <p className="text-paragraph">
                  A galera do bolsonaro tá inventando de mais nos últimos tempos.
                  Os inclusos acham que a Dilma vai pra SP pra encontrar com o Lula, kkkk vm ri
                  A galera do bolsonaro tá inventando de mais nos últimos tempos.
                  Os inclusos acham que a Dilma vai pra SP pra encontrar com o Lula, kkkk vm ri
                  A galera do bolsonaro tá inventando de mais nos últimos tempos.
                  Os inclusos acham que a Dilma vai pra SP pra encontrar com o Lula, kkkk vm ri
                </p>
                <p className="text-paragraph">
                  A galera do bolsonaro tá inventando de mais nos últimos tempos.
                  Os inclusos acham que a Dilma vai pra SP pra encontrar com o Lula, kkkk vm ri
                </p>
              </div>
            </div>

            {this.renderPostAuthor()}
          </div>
        </div>
      </div>
    )
  }

  renderPostLink() {
    const {source} = this.props.postById.post

    return (
      <div className="post__link o-table-cell u-align-top">
        <a className="post__link-url" href={source.url} target="_blank"></a>

        {source.cover && this.renderCover()}

        <div className="container">
          <div className="post__link-content">
            <div className="post__detail">
              <small className="post__detail-source text-small">
                De acordo com o site {source.domain}:
              </small>
            </div>
            <h5 className="text-title-principal">{source.title}</h5>
            <div className="post__detail">
              <em className="post__link-description text-cite">{source.description}</em>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderCover() {
    const {cover} = this.props.postById.post.source

    return (
      <div className="post__cover">
        <div className="post__cover-shadow"></div>
        <img className="post__cover-asset" src={cover} />
      </div>
    )
  }

  renderPostAuthor() {
    const {user} = this.props.postById.post

    return (
      <div className="post__author">
        <div className="post__widget u-float-left">
          <div className="post__widget-author">
            <img
              className="post__author-avatar [ o-avatar o-avatar--margin-right o-avatar--big ] u-float-left"
              src={user.picture}
              alt={user.name} />

            <section className="post__author-details u-float-left">
              <span className="post__author-name">{user.name}</span>
              <div className="post__author-rep">
                <div className="o-icon-rep"></div>
                <span className="post__author-rep u-position-absolute">{user.reputation}</span>
              </div>
            </section>
          </div>
        </div>
      </div>
    )
  }
}

Post.propTypes = {
  user: PropTypes.object,
  postById: PropTypes.object
}

const mapStateToProps = state => {
  const {user} = state.userReducer.user
  const {postById} = state.postsReducer

  return {user, postById}
}

export default connect(mapStateToProps)(Post)
