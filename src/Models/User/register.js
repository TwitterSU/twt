import $ from '../../../node_modules/jquery/dist/jquery.min'
import { api } from '../../api.js'
import { handlers } from '../../handlers.js'

export let register = (e) => {
  e.preventDefault()
  // this.checkForExistingUser(e.target[0].value)
  $.ajax({
    method: 'POST',
    url: api.serviceBaseUrl + 'user/' + api.appID + '/',
    data: {
      username: e.target[0].value,
      password: e.target[3].value,
      email: e.target[1].value,
      avatar: e.target[4].value
    },
    headers: { 'Authorization': 'Basic ' + btoa(api.appID + ':' + api.appSecret) },
    success: handlers.successHandler,
    error: handlers.errorHandler
  })
  // checkForExistingUser (checkUserName) {
  //   $.ajax({
  //     method: 'POST',
  //     url: api.serviceBaseUrl + 'rpc/' + api.appID + '/check-username-exists',
  //     headers: { 'Authorization': 'Basic ' + btoa(api.appID + ':' + api.appSecret) },
  //     data: {
  //       'username': checkUserName
  //     },
  //     success: handlers.successHandler,
  //     error: handlers.errorHandler
  //   })
  //   /*{
  //    "usernameExists": "false" or "true"
  //    }*/
  // }
}
