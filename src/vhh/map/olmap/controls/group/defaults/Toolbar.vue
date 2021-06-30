<template>
<div class="absolute">
  <ControlGroup direction="v" class="relative">
    <ControlGroupItem @click="zoomIn" title="放大">
      <svg class="olmap-icon" ><use xlink:href="#olmap-zoomin"></use></svg>
    </ControlGroupItem>
    <ControlGroupItem @click="zoomOut" title="缩小">
      <svg class="olmap-icon"><use xlink:href="#olmap-zoomout"></use></svg>
    </ControlGroupItem>
    <ControlGroupItem @click="resetMap" title="全图">
      <svg class="olmap-icon" ><use xlink:href="#olmap-fit-extent"></use></svg>
    </ControlGroupItem>
    <ControlGroupItem @click="$refs.measure.measure('LineString')" title="距离">
      <svg class="olmap-icon"><use xlink:href="#olmap-measure-rule"></use></svg>
    </ControlGroupItem>
    <ControlGroupItem @click="$refs.measure.measure('Polygon')" title="面积">
      <svg class="olmap-icon"><use xlink:href="#olmap-measure-area"></use></svg>
    </ControlGroupItem>
    <ControlGroupItem @click="clear" title="清除">
      <svg class="olmap-icon"><use xlink:href="#olmap-clear"></use></svg>
    </ControlGroupItem>
  </ControlGroup>
  <Measure style="display:none;" ref="measure"></Measure>
</div>
</template>

<script>
import ControlGroup from '../ControlGroup'
import ControlGroupItem from '../ControlGroupItem'
import Measure from '../../Measure'
import {zoomByDelta} from '../../../utils'

export default {
  inject: ['mapReady'],
  data() {
    return {
    }
  },
  props: {
    fullExtent: {
      type: Array,
      default: () => [73.6753792663, 18.197700914, 135.026311477, 53.4588044297]
    },
    resetMapFun: Function
  },
  methods: {
    zoomIn() {
      this.mapReady(map => zoomByDelta(map, {delta: 1}))
    },
    zoomOut() {
      this.mapReady(map => zoomByDelta(map, {delta: -1}))
    },
    resetMap() {
      if(this.resetMapFun) {
        this.mapReady(map => this.resetMapFun(map))
      } else {
        this.mapReady(map => map.getView().fit(this.fullExtent))
      }
    },
    clear() {
      this.$refs.measure.clear()
      this.$emit('clear')
    }
  },
  components: {
    ControlGroup,
    ControlGroupItem,
    Measure
  }
}
</script>

<style lang="postcss" module>
.toolbar {
}
</style>
