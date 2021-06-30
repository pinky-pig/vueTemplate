<template>
<div :class="$style.controlGroupX" class="absolute">
  <slot></slot>
</div>
</template>

<script>
/**
 * 合并 ControlGroup
 * - ControlGroupX => ControlGroup => ControlGroupItem
 * - ControlGroupX 仅在样式方面合并, 功能|逻辑|状态 等方面依然由 ControlGroup+ControlGroupItem 自行控制
 * - 合并边框
 * - 水平|垂直 排列 + margin
 */
export default {
  name: '',
  data() {
    return {
    }
  },
  props: {
  },
  computed: {
  },
  watch: {
  },
  mounted() {
  },
  methods: {
  },
  components: {
  }
}
</script>

<style lang="postcss" module>
.controlGroupX {
}
</style>
