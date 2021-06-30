/**
 * usage:
 *  Vue.use(ComponentsRegisterPlugin, {
 *    contexts: [
 *      require.context('@/components/base', true, /\w+\.(vue|js)$/),
 *      require.context('@/components', false, /app-\w+\.(vue|js)$/),
 *    ]
 *  })
 */
export default {
  install(Vue, options) {
    let contexts = options.contexts || []
    contexts.forEach(context => {
      // console.log(context.keys())
      this.parseComponents(context).forEach(item => {
        Vue.component(item.name, item.component)
      })
    })
  },
  /**
   * componentName <=> component
   * @param {*} context webpack - require.context
   */
  parseComponents(context) {
    return context.keys().map(fileName => {
      let componentConfig = context(fileName)
      componentConfig = componentConfig.default || componentConfig
      let componentName = componentConfig.name || (
        fileName.replace(/^.+\//, '').replace(/\.\w+$/, '')
      )
      return {
        name: componentName,
        component: componentConfig
      }
    })
  }
}
