// https://github.com/samuelantonioli/vue-static/blob/master/index.js

function install(Vue, options = {}) {

  let {
    name = 'staticData',
    namespaced = false
  } = options

  // Use "static" as the default name for the function/object
  // Changeable using options.name
  let static_fn = name

  // Read more about option merge strategies in the official Vue.js docs
  if (typeof Vue.config.optionMergeStrategies[static_fn] !== 'function') {
    Vue.config.optionMergeStrategies[static_fn] =
      Vue.config.optionMergeStrategies.data
  }
  // Creates $static instance property if configured
  if (namespaced) {
    Vue.prototype.$static = {}
  }
  // Idea: Properties that are added in the very first part of the Vue lifecycle
  //       don't get Vue's reactivity
  Vue.mixin({
    beforeCreate: function () {
      const vue_static = this.$options[static_fn]
      const vue_static_destination = this.$static || this
      if (vue_static && typeof vue_static === 'function') {
        Object.assign(vue_static_destination, vue_static.apply(this))
      } else if (vue_static && typeof vue_static === 'object') {
        Object.assign(vue_static_destination, vue_static)
      }
    },
  })
}

export default install
