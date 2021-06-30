<template>
<Stack>
  <StackItem>
    <slot name="header"></slot>
  </StackItem>
  <StackItem flexible>
    <slot></slot>
  </StackItem>
  <StackItem>
    <slot name="footer"></slot>
  </StackItem>
</Stack>
</template>

<script>
/**
 * 移动端页面布局, 上中下
 */
export default {
}
</script>
