import React, { Component } from 'react'
import Tweet from './Tweet.jsx'
import update from 'immutability-helper'
export default class TweetList extends Component {

  sortProps(){
    this.props.tweets.sort((a,b) => a._kmd.lmt - b._kmd.lmt)
  }
  render() {
    //console.log('render TweetList')
    //console.dir(this.props.tweets)
    let tweetNodes = <h1>Loading</h1>
    if (this.props.tweets.length != 0) {
      tweetNodes = this.props.tweets.map((tweet, i) => {
        return (<Tweet
          owner={tweet._acl.creator}
          postDate={tweet._kmd.lmt}
          url={tweet.avatarUrl}
          content={tweet.content}
          author={tweet.author}
          likes={tweet.likes}
          id={tweet._id}
          edit={this.props.edit}
          open={this.props.open}
          delete={this.props.delete}
          addLike={this.props.addLike}
          onkeyup={this.props.onkeyup}
          comments={tweet.comments}
          key={i}
          tags={tweet.tags}
          isLiked={tweet.isLiked}
          />)
      })
    }

    return (

      <div className='ui feed'>
        {tweetNodes}
      </div>
    )
  }
}
