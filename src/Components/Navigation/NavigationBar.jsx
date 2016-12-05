import React, { Component } from 'react'
import './Nav.css'
export default class NavigationBar extends Component {

  render() {

    return (


      <div className='ui secondary  menu'>
        <a className='item'>Profile</a>
        <a className='item' onClick={this.props.mytweet}>MyTweets</a>
        <a className='item'>Friends</a>

        <div className='ui container centered'>
          <div className='item'>
            <div className='ui icon input'>
              <input type='text' placeholder='Search by hashtag...' />
              <a className='ui item' onClick={this.props.search}>Search</a>
            </div>
          </div>
          <p className='ui item'>{'Hello ' + sessionStorage.getItem('username') + '!'}</p>
        </div>
        <a className='ui item' onClick={this.props.onClick}>Logout</a>

      </div>


    )
  }

}
