<template>
<div :class="$style.toolbar">
  <div :class="$style.inner">
    <div :class="$style.toolbarItem" @click="zoomIn" title="放大">
      <svg class="olmap-icon" aria-hidden="true"><use xlink:href="#olmap-zoomin"></use></svg>
    </div>
    <div :class="$style.toolbarItem" @click="zoomOut" title="缩小">
      <svg class="olmap-icon" aria-hidden="true"><use xlink:href="#olmap-zoomout"></use></svg>
    </div>
    <div :class="$style.toolbarItem" @click="fitFullExtent" title="全图">
      <svg class="olmap-icon" aria-hidden="true"><use xlink:href="#olmap-fit-extent"></use></svg>
    </div>
    <!-- <div :class="$style.toolbarItem">
      <svg class="olmap-icon" aria-hidden="true"><use xlink:href="#olmap-hand"></use></svg>
    </div> -->

    <div :class="$style.toolbarItem" @click="$refs.measure.measure('LineString')" title="距离">
      <svg class="olmap-icon" aria-hidden="true"><use xlink:href="#olmap-measure-rule"></use></svg>
    </div>
    <div :class="$style.toolbarItem" @click="$refs.measure.measure('Polygon')" title="面积">
      <svg class="olmap-icon" aria-hidden="true"><use xlink:href="#olmap-measure-area"></use></svg>
    </div>
    <div :class="$style.toolbarItem" @click="clear" title="清除">
      <svg class="olmap-icon" aria-hidden="true"><use xlink:href="#olmap-clear"></use></svg>
    </div>
    <!-- <div :class="$style.toolbarItem" @click="toggleLayer">
      <svg class="olmap-icon" aria-hidden="true"><use xlink:href="#olmap-layer"></use></svg>
    </div> -->

    <Measure style="display:none;" ref="measure"></Measure>
  </div>
</div>
</template>

<script>
import Measure from './Measure'
import {zoomByDelta} from '../utils'

export default {
  inject: ['getMap'],
  data() {
    return {
    }
  },
  props: {
    fullExtent: {
      type: Array,
      default: () => [73.6753792663, 18.197700914, 135.026311477, 53.4588044297]
    },
    layerVisible: Boolean
  },
  computed: {
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    zoomIn() {
      zoomByDelta(this.getMap(), {delta: 1})
    },
    zoomOut() {
      zoomByDelta(this.getMap(), {delta: -1})
    },
    fitFullExtent() {
      this.getMap().getView().fit(this.fullExtent)
    },
    toggleLayer() {
      this.$emit('update:layerVisible', !this.layerVisible)
    },
    clear() {
      this.$refs.measure.clear()
      this.$emit('clear')
    }
  },
  components: {
    Measure
  }
}
</script>

<style lang="postcss" module>

.toolbar {
  --color: #875B40;
  --height: 40px;
  --gap: 20px;

  position: absolute;
  top: 16px;
  right: 16px;
  border: 1px solid var(--color);
  background-color: #fff;

  .inner {
    display: flex;
    align-items: center;
    height: var(--height);
    padding: 0 calc(var(--gap) / 2);
  }

  .toolbarItem{
    position: relative;
    /* height: var(--height); */
    text-align: center;
    font-size: 18px;
    cursor: pointer;

    :global(.olmap-icon) {
      fill: var(--color);
    }
  }

  .toolbarItem + .toolbarItem {
    margin-left: var(--gap);
  }

  .toolbarItem + .toolbarItem:before {
    content: "";
    display: block;
    position: absolute;
    top: -4px;
    bottom: -4px;
    left: calc(var(--gap) / 2 * -1);
    width: 0;
    border-right: 1px solid #ddd;
  }
}
</style>
