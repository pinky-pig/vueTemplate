/*
 * @Date: 2021-05-26 11:17:34
 * @LastEditors: wangwenbo
 * @LastEditTime: 2021-07-05 09:32:26
 * @FilePath: \vuetemplate\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import { createRouterLayout } from 'vue-router-layout'

Vue.use(VueRouter)

// 解决导航栏或者底部导航tabBar中的vue-router在3.0版本以上频繁点击菜单报错的问题。
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const RouterLayout = createRouterLayout(layout => {
  return require('@/components/router-layouts/' + layout + '.vue').default
})


const routes = [
  {
    path: '/',
    name: 'Home',
    component: RouterLayout,
    children: [
      {
        path: '/',
        component: () => import('@/views/Three')
      },
      {
        path: '/Home',
        component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
      },
      {
        path: '/pano',
        component: () => import(/* webpackChunkName: "about" */ '../views/pano/Pano.vue')
      },
      {
        path: '/editor',
        component: () => import(/* webpackChunkName: "about" */ '../views/Editor.vue')
      },
      {
        path: '/intro',
        component: () => import(/* webpackChunkName: "about" */ '../views/Intro.vue')
      },

    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
