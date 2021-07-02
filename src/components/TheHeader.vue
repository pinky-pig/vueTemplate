<!--
 * @Date: 2021-07-01 13:53:51
 * @LastEditors: wangwenbo
 * @LastEditTime: 2021-07-01 15:51:05
 * @FilePath: \vuetemplate\src\components\TheHeader.vue
-->
<template>
<header
  :class="$style.theHeader"
  class="bg-primary
    h-20 flex items-center px-8 sm:px-16 lg:px-48 justify-between"
>
  <!-- <Logo></Logo> -->
  <!-- <Menu></Menu> -->

  <!-- 注册/登录 button
  <div v-show="!authenticated" class="py-1 px-2 border border-gray-200 text-gray-300 text-sm rounded-md">
    <router-link to="/register">注册</router-link>
    <span>/</span>
    <a href="javascript:void(0)" @click="$kc.login()">登录</a>
  </div> -->

  <!-- <TheHeaderProfile v-if="authenticated"></TheHeaderProfile> -->
</header>
</template>

<script>
// import {mapState} from 'vuex'
// import Logo from './Logo'
// import Menu from './Menu'

export default {
  computed: {
  },
  components: {
  }
}
</script>

<style lang="postcss" module>
.theHeader {
}
</style>
