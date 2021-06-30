<template>
<div :class="$style.baseLayerSwitch" class="absolute">
  <div
    class="relative cursor-pointer"
    v-for="(item, index) in layerOptions"
    :key="item.id"
    :class="[$style.item, {[$style.active]: index === activeIndex}]"
    :style="{backgroundImage: `url(${item.image})`}"
    @click="activate(index)">
    <span
      class="absolute right-0 bottom-0 px-1 text-xs text-white"
      :class="[{'bg-blue-500': index === activeIndex}]">
      {{item.label}}
    </span>
  </div>
</div>
</template>

<script>
import mixin from './mixin'
/**
 * 参考百度(样式)的底图切换器
 */
export default {
  name: 'BaiduBaseLayerSwitch',
  mixins: [mixin],
}
</script>

<style lang="postcss" module>


.baseLayerSwitch {
  --item-width: 86px;
  --item-height: 60px;

  display: flex;
  position: absolute;
  right: 8px;
  bottom: 8px;

  .item {
    display: none;
    width: var(--item-width);
    height: var(--item-height);
  }
  .item.active {
    display: block;
  }

  &:hover {
    .item {
      display: block;
    }
  }
}
</style>
