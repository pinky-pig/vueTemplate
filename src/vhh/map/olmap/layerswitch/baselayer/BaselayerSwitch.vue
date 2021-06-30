<template>
<div :class="$style.baselayerSwitch" class="absolute right-0 bottom-0">
  <BingPicker :layers="layers" v-model="visibleIndex"></BingPicker>
  <!-- <SimplePicker :layers="layers" v-model="visibleIndex"></SimplePicker> -->
</div>
</template>

<script>
import {getUid} from 'ol/util'
import BingPicker from './picker/Bing'
import SimplePicker from './picker/SimplePicker'

export default {
  inject: ['mapReady'],
  data() {
    return {
      visibleIndex: 0,
    }
  },
  props: {
    layers: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    active() {
      return this.layers[this.visibleIndex]
    }
  },
  watch: {
    layers: {
      immediate: true,
      handler () {
        this.refresh()
      }
    },
    visibleIndex(value, prev) {
      this.updateVisible(value, prev)
    }
  },
  created() {
    this.uidLayerMapping = {}
  },
  methods: {
    getMapLayerByUid(uid) {
      return this.uidLayerMapping[uid]
    },
    setVisible(uid, visible) {
      this.getMapLayerByUid(uid).set('visible', visible)
    },
    refresh() {
      // 更新图层信息
      this.mapReady(map => {
        const allLayers = map.getLayers().getArray()
        const uidLayerMapping = this.uidLayerMapping = allLayers
          .reduce((acc, cur) => {
            acc[getUid(cur)] = cur
            return acc
          }, {})

        // 默认首个图层 visible 为 true, 靠后的 visible=true 会覆盖前面的
        const visibleIndex = this.visibleIndex = this.layers
          .reduce((acc, cur, index) => cur.visible ? index : acc, 0)

        // 重置图层 visible
        this.layers.forEach((item, index) => {
          const layer = uidLayerMapping[item.uid]
          layer.set('visible', index === visibleIndex)
        })
      })
    },
    updateVisible(current, prev) {
      this.setVisible(this.layers[current].uid, true)
      if(prev) {
        this.setVisible(this.layers[prev].uid, false)
      }
    }
  },
  components: {
    SimplePicker,
    BingPicker
  }
}
</script>

<style lang="postcss" module>
.baselayerSwitch {
}
</style>
