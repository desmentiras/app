import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import './News.css'

import Loading from 'components/shared/Loading'

import {fetchMostRecentPosts} from 'actions/postsActions'

class News extends Component {
  componentWillMount() {
    this.props.dispatch(fetchMostRecentPosts())
  }

  render() {
    return (
      <div className="news">
        <header className="news__header u-text-align-center">
          <span className="text-small">As últimas desmentiras cadastradas</span>
        </header>

        {this.renderNews()}
      </div>
    )
  }

  renderNews() {
    const {posts, isFetching} = this.props.recentPosts

    return (
      <div className="news__list o-list">
        {isFetching && <Loading />}
        {!isFetching && posts.map(post => {
          return (
            <a
              key={post.id}
              href={`/posts/${post.slug}`}
              className="news__list-item o-list-item u-text-decoration-none">
              <div className="news__item-wrapper">
                <div className="eight columns">
                  <h6 className="news__title">{post.title}</h6>
                  <small className="text-muted u-text-transform-uppercase">
                    <span className="text-small">Desmentindo</span> <strong className="text-small">{post.source.domain}</strong>
                  </small>
                </div>
                <div className="four columns">
                  <div className="news__details text-small u-text-align-right">
                    <span className="news__author-name text-small">Por <span className="text-small">{post.user.name}</span></span><br />
                    <span className="news__datetime text-small">{moment(post.createdAt).calendar()}</span>
                  </div>
                </div>
              </div>
            </a>
          )
        })}
      </div>
    )
  }
}

News.propTypes = {
  recentPosts: PropTypes.object
}

const mapStateToProps = state => {
  const {recentPosts} = state.postsReducer

  return {recentPosts}
}

export default connect(mapStateToProps)(News)
