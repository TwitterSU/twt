import React, { Component } from 'react'
import CommentList from '../Comments/CommentList.jsx'
import EditNode from '../Tweet/EditNode.jsx'
import AddComment from '../AddComment/AddComment.jsx'

export default class Tweet extends Component {
  render () {
    let ownerActions
    if (this.props.owner === sessionStorage.getItem('userId')) {
      ownerActions = (<div className='ui right'>
                        <button
                          className='ui right floated button blue'
                          style={{'fontSize': '0.75em'}}
                          onClick={this.props.delete.bind(null, this)}
                          value={this.props.id}>
                          Delete
                        </button>
                        <EditNode ref='modal' edit={this.props.edit.bind(null,this)} open={this.props.open} content={this.props.content} />
                       
                      </div>)
    }
    let style = {color: this.props.isLiked.split(', ')
      .includes(sessionStorage.getItem('username')) ? 'red' : 'grey'}

    return (
      <div className='event' id={this.props.id}>
        <div className='label'>
          <img src={this.props.url} />
        </div>
        <div className='content'>
          <div className='summary'>
            <a className='user'>
              {this.props.author}
            </a>
            <div className='date'>
              {new Date(this.props.postDate).toLocaleString()}
            </div>
            <div className='date'>
              {this.props.tags}
            </div>
            {ownerActions}
            <div className='content'>
              <h1>{this.props.content}</h1>
            </div>
          </div>
          <div className='meta'>
            <button
              className='like'
              onClick={this.props.addLike}
              value={this.props.id}
              disabled={this.props.isLiked.split(', ').includes(sessionStorage.getItem('username'))}>
              <i className='like icon' style={style}></i>
              {this.props.likes} Love it
            </button>
          </div>
          <div className='ui comments'>
            <h3 className='ui dividing header'>Comments</h3>
            <AddComment onkeyup={this.props.onkeyup.bind(null, this)} />
            <CommentList comments={this.props.comments} />
          </div>
          <hr />
        </div>
      </div>
    )
  }
  componentWillUnmount(){
    console.log('unmount')
  }

}
