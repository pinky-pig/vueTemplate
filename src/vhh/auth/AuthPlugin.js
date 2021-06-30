import {x} from 'vhh/utils/ensure'
import {create as createStoreModule} from './store'

const DEFAULTS = {
  namespace: 'auth',
  loginPath: '/login',
  homePath: '/',
  // 登录请求, 返回值为 Promise, resolve 的值为 jwt token
  // TODO: 支持验证码
  login: async (username, password, options) => {
    // 默认实现是取首个 request
    const request = options.requests[0]
    try {
      const {data} = await request.post(
        'login',
        { username, password },
        {
          // 跳过拦截器中的 401 检查, 自己处理 (loginSuccessHandler)
          skipUnauthorizedHandling: true
        }
      )
      return data
    } catch (e) {
      if(e.response && e.response.status === 401) {
        options.loginFailureHandler(options, e.response)
        // 终止 store#action 后续的逻辑
        return new Promise(() => {})
      }
      throw e
    }
  },
  // logout, 空实现, 纯前端, 清 token 清状态, 可以扩展发送请求通知服务端
  logout: () => Promise.resolve(),
  // 请求实例, 通常是 axios instance, 支持数组
  requests: [],
  // login handler, 默认跳转到 homePath 页面
  // TODO: 跳转到登录之前访问的路径, 通过 url 中 redirect 查询参数标识
  loginSuccessHandler: ({router, homePath}) => {
    router.push(homePath).catch(e => {})
  },
  // 登录失败处理逻辑
  loginFailureHandler: (options, response) => {
    console.log('loginFailureHandler => ', response)
    alert('用户名或密码错误！')
  },
  // logout handler, 默认跳转到 login 页面
  logoutSuccessHandler: ({router, loginPath}) => {
    router.push(loginPath).catch(e => {})
  },
  // 请求返回 401/403 时的处理逻辑, 可以提示用户消息，默认直接 logout
  requestUnauthenorizedHandler: (options) => {
    let {
      store,
      namespace,
    } = options
    store.dispatch(`${namespace}/logout`)
  },
  // 请求携带 token
  withToken: (options) => {
    let {
      store,
      namespace,
      requests
    } = options

    requests.forEach((request) => {
      request.interceptors.request.use(
        (config) => {
          config.headers = config.headers || {}
          // 每次请求获取 token
          const token = store.state[options.namespace].token
          if(token) {
            config.headers['Authorization'] = `Bearer ${token}`
          }
          return config
        },
        (error) => Promise.reject(error)
      )
    })
  },
  // 为 request 绑定认证/授权失败 的处理逻辑, 默认处理 401, 403
  // !注: 同样是 401, 如果是 /login endpoint, 需要由 loginFailureHandler 处理
  onRequestUnauthenorized: (options) => {
    let {
      requests
    } = options

    requests.forEach((request) => {
      request.interceptors.response.use(
        (response) => response,
        (error) => {
          const response = error.response
          // skipUnauthorizedHandling - 自行处理
          if(response && !response.config.skipUnauthorizedHandling) {
            const httpStatusCode = response.status
            // TODO: 403 处理方式应该和 401 有差别
            if(httpStatusCode === 401 || httpStatusCode === 403) {
              options.requestUnauthenorizedHandler(options)
              // pending promise, terminating the promise chain
              return new Promise(() => {})
            }
          }
          return Promise.reject(error)
        }
      )
    })
  },
  // 是否路由可匿名访问
  isAnonymous: (route) => {
    return route.meta && route.meta.anonymous
  }
}

const install = function(Vue, options = {}) {

  options = Object.assign({}, DEFAULTS, options)

  let {
    namespace,
    store = x`store`,
    router = x`router`,
    requests,
    login,
    logout,
    loginPath,
    homePath,
    loginSuccessHandler,
    logoutSuccessHandler,
    withToken,
    onRequestUnauthenorized,
    isAnonymous
  } = options

  /**
   * store module
   */
  // 构造 loginAction/logoutAction, 供 vuex 使用
  // TODO: 支持验证码
  const loginAction = async function({commit}, { username, password }) {
    const token = await login(username, password, options)
    commit('setToken', token)
    loginSuccessHandler(options)
  }
  const logoutAction = async function({commit}) {
    await logout()
    commit('setToken', null)
    commit('resetState')
  }

  store.registerModule(namespace, createStoreModule({
    loginAction,
    logoutAction
  }))
  // 加载 token
  store.dispatch(`${namespace}/loadToken`)

  /**
   * requests 处理
   */
  // requests 统一处理为 数组 格式
  if(!Array.isArray(requests)) {
    options.requests = [requests]
  }
  // 携带 token
  withToken(options)
  // 绑定认证/授权失败 的处理逻辑
  onRequestUnauthenorized(options)

  // token 清除后
  store.watch(state => {
    return state.auth.token
  }, (token) => {
    // 清除 token 后跳转到 login page
    if(!token) {
      logoutSuccessHandler(options)
    }
  })

  const isLoginRoute = function(route){
    return route.path === loginPath
  }

  const getToken = (options) => {
    return options.store.state[options.namespace].token
  }

  /**
   * 注册拦截器
   */
  router.beforeEach((to, from, next) => {
    let token = getToken(options)
    // 有效 token
    if(token) {
      // 有效 token, 且访问 login page, 禁止跳转, 直接返回首页
      if(isLoginRoute(to)) {
        next(homePath)
      // 有效 token, 且访问的不是 login page, 允许访问
      } else {
        next()
      }
    // 无有效 token, 且访问 匿名页面 或 login page, 放行
    } else if(isAnonymous(to) || isLoginRoute(to)) {
      next()
    } else {
      // 无有效 token, 且访问的不是 匿名页面 或 login page, 跳转到登录页面
      next(loginPath)
    }
  })
}

export const AuthPlugin = {
  install
}
