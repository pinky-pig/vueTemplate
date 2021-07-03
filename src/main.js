/*
 * @Date: 2021-07-03 12:06:55
 * @LastEditors: wangwenbo
 * @LastEditTime: 2021-07-03 16:21:19
 * @FilePath: \vueTemplate\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import '@/setup'
import "./style/tailwind.css"
import "./style/font.css"

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
