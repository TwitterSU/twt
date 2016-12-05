import React, { Component } from 'react'

export default class Main extends Component {
  render () {
    return (
      <div>
      CECO
        {this.props.children}
      </div>
    )
  }
}
