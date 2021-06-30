import Cookies from 'js-cookie'

const TOKEN_KEY = 'Token-template'

export function getToken() {
  return Cookies.get(TOKEN_KEY)
}

export function setToken(token) {
  // fix: 存储 undefined 的情况
  return Cookies.set(TOKEN_KEY, token || '')
}

export function removeToken() {
  return Cookies.remove(TOKEN_KEY)
}
