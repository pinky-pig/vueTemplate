<template>
<VueSimplebar data-simplebar-auto-hide="true" class="h-full" ref="vuesimplebar">
  <slot></slot>
</VueSimplebar>
</template>

<script>
import VueSimplebar from 'simplebar-vue'
import 'simplebar/dist/simplebar.min.css'

/**
 * ## lazy 渲染问题
 * 在使用该组件时, 可使用 v-if 控制是否 lazy 渲染 (尤其当父窗口初始状态为隐藏状态时)
 *
 */
export default {
  name: 'SimplebarWrapper',
  props: {
    // 自动重新计算 - 该 props 的变化可以自动使 simplebar recalculate
    autoRecalc: {}
  },
  watch: {
    // recalculate
    autoRecalc(v) {
      // console.log(v)
      if(v) {
        this.$nextTick(() => this.getInstance().recalculate())
        // setTimeout(() => this.getInstance().recalculate())
      }
    }
  },
  methods: {
    getInstance() {
      return this.$refs.vuesimplebar.SimpleBar
    },
    recalculate() {
      this.getInstance().recalculate()
    },
    backToTop() {
      this.getInstance().getScrollElement().scrollTop = 0
    }
  },
  beforeDestroy() {
    this.getInstance().unMount()
  },
  components: {
    VueSimplebar
  }
}
</script>

<style>
.simplebar-scrollbar::before {
  background-color: #999;
}
</style>
