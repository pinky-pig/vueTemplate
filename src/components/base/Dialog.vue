<template>
<el-dialog
  v-bind="$attrs_"
  v-on="$listeners"
  :class="[$style.dialog, {[$style.centered]: centered}]">

  <slot></slot>

</el-dialog>
</template>

<script>
/**
 * 定制 element dialog 组件
 */
const defaultAttrs = {
  // top: 0,
  // width: '50%',
  width: 'auto',
  appendToBody: true,
  destroyOnClose: true
}

export default {
  props: {
    // 居中模式, 窗口尺寸的 2 种控制方法:
    // 1. 使用绝对单位 px 设置窗口内容尺寸, 由窗口内容决定窗口尺寸
    // 2. 使用相对(视口)单位 (vw/vh) 控制窗口内容尺寸 (同样的, 内容尺寸决定了窗口尺寸)
    centered: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    $attrs_() {
      return Object.assign({}, defaultAttrs, this.$attrs)
    },

  }
}
</script>

<style lang="postcss" module>
.dialog {
  :global {
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      padding: 0;
    }
  }
}

.dialog.centered {
  @apply w-full h-full flex items-center justify-center;
  :global {
    .el-dialog {
      margin: 0 !important;
    }
  }
}
</style>
