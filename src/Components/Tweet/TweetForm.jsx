import React, { Component } from 'react'
import TweetList from './TweetList'
export default class TweetForm extends Component {
  render () {
    return (
      <div className='ui segment'>
        <TweetList
          className='ui four column grid'
          edit={this.props.handleEdit}
          delete={this.props.handleDelete}
          onkeyup={this.props.addComment}
          addLike={this.props.addLikeHandler}
          tweets={this.props.tweets ? this.props.tweets : this.props.searchedTweets} />
      </div>
    )
  }
}
