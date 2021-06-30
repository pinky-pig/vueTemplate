<template>
<div :class="$style.test1">
  <SXUMap
    :viewOptions="viewOptions"
    :baseLayerConfigs="baseLayerConfigs"
    :layerConfigs="layerConfigs"
    :setup="setupMap">
    <!-- <MapMarker :coords="markers" :markerClass="$style.markerClass"></MapMarker>
    <Debug></Debug> -->
  </SXUMap>
</div>
</template>

<script>
import SXUMap from '@/components/olmap/sxu/SXUMap'

import MapMarker from '@/components/olmap/controls/MapMarker'
import Debug from '@/components/olmap/controls/Debug'

import {createLayer} from '@/components/olmap/layers'
import {simpleConfigAdaptor} from '@/components/olmap/layers'

import sxuViewConfig from '@/components/olmap/sxu/view-config'
import sxuLayerConfigs from '@/components/olmap/sxu/layer-configs'
import testConfigs from '../test-layer-configs'
/**
 * test - SXUMap
 */
export default {
  data() {
    return {
      viewOptions: null,
      baseLayerConfigs: [],
      layerConfigs: [],
      markers: [
        [116.383333, 39.916667]
      ],
    }
  },
  methods: {
    // for testing
    setupMap(mapConfig) {
      mapConfig.layers = [
        // createLayer('ogc-wmts', testConfigs['ogc-wmts']['tianditu_vec_c'], {debug: true, adaptor: [simpleConfigAdaptor, c => ({...c, opacity:1})]}),
        // createLayer('ogc-wmts', testConfigs['ogc-wmts']['tianditu_cva_c'], {debug: true, adaptor: [simpleConfigAdaptor, c => ({...c, opacity:1})]}),
        // createLayer('ogc-wmts', testConfigs['ogc-wmts']['tianditu_img_c'], {debug: true, adaptor: [simpleConfigAdaptor, c => ({...c, opacity:1})]}),
        // createLayer('ogc-wmts', testConfigs['ogc-wmts']['tianditu_cia_c'], {debug: true, adaptor: [simpleConfigAdaptor, c => ({...c, opacity:1})]}),
        // createLayer('ogc-wmts', testConfigs['ogc-wmts']['tianditu_ter_c'], {debug: true, adaptor: [simpleConfigAdaptor, c => ({...c, opacity:1})]}),
        // createLayer('ogc-wmts', testConfigs['ogc-wmts']['tianditu_cta_c'], {debug: true, adaptor: [simpleConfigAdaptor, c => ({...c, opacity:1})]}),

        // createLayer('custom-wmts', testConfigs['custom-wmts']['水利专题图'], {debug: true, adaptor: [simpleConfigAdaptor, c => ({...c, opacity:1})]}),
        // createLayer('ogc-wmts', testConfigs['ogc-wmts']['SX_GQGB_JMDSS'], {debug: true, adaptor: [simpleConfigAdaptor, c => ({...c, opacity:1})]}),
        // createLayer('ogc-wmts', testConfigs['ogc-wmts']['SX_GQGB_HBFJ'], {debug: true, adaptor: [simpleConfigAdaptor, c => ({...c, opacity:1})]}),
        // createLayer('arcgis-tiles', testConfigs['arcgis-tiles'][0], {debug: true, adaptor: [simpleConfigAdaptor, c => ({...c, opacity:1})]}),
        // createLayer('arcgis-dynamic', testConfigs['arcgis-dynamic'][0], {debug: true, adaptor: [simpleConfigAdaptor, c => ({...c, opacity:1})]})

        // createLayer('custom-wmts', testConfigs['custom-wmts']['5万地质图'], {debug: true, adaptor: [simpleConfigAdaptor, c => ({...c, opacity:0.8})]}),
        // createLayer('custom-wmts', testConfigs['custom-wmts']['20万地质图'], {debug: true, adaptor: [simpleConfigAdaptor, c => ({...c, opacity:0.8})]}),
        // createLayer('custom-wmts', testConfigs['custom-wmts']['50万地质图'], {debug: true, adaptor: [simpleConfigAdaptor, c => ({...c, opacity:0.8})]}),
        // createLayer('custom-wmts', testConfigs['custom-wmts']['100万地质图'], {debug: true, adaptor: [simpleConfigAdaptor, c => ({...c, opacity:0.8})]}),
        // createLayer('custom-wmts', testConfigs['custom-wmts']['250万地质图'], {debug: true, adaptor: [simpleConfigAdaptor, c => ({...c, opacity:0.8})]}),
      ]
      return mapConfig
    }
  },
  mounted() {
    // 模拟动态请求 - view config
    setTimeout(() => {
      this.viewOptions = sxuViewConfig
    }, 0)

    // 模拟动态请求 - base layer configs
    setTimeout(() => {
      this.baseLayerConfigs = sxuLayerConfigs.baseLayerConfigs
    }, 0)

    // 模拟动态请求 - layer tree configs
    setTimeout(() => {
      this.layerConfigs = sxuLayerConfigs.layerConfigs
    }, 0)
  },
  components: {
    SXUMap,
    MapMarker,
    Debug
  }
}
</script>

<style lang="postcss" module>
.test1 {
  height: 100%;
}
</style>
