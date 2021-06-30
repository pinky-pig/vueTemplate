import Keycloak from 'keycloak-js'
import log from 'loglevel'
import {x} from 'vhh/utils/ensure'
import {create as createStoreModule} from './store'

let installed = false

/**
 * 参考: https://github.com/dsb-norge/vue-keycloak-js
 *
 * TODO:
 * - refresh token (onAuthSuccess) & token expiration time
 * - vuex integration
 */
export default {
  install: function (Vue, options = {}) {
    if (installed) return
    installed = true

    const defaultOptions = {
      config: '/keycloak.json',
      // check-sso / login-required
      init: {
        onLoad: 'check-sso',

        // !! Modern Browsers with Tracking Protection
        // silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
      },
      namespace: 'auth',
      refreshTokenMinValidity: 100,

      // callback
      onReady: (keycloak) => {}
    }

    options = Object.assign({}, defaultOptions, options)
    // log.debug('vue-keycloak-plugin#options: ', options)

    const {
      store = x`store`,
      router = x`router`,
      refreshTokenMinValidity,
      axiosRequest,
      namespace
    } = options

    /*
     * init keycloak
     */
    let keycloak = new Keycloak(options.config)

    // vue 组件内: 通过 this.$kc 访问 session data | keycloak methods
    Object.defineProperty(Vue.prototype, '$kc', {
      get: () => keycloak
    })

    /*
     * keycloak 状态回调, 更新 session 相关数据
     */
    keycloak.onReady = function (authenticated) {
      store.commit('updateKeycloakStates')
      // watch.ready = true
      typeof options.onReady === 'function' && options.onReady(keycloak)
    }

    keycloak.onAuthRefreshSuccess = function () {
      store.commit('updateKeycloakStates')
    }

    keycloak.onAuthRefreshError = function () {
      store.commit('updateKeycloakStates')
      typeof options.onAuthRefreshError === 'function' && options.onAuthRefreshError(keycloak)
    }

    // initKeycloak
    const initKeycloak = () => {
      return keycloak.init(options.init).then(function(authenticated) {
        log.debug('keycloak initialized!', { authenticated })
      }).catch(e => {
        // TODO: keycloak init error handling
        log.error('Failed to initialize keycloak!', e)
      })
    }
    initKeycloak()

    /*
     * vuex
     */
    store.registerModule(namespace, createStoreModule({
      keycloak
    }))

    /*
     * axiosRequest
     */
    if(axiosRequest) {
      axiosRequest.interceptors.request.use(
        async (config) => {
          // 请求携带 token & refresh token
          if(keycloak.authenticated) {
            const token = await keycloak.updateToken(refreshTokenMinValidity)

            config.headers = config.headers || {}
            config.headers['Authorization'] = `Bearer ${token}`
          }
          return config
        },
        (error) => Promise.reject(error)
      )
    }

    /*
     * router interceptor
     */
    router.beforeEach((to, from, next) => {

      const meta = to.meta || {}
      const anonymous = !!meta.anonymous

      log.debug('router#beforeEach', to.path, {
        anonymous: anonymous,
        authenticated: keycloak.authenticated
      })
      // alert(`${keycloak.authenticated}--${watch.ready}`)
      // authentication required
      if(!anonymous && !keycloak.authenticated) {
        keycloak.login()
        // next(false)
      } else {
        // 每次路由刷新 token
        keycloak.authenticated && keycloak.updateToken(refreshTokenMinValidity)

        next()
      }
    })
  }
}
