import { browserHistory } from 'react-router'
export let checkLoggedIn = () => {
  let user = sessionStorage.getItem('username')
  if (!user) {
    browserHistory.push('/')
  } else {
    return true
  }
}
