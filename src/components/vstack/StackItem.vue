<template>
<div
  :class="[
    $style.stackItem,
    {[$style.flexible]: flexible},
    {[$style.scroll]: scroll},
    {[$style.scrollX]: scrollX},
    {[$style.scrollY]: scrollY},
    {[$style.horizontal]: $parent.horizontal_}
  ]"
>
  <slot></slot>
</div>
</template>

<script>
export default {
  name: 'StackItem',
  data() {
    return {
    }
  },
  props: {
    flexible: Boolean,
    scroll: Boolean,
    scrollX: Boolean,
    scrollY: Boolean
  }
}
</script>

<style lang="css" module>
.stackItem {
  box-sizing: border-box;
  flex: 0 0 auto;
  overflow: hidden;
}
.flexible {
  /* flex: 1; */
  flex: 1 1 0%;
  /* height: 0; */
}
.scroll {
  /* make sure flex shrink is 1 */
  overflow: auto;
}
.scrollX {
  overflow-x: auto;
}
.scrollY {
  overflow-y: auto;
}
/* horizontal */
.horizontal {
  height: 100%;
}
</style>
