import $ from '../../../node_modules/jquery/dist/jquery.min'
import { api } from '../../api.js'
import { handlers } from '../../handlers.js'

export let login = (e) => {
  e.preventDefault()
  let body = {
    username: e.target[0].value,
    password: e.target[1].value
  }
  $.ajax({
    method: 'POST',
    url: api.serviceBaseUrl + 'user/' + api.appID + '/login',
    headers: { 'Authorization': 'Basic ' + btoa(api.appID + ':' + api.appSecret) },
    data: body,
    success: handlers.successHandler,
    error: handlers.errorHandler

  })
}
