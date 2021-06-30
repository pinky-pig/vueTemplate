<template>
<div :class="$style.panel" class="border-4 border-primary overflow-hidden bg-white">
  <Stack>
    <StackItem v-show="title">
      <header class="p-2 bg-primary" >
        <span class="text-base text-white">{{title}}</span>
      </header>

      <section class="flex items-center justify-start h-12 px-4 border-b bg-white" v-show="hasToolbarSlot">
        <slot name="toolbar"></slot>
      </section>
    </StackItem>
    <StackItem flexible :scroll-y="!fillContent">
      <slot v-if="fillContent"></slot>
      <div class="p-4" v-else>
        <slot></slot>
      </div>
    </StackItem>
    <StackItem>
      <div class="flex items-center justify-end h-12 px-4 border-t bg-gray-100" v-show="hasFooterSlot">
        <slot name="footer"></slot>
      </div>
    </StackItem>
  </Stack>
</div>
</template>

<script>
export default {
  name: 'Panel',
  props: {
    title: String,
    // panel 默认支持 content 滚动, fillContent 指填满 content 区域, panel 不负责滚动 (且不设置 padding)
    fillContent: Boolean
  },
  computed: {
    hasToolbarSlot() {
      return this.$slots.toolbar
    },
    hasFooterSlot() {
      return this.$slots.footer
    }
  }
}
</script>

<style lang="postcss" module>
.panel {
}
</style>
