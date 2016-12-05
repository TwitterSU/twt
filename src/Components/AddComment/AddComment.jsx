import React, { Component } from 'react'
export default class AddComment extends Component {

  render () {
    return (
      <div className='field'>
        <textarea
          draggable="false"
          rows="3"
          cols="40"
          style={{borderRadius: '5px',
            resize: 'none'}}
          name='content'
          placeholder='Add comment...'
          onKeyUp={this.props.onkeyup}
          >
        </textarea>
      </div>
    )
  }
}
