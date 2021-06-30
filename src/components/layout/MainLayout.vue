<template>
<Stack :class="$style.mainLayout">
  <StackItem>
    <TheHeader></TheHeader>
  </StackItem>
  <StackItem flexible>
    <main class="w-full h-full">
      <slot></slot>
    </main>
  </StackItem>
  <StackItem>
    <!-- <TheFooter></TheFooter> -->
  </StackItem>
</Stack>
</template>

<script>
export default {
}
</script>

<style lang="postcss" module>
.mainLayout {
  min-width: 1200px;
}
</style>
