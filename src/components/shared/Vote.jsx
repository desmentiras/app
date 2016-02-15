import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import classnames from 'classnames'
import './Vote.css'

import {upvote, downvote, setVotesBalance, checkMyVote} from 'actions/postsActions'

// import {increaseReputation} from 'actions/reputationActions'

class Vote extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    const {votes, dispatch} = this.props

    dispatch(setVotesBalance({
      upvotes: votes.upvotes,
      downvotes: votes.downvotes
    }))
  }

  componentDidUpdate() {
    const {user, votes, dispatch} = this.props

    if (user) {
      dispatch(checkMyVote({
        userId: user.id,
        upvotes: votes.upvotes,
        downvotes: votes.downvotes
      }))
    }
  }

  render() {
    const {votes, myVote} = this.props

    const arrowUpClassName = classnames(
      'vote__arrow',
      'vote__arrow--up',
      {'is-inactive': myVote === 'downvote'}
    )

    const arrowDownClassName = classnames(
      'vote__arrow',
      'vote__arrow--down',
      {'is-inactive': myVote === 'upvote'}
    )

    return (
      <div className="vote">
        <div className={arrowUpClassName} onClick={this.upvote.bind(this)}></div>
        <span className="vote__balance">{votes.balance}</span>
        <div className={arrowDownClassName} onClick={this.downvote.bind(this)}></div>
      </div>
    )
  }

  upvote() {
    const {postId, user, votes, dispatch} = this.props

    if (!user) {
      alert('voce precisa estar logado')
      return
    }

    // dispatch(increaseReputationByUpvote({
    //   postId: postId,
    //   userId: user.id
    // }))

    dispatch(upvote({
      postId: postId,
      userId: user.id,
      upvotes: votes.upvotes,
      downvotes: votes.downvotes
    }))
  }

  downvote() {
    const {postId, user, votes, dispatch} = this.props

    if (!user) {
      alert('voce precisa estar logado')
      return
    }

    dispatch(downvote({
      postId: postId,
      userId: user.id,
      upvotes: votes.upvotes,
      downvotes: votes.downvotes
    }))
  }
}

Vote.propTypes = {
  postId: PropTypes.number.isRequired,

  votes: PropTypes.object,
  myVote: PropTypes.string,
  user: PropTypes.object
}

const mapStateToProps = state => {
  const {user} = state.userReducer.user
  const {votes, myVote} = state.postsReducer

  return {user, votes, myVote}
}

export default connect(mapStateToProps)(Vote)
