import $ from '../../node_modules/jquery/dist/jquery.min.js'
import { api } from '../api.js'
const url = api.serviceBaseUrl + 'appdata/' + api.appID + '/'
const authHeaders = {'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')}
export let create = (e) => {

  e.preventDefault()
  let post = {
    content: e.target[0].value,
    tags: [],
    author: sessionStorage.getItem('username')
  }
  function findHashtags (searchText) {
    let regexp = /\B#\w\w+\b/g
    let result = searchText.match(regexp)
    if (result) {
      result.map(function (s) {
        s.trim()
      })
      return result
    } else {
      return false
    }
  }
  post.tags.push(...e.target[1].value.split(/\s{0,},\s{0,}/).filter(e => e))
  console.log(post.tags)
  let hashTags = findHashtags(e.target[0].value)
  if (hashTags) {
    hashTags.forEach(h => {
      post.tags.push(h)
    })
  }

  e.target[0].value = ''
  e.target[1].value = ''
  return $.ajax({
    method: 'POST',
    url: url + 'posts',
    headers: authHeaders,
    data: post,
    success: (res, status) => {
      console.log(this)
      if (res) {
        console.log(e)
        return res
      }
      console.log(status)
    }
  })
}
