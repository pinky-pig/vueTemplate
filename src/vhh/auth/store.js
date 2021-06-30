import jwtDecode from 'jwt-decode'

const KEY_TOKEN = 'token'

// TODO: custom parser
// const parseToken = function(token) {
//   return JSON.parse(token)
// }

// for testing
// localStorage.setItem(KEY_TOKEN, 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0dXNlcjIiLCJpYXQiOjE2MDY0NDkyNzIsImV4cCI6MTYwNjQ1Mjg3MiwidWlkIjoyLCJuaWNrbmFtZSI6Iua1i-ivleeUqOaItzIiLCJhdXRob3JpdGllcyI6IlJPTEVfVVNFUiJ9.jEvsAQyQMe09PF2rrgirThyNo2nWD1Ous6sz1W9mxLmgLhWz47-RNQswMGj4woznJpsIHtY9-i4cNGlSyrc5nQ')
// localStorage.removeItem(KEY_TOKEN)

const initialState = () => {
  return {
    user: null,
    token: null
  }
}

export const create = function(options) {

  const {
    loginAction,
    logoutAction
  } = options

  return {
    namespaced: true,
    state: () => initialState(),
    mutations: {
      setToken(state, token) {
        state.token = token

        if(token) {
          // 解析 token
          state.user = jwtDecode(token)
          localStorage.setItem(KEY_TOKEN, token)
        } else {
          state.user = null
          localStorage.removeItem(KEY_TOKEN)
        }
      },
      resetState(state) {
        Object.assign(state, initialState())
      }
    },
    actions: {
      // 加载客户端 token, 在应用初始化时由 auth-plugin 调用
      loadToken({commit}) {
        commit('setToken', localStorage.getItem(KEY_TOKEN))
      },
      login: loginAction,
      logout: logoutAction
    },
    getters: {
    }
  }
}
