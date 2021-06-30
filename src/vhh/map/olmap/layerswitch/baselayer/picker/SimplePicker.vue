<template>
<div :class="$style.bing">
  <div v-for="(item, index) in layers" :key="item.uid" class="overflow-hidden">
    <input type="radio" :checked="value === index" @input="v => $emit('input', index)" :value="index">
    <span class="p-2">{{item.uid}}-{{item.alias}}</span>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: {
    layers: {
      type: Array,
      default: () => []
    },
    value: {
      type: Number,
      required: true
    }
  },
}
</script>

<style lang="postcss" module>
.bing {
}
</style>
