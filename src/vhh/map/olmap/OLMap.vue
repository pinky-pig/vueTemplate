<template>
<div :class="$style.wrapper">
  <div :class="$style.map" ref="map"></div>
  <slot></slot>
  <debug v-if="debug"></debug>
</div>
</template>

<script>
import 'ol/ol.css'
import {Map, View} from 'ol'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import {defaults as defaultControls} from 'ol/control'
import Debug from './controls/Debug'

/**
 * TODO: 从 olmap 组件中分离 icons
 * 加载 icons
 */
// ;(function loadIcons() {
//   // if(process.env.NODE_ENV === 'production') {
//   //   console.log('[development env] loading remote font icons.')
//   //   const script = document.createElement('script')
//   //   script.setAttribute('src', '//at.alicdn.com/t/font_1730657_ph3oxnrj0k.js') // for testing
//   //   document.body.appendChild(script)
//   // } else {
//     require('./assets/olmap-icons/iconfont') // local icons
//   // }
// })()

/**
 * TODO:
 * * resize handling
 */
export default {
  provide() {
    return {
      mapReady: this.mapReady,
      getMap: this.getMap
    }
  },
  staticData() {
    return {
      map: null
    }
  },
  data() {
    return {
    }
  },
  props: {
    viewOptions: {
      type: Object,
      default: () => ({
        center: [0, 0],
        zoom: 1,
        projection: 'EPSG:4326', // EPSG: 3857
        enableRotation: false
      })
    },
    // Map 初始化时定制 mapConfig 的 function, 如果传入该参数, 要确保 function 返回 mapConfig, 支持 Promise
    setup: {
      type: Function,
      default: (c) => c
    },
    debug: Boolean
  },
  methods: {
    mapReady(callback) {
      // 若 map 已经准备好则立即执行 callback
      if(this.map) {
        callback(this.map)
      } else {
        this.$on('ready', callback)
      }
    },
    getMap() {
      return this.map
    }
  },
  mounted() {
    let mapConfig = {
      target: this.$refs.map,
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        ...this.$options.props.viewOptions.default(),
        ...this.viewOptions
      }),
      controls: defaultControls({
        attribution: false,
        zoom: false
      })
    }

    let processedMapConfig = this.setup(mapConfig)
    Promise.resolve(processedMapConfig).then(mapConfig => {
      // console.log('mapConfig => ', mapConfig, this.viewOptions)
      const map = this.map = new Map(mapConfig)
      // this.map.getView().fit(config.initExtent)
      // 触发 map ready
      this.$emit('ready', map)
    })
  },
  beforeDestroy() {
    this.map.setTarget(null)
  },
  components: {
    Debug
  }
}
</script>

<style lang="postcss" module>
.wrapper, .map{
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 100%;

  /* :global(.olmap-icon) {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  } */
}
</style>
