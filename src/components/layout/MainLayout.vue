<!--
 * @Date: 2021-06-30 15:35:24
 * @LastEditors: wangwenbo
 * @LastEditTime: 2021-07-01 16:30:40
 * @FilePath: \vuetemplate\src\components\layout\MainLayout.vue
-->
<template>
<Stack :class="$style.mainLayout"  class=" flex flex-row">
    <StackItem>
      <TheLeft></TheLeft>
    </StackItem>
    <StackItem flexible>
      <main class="w-full h-full">
        <slot></slot>
      </main>
    </StackItem>
</Stack>
</template>

<script>
export default {
}
</script>

<style lang="postcss" module>
.mainLayout {
}
</style>
