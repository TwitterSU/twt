import $ from '../../../node_modules/jquery/dist/jquery.min'
import { api } from '../../api.js'
import { handlers } from '../../handlers.js'

export let logout = () => {
  $.ajax({
    method: 'POST',
    url: api.serviceBaseUrl + 'user/' + api.appID + '/_logout',
    headers: {'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')},
    success: handlers.logoutHandler,
    error: handlers.errorHandler
  })
}