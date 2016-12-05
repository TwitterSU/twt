import $ from '../node_modules/jquery/dist/jquery.min'
import { browserHistory } from 'react-router'

function errorHandler (response) {
  let errorMessage = JSON.stringify(response)
  if (response.readyState === 0) {
    errorMessage = 'Cannot connect due to network error.'
  }
  if (response.responseJSON && response.responseJSON.description) {
    errorMessage = response.responseJSON.description
  }
  $('.errorMsg').text('Wrong passsword or username')
  console.log(errorMessage)
  return errorMessage
}

function successHandler (response) {
 
  sessionStorage.setItem('authToken', response._kmd.authtoken)
  sessionStorage.setItem('userId', response._id)
  sessionStorage.setItem('username', response.username)
  sessionStorage.setItem('url', response.avatar)
  console.log('success')
  browserHistory.push('twitter')
  return { response}
}

function logoutHandler () {
  sessionStorage.clear()
  browserHistory.push('/')
}

export let handlers = {
  successHandler,
  errorHandler,
  logoutHandler
}
