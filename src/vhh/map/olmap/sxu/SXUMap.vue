<template>
<OLMap
  v-bind="attrs"
  v-on="listeners"
  ref="olmap"
  :class="$style.sxumap"
  :setup="setupMap"
  @ready="onMapReady"
>
  <BaseLayerSwitcher :layerConfigs="baseLayerConfigsTreeData"></BaseLayerSwitcher>
  <EleLayerTreeSwitcher :layerConfigs="layerConfigsTreeData" v-show="layerVisible" :class="$style.layerTree"></EleLayerTreeSwitcher>
  <Toolbar :layerVisible.sync="layerVisible" :fullExtent="sxFullExtent"></Toolbar>
  <slot></slot>
</OLMap>
</template>

<script>
import {OLMap} from '@/components/olmap'
import {createLayer} from '@/components/olmap/layers'
import {simpleConfigAdaptor} from '@/components/olmap/layers'
import {array2tree} from '../utils'
import BaseLayerSwitcher from '@/components/olmap/controls/BaseLayerSwitcher'
import EleLayerTreeSwitcher from '@/components/olmap/controls/EleLayerTreeSwitcher'
import Toolbar from '@/components/olmap/controls/Toolbar'

const BASE_LAYER_ZINDEX_FROM = 0
const LAYER_ZINDEX_FROM = 1000
const TK = 'de5ad7492e083c32ac321d0e7aa97a11'

/**
 * 山西大学项目通用 map 组件
 */
export default {
  inheritAttrs: false,
  data() {
    return {
      context: {
        // baseLayers
        // layers
      },
      layerVisible: true,
      sxFullExtent: [110.13753598309921,34.51114824649443,114.65604504794067,40.81040593348712]
    }
  },
  props: {
    // 底图图层配置
    baseLayerConfigs: {
      type: Array,
      required: true
    },
    // 图层树图层配置
    layerConfigs: {
      type: Array,
      required: true
    },
    setup: {
      type: Function,
      default: (c) => c
    },
  },
  computed: {
    attrs() {
      const {setup, ...attrs} = this.$attrs
      return attrs
    },
    listeners() {
      const {ready, ...listeners} = this.$listeners
      return listeners
    },
    baseLayerConfigsTreeData() {
      return array2tree(this.baseLayerConfigs)
    },
    layerConfigsTreeData() {
      return array2tree(this.layerConfigs)
    }
  },
  watch: {
    baseLayerConfigsTreeData(configs, old) {
      if(configs) {
        let layers = configs.map((item, index) => {
          let layer = createLayer(
            item.type,
            item,
            {
              // debug: true,
              adaptor: [
                simpleConfigAdaptor,
                (c) => {
                  return {
                    ...c,
                    url: this.formatTiandituUrl(c.url),
                    zIndex: BASE_LAYER_ZINDEX_FROM + index
                  }
                }
              ]
            }
          )
          // layer.set('isBaseLayer', true)
          return layer
        })
        this.$refs.olmap.mapReady(map => {
          // 删除之前的 layer
          if(this.context.baseLayers) {
            this.context.baseLayers.forEach(map.removeLayer)
          }
          // 添加
          layers.forEach(layer => map.addLayer(layer))
          // 保存引用
          this.context.baseLayers = layers
        })
      }
    },

    layerConfigs(configs, old) {
      if(configs) {
        // 过滤掉目录结点
        // TODO: 需要过滤掉 type:composite 的 children
        let validConfigs = configs.filter(item => !!item.type)
        let layers = validConfigs.map((item, index) => {
          let layer = createLayer(
            item.type,
            item,
            {
              // debug: true,
              adaptor: [
                simpleConfigAdaptor,
                (c) => {
                  return {
                    ...c,
                    url: this.formatTiandituUrl(c.url),
                    zIndex: LAYER_ZINDEX_FROM + index
                  }
                }
              ]
            }
          )
          return layer
        })
        this.$refs.olmap.mapReady(map => {
          // 删除之前的 layer
          if(this.context.layers) {
            this.context.layers.forEach(map.removeLayer)
          }
          // 添加
          layers.forEach(layer => map.addLayer(layer))
          // 保存引用
          this.context.layers = layers
        })
      }
    }
  },
  mounted() {
  },
  methods: {
    setupMap(config){
      return Promise.resolve(this.setup(config))
    },
    onMapReady(map) {
      this.$emit('ready', map)
      map.getView().fit(this.sxFullExtent)
    },
    formatTiandituUrl(url) {
      if(url && url.indexOf('tianditu.gov.cn') !== -1) {
        return `${url}?tk=${TK}`
      }
      return url
    }
  },
  components: {
    OLMap,
    BaseLayerSwitcher,
    EleLayerTreeSwitcher,
    Toolbar
  }
}
</script>

<style lang="postcss" module>
.sxumap {
  .layerTree{
    left: auto;
    right: 16px;
    top: 60px;
    bottom: 80px;
  }
}
</style>
