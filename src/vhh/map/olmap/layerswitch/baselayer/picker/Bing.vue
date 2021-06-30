<template>
<div :class="$style.bing">

  <div class="p-2 border bg-white rounded-md shadow-xs cursor-pointer" v-if="active">
    <img :src="active.image" class=" w-5 h-5 inline-block">
    <span class="ml-2 text-sm text-gray-600">{{active.alias}}</span>
  </div>

  <div :class="$style.list" class="absolute bottom-0 right-0 w-40 py-1 border overflow-hidden bg-white rounded-md shadow-sm origin-bottom-right transition-all duration-200">
    <div
      v-for="(item, index) in layers"
      :key="item.uid"
      class="px-2 hover:bg-gray-200"
      :class="[{'bg-gray-200': index === value}]"
      @click="$emit('input', index)"
    >
      <!-- <input type="radio" :checked="value === index" @input="v => $emit('input', index)" :value="index"> -->
      <div class="p-2 cursor-pointer">
        <img :src="item.image" class="w-5 h-5 inline-block">
        <span class="ml-2 text-sm text-gray-600">{{item.alias}}</span>
      </div>
    </div>
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
  computed: {
    active() {
      return this.layers[this.value]
    }
  }
}
</script>

<style lang="postcss" module>
.bing {
  .list {
    transform: scale(0);
    opacity: 0;
  }
  &:hover {
    .list {
      transform: scale(1);
      opacity: 1;
    }
  }
}
</style>
