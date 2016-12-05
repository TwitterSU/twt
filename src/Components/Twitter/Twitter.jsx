import React, { Component } from 'react'
import TweetList from '../Tweet/TweetList.jsx'
import TweetForm from '../Tweet/TweetForm.jsx'
import EditNode from '../Tweet/EditNode.jsx'
import CreateTweet from '../CreateTweet/CreateTweet'
import KinveyRequester from '../../Controllers/KinveyRequester'
import update from 'immutability-helper'
import NavigationBar from '../Navigation/NavigationBar'
import { logout } from '../../Models/User/logout.js'

export default class Twitter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tweets: [],
      editNode: null,
      loading: false,
      searchedTweets: [],
      open: false
    }
    this.tweetSubmitHandler = this.tweetSubmitHandler.bind(this)
    this.tweetEditHandler = this.tweetEditHandler.bind(this)
    this.addLikeHandler = this.addLikeHandler.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.search = this.search.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.addComment = this.addComment.bind(this)
    this.getTweets = this.getTweets.bind(this)
    this.getMyTweets = this.getMyTweets.bind(this)
  }

  search(e) {
    e.persist()


    if (e.target.parentNode.children[0].value) {
      let searched = this.state.searchedTweets.concat(this.state.tweets)


      searched = searched.filter(tweet => {
        return tweet.content.includes(e.target.parentNode.children[0].value)
      })
      this.setState({
        tweets: null,
        searchedTweets: searched
      })
    } else {
      this.getTweets()
    }
    e.target.parentNode.children[0].value = ''
  }


  tweetSubmitHandler(item, e) {
    e.preventDefault()
    e.stopPropagation()
    e.persist()
    let content = null
    if ((e.target.name == 'content') && e.keyCode == 13 && e.target.value.trim() != '') {
      content = e.target.value
    } else if (e.target.name == 'tweetForm') {
      content = e.target[0].value.trim()
    }
    if (content) {
      this.setState({
        loading: true
      })
      KinveyRequester.create('posts', content)
        .then((data) => {
          if (e.target.name == 'content') {
            e.target.value = ''
          }
          else {
            e.target[0].value = ''
          }
          this.setState({
            loading: false
          })
          if (this.state.tweets || this.state.tweets.length !== 0) {
            this.setState({
              tweets: [data, ...this.state.tweets]
            })
          } else {
            this.setState({
              tweets: [data]
            })
          }
          if (data.tags) {
            //this.tagsHandler({postId: data._id,tag: data.tags[0]})
          }
        })
        .catch((error) => console.log(error))
    }

  }
  tagsHandler(value) {
    // KinveyRequester.tagOperations(value.tag,{method:'GET', byId: '_id', qStr: '/?query=', })
    // .then((data,status)=> {
    //   console.log(data,status)
    // }).catch((error)=>{
    //   console.log('GetTags error: ' + error)
    // })
    //
    // KinveyRequester.addTags(null,value).then((data,status)=>{
    //   console.log(data,status)
    // }).catch((error)=>{
    //   console.log('AddTags error: ' + error)
    // })
  }
  tweetEditHandler(e) {
    e.persist()
    e.preventDefault()
    let index = e.target[0].id
    if (this.state.tweets[index].content != e.target[0].value) {
      let content = this.state.tweets[index]
      this.state.tweets[index].content = e.target[0].value
      KinveyRequester.update('posts', this.state.tweets[index]._id, content).then(data => {
        this.setState({
          editNode: null,
          tweets: update(this.state.tweets, { index: { $set: this.state.tweets[index].content } })
        })
      })
    } else {
      this.setState({
        editNode: null
      })
    }
  }

  addLikeHandler(e) {
    e.persist()
    let index = -1
    let id = e.target.value
    if (this.state.tweets) {
      this.state.tweets.map((tweet, i) => {
        if (id == tweet._id) {
          index = i
        }
      })
      this.state.tweets[index].likes++
      let content = this.state.tweets[index]
      // RETARDED KINVEY
      this.state.tweets[index].isLiked += (sessionStorage.getItem('username') + ', ')
      KinveyRequester.update('posts', id, content).then(data => {
        this.setState({
          tweets: update(this.state.tweets, { index: { $set: this.state.tweets[index].likes } })

        })
      })
    } else {
      this.state.searchedTweets.map((tweet, i) => {
        if (id == tweet._id) {
          index = i
        }
      })
      this.state.searchedTweets[index].likes++
      let content = this.state.searchedTweets[index]
      // RETARDED KINVEY
      this.state.searchedTweets[index].isLiked += (sessionStorage.getItem('username') + ', ')
      KinveyRequester.update('posts', id, content).then(data => {
        this.setState({
          searchedTweets: update(this.state.searchedTweets, { index: { $set: this.state.searchedTweets[index].likes } })

        })
      })
    }
  }

  handleDelete(nodeComponent, e) {
    e.preventDefault()
    e.stopPropagation()
    e.persist()

    KinveyRequester.remove('posts', nodeComponent.props.id).then((response, status) => {
      if (status == 'success') {
        console.log(status)

        KinveyRequester.crudByPostId(nodeComponent.props.id, { method: 'DELETE', collection: 'comments' })
          .then((response, status) => {
            console.log(status)
            let msg = `${nodeComponent.props.id} `
            console.dir(response)
            console.log(msg)
            let index = -1
            let id = nodeComponent.props.id
            if (this.state.tweets) {
              this.state.tweets.map((tweet, i) => {
                if (id == tweet._id) {
                  index = i
                }
              })
              let newState = update(this.state, {
                tweets: {
                  $splice: [[index, 1]]
                }
              })
              this.setState(newState)
            } else {
              this.state.searchedTweets.map((tweet, i) => {
                if (id == tweet._id) {
                  index = i
                }
              })
              let newState = update(this.state, {
                searchedTweets: {
                  $splice: [[index, 1]]
                }
              })
              this.setState(newState)
            }
          }).catch((error) => {
            console.dir(`${nodeComponent.props.id} ` + error)
          })
      }

      return response
    }).catch((error) => {
      console.log(error)
    })
  }

  handleEdit(item, e) {
    e.persist()
    console.log(item)
    console.log(e)
    console.log(this)
    KinveyRequester.crudByPostId(item.props.id, { method: 'GET', collection: 'posts' })
      .then((data, response) => {

        this.setState({
          editNode: true
        })
        return response
      }).catch((error) => console.log(error))
    // let index = -1
    // let id = e.target.value
    // this.state.tweets.find((item, i) => {
    //   if (item._id == id) {
    //     return index = i
    //   }
    // })
    //
    // this.setState({
    //   editNode: {[index]: this.state.tweets[index]}
    // })
  }

  addComment(item, e) {
    e.preventDefault()
    e.stopPropagation()
    if (e.keyCode == 13 && e.target.value.trim() != '') {
      e.persist()
      console.log(item.props.id)
      console.log(this)
      let id = item.props.id
      KinveyRequester.createComment(e, {
        text: e.target.value.trim(),
        postId: item.props.id
      }).then((data) => {
        let index = -1
        this.state.tweets.map((tweet, i) => {
          if (id == tweet._id) {
            return index = i
          }
        })
        if (this.state.tweets[index].comments) {
          let newState = update(this.state, {
            tweets: {
              [index]: { comments: { $push: [data] } }
            }
          })
          this.setState(newState)
        } else {
          let newState = update(this.state, {
            tweets: {
              [index]: { comments: { $set: [data] } }
            }
          })
          this.setState(newState)
        }
      }).catch(err => console.log(err))
      e.target.value = ''
    }
  }

  handleLogout(e) {
    logout()
  }

  render() {


    let actionNode
    if (this.state.editMode) {
      let key = Object.keys(this.state.editMode)[0]
      actionNode = (
        <form className='ui form' onSubmit={this.tweetEditHandler}>
          <div className='field'>
            <label>
              Edit tweet
            </label>
            <textarea name='content' id={key} defaultValue={this.state.editMode[key].content} />
          </div>
          <button className='ui button blue' type='submit'>
            Confirm
          </button>
        </form>
      )
    } else {
      actionNode = this.state.tweets ? <CreateTweet loading={this.state.loading} onsubmit={this.tweetSubmitHandler} /> :
        <button onClick={this.getTweets} className='ui button blue'>
          Back
        </button>
      return (

        <div>
          <NavigationBar onClick={this.handleLogout} mytweet={this.getMyTweets} search={this.search} />

          <div className='ui container centered'>
            <div className='ui segment'>
              {actionNode}
            </div>
            <div className='ui segment'>

              <TweetList
                className='ui four column grid'
                edit={this.handleEdit}
                delete={this.handleDelete}
                onkeyup={this.addComment}
                addLike={this.addLikeHandler}
                tweets={this.state.tweets ? this.state.tweets : this.state.searchedTweets}
                />
            </div>
          </div>
        </div>
      )
    }
  }
  getMyTweets(e) {
    console.log(this.state.tweets)
    let user = sessionStorage.getItem('username')
    console.log(user)
    let myTweets = this.state.tweets.filter(tweet => {
      return tweet.author == user
    })
    this.setState({
      tweets: null,
      searchedTweets: myTweets
    })
    console.log(myTweets)
  }
  getTweets() {

    KinveyRequester.retrieve('posts').then((tweets) => {
      this.setState({
        tweets: tweets.reverse()
      })
    }).catch((err) => console.log(err))
  }

  getComments(id) {
    return KinveyRequester.crudByPostId(id, { method: 'GET', collection: 'comments' })
  }

  componentDidMount() {
    KinveyRequester.retrieve('posts').then((tweets, status) => {
      console.log(tweets, status)
      tweets.reverse().map((t) => {
        return t.comments = []
      })
      this.setState({
        tweets: tweets
      })
      this.state.tweets.forEach((e) => {
        let index = -1

        this.state.tweets.map((tweet, i) => {
          if (tweet._id == e._id) {
            return index = i
          }
        })
        this.getComments(e._id).then(r => {
          if (r.length > 0) {
            let newState = update(this.state, {
              tweets: {
                [index]: { comments: { $push: r } }
              }
            })
            return this.setState(newState)
          }
        })
      })
    }).catch((err) => console.log(err))
  }

  componentWillReceiveProps() {
    alert('recived props')
  }
}
