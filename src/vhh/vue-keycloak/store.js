import {x} from 'vhh/utils/ensure'

const initialState = (keycloak = {}) => {
  const defaultStats = {
    authenticated: false,
    token: null,
    tokenParsed: null,
    subject: null,
    idToken: null,
    idTokenParsed: null,
    realmAccess: null,
    resourceAccess: null,
    refreshToken: null,
    refreshTokenParsed: null,
  }
  let states = Object.keys(defaultStats).reduce((acc, cur) => {
    let value = keycloak[cur]
    if(defaultStats.hasOwnProperty(cur) && value !== undefined) {
      acc[cur] = value
    }
    return acc
  }, Object.assign({}, defaultStats))
  return states
}

export const create = function(options) {

  const {
    keycloak = x`keycloak`,
    namespaced = false
  } = options

  return {
    namespaced: namespaced,
    state: () => initialState(keycloak),
    mutations: {
      updateKeycloakStates(state) {
        Object.assign(state, initialState(keycloak))
      }
    },
    actions: {
    },
    getters: {
      kc() {
        return keycloak
      },
      username(state) {
        return state.tokenParsed.preferred_username
      },
      name(state) {
        return state.tokenParsed.name
      },
      authenticated(state) {
        return state.authenticated
      }
    }
  }
}
