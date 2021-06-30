import SimpleLoader from './SimpleLoader'

const registeredTasks = []

/**
 * 用于 vue app 挂载前 (路由生效前) 需要加载异步数据的场景
 * ⚠ 只要 new Vue({ ... }) 中传入了 router, 就会初始化路由 (beforeEach 就会起作用), 无论是否已经 $mount
 * TODO:
 * - error handling
 */
export default {
  install: function (Vue, options = {}) {

    const {
      backgroundColor,
      loader = SimpleLoader,
      tasks = [],
      mountPoint = '#app',
      ready = () => {}
    } = options

    // loading
    new Vue({
      render: h => h(loader, {props: { backgroundColor }})
    }).$mount(mountPoint)

    Promise.all([...tasks, ...registeredTasks]).then(() => {
      ready()
    })
  }
}

export const registerTask = (promise) => {
  registeredTasks.push(promise)
}
