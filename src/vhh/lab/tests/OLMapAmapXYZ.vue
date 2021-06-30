<template>
<div :class="$style.oLMapAmapXYZ" class="h-full">
  <OLMap :viewOptions="viewOptions" :setup="setupMap" @ready="onMapReady">

    <div class="absolute right-0 top-0 p-4 text-white bg-orange-400 opacity-75">
      <div v-for="(config, index) in configs" :key="index">
        <span
          v-show="index > 0 && config.prefix !== configs[index - 1].prefix"
          class="block my-3 border-t">
        </span>
        <input type="checkbox" v-model="config.visible"> {{formatConfig(config)}}
      </div>
    </div>

  </OLMap>
</div>
</template>

<script>
import XYZ from 'ol/source/XYZ'
import TileLayer from 'ol/layer/Tile'
import {transformExtent} from 'ol/proj'
import {OLMap} from 'vhh/map/olmap'


const DEFAULT_PARAMS = {
  lang: 'zh_cn', // en
  size: '1',
  scale: '1',
}

/**
   # 测试 高德地图 xyz 图层

   - usage: require('vhh/lab/tests/OLMapAmapXYZ').default
   - 参数说明 (此处说明不一定正确, 具体看测试代码前的注释)
     - lang: zh_cn | en
     - style: 地图类型控制, 6卫星 (st), 7简图 (st rd), 8详图 (不透明rd, 透明图st)
     - ~~scl: 尺寸控制, 1=256, 2=512~~
     - ltype: 线性控制, 增加后, 只对地图要素进行控制, 没有文字注记, 要素多少, 是否透明
   - 参数模板: {style: X, scl: X, ltype: X }

   ## refs

   - https://blog.csdn.net/qq_31881865/article/details/103741538
 */
export default {
  data() {
    return {
      // prefix: wprd0{1-4} | webrd0{1-4}
      configs: [
        /**
         * prefix: 'wprd'
         */
        // 底图 (影像) 无注记
        {prefix: 'wprd', visible: true, params: {style: 6, scl: null, ltype: null} },

        {prefix: 'wprd', visible: false, params: {style: 7, scl: null, ltype: null} },
        {prefix: 'wprd', visible: false, params: {style: 7, scl: 2, ltype: null} },

        // 省界+路网+标注 (矢量)
        {prefix: 'wprd', visible: false, params: {style: 8, scl: null, ltype: null} },
        // 省界+路网+标注 (矢量) + 仅保留底图, 去除标注
        {prefix: 'wprd', visible: false, params: {style: 8, scl: 2, ltype: null} },
         // 纯道路
        {prefix: 'wprd', visible: false, params: {style: 8, scl: null, ltype: 11} },
        // 纯地标
        {prefix: 'wprd', visible: false, params: {style: 8, scl: 1, ltype: 4} },

        /**
         * prefix: 'webrd'
         */
         // 道路简图
        {prefix: 'webrd', visible: false, params: {style: 7, scl: null, ltype: null} },
        // 道路详图
        {prefix: 'webrd', visible: false, params: {style: 8, scl: null, ltype: null} },
      ],
      viewOptions: {
        center: [0, 0],
        zoom: 4,
        projection: 'EPSG:3857', // EPSG: 4326
      },
      // 长三角 extent
      extent: transformExtent(
        [115.02986634912, 27.187296795498, 123.18308212700, 35.05479355697],
        'EPSG:4326',
        'EPSG:3857',
      )
    }
  },
  watch: {
    configs: {
      deep: true,
      handler(values) {
        values.forEach((config, index) => {
          this.layers[index].setVisible(config.visible)
        })
      }
    }
  },
  created() {
    this.layers = []
  },
  methods: {
    setupMap(config) {
      config.layers = this.layers = this.configs.map(config => this.createLayer(config))
      console.log(this.layers, 99)
      return config
    },
    onMapReady(map) {
      map.getView().fit(this.extent)
    },
    createLayer(config) {
      const {
        prefix,
        visible,
        params
      } = config
      let baseURL = `http://${prefix}0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}`
      let url = baseURL + this.paramsStr(DEFAULT_PARAMS) + this.paramsStr(params)
      return new TileLayer({
        source: new XYZ({ url }),
        visible
      })
    },
    paramsStr(params) {
      return Object.keys(params).map(k => {
        const v = params[k]
        return v ? `&${k}=${v}` : ''
      }).join('')
    },
    formatConfig(config) {
      return `[${config.prefix}] ${this.paramsStr(config.params).substring(1)}`
    }
  },
  components: {
    OLMap
  }
}
</script>

<style lang="postcss" module>
.oLMapAmapXYZ {
}
</style>
