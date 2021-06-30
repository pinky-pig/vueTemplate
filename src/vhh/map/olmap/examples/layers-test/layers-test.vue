<template>
<div :class="$style.test1">
  <OLMap :viewOptions="viewOptions" :setup="setupMap">
    <!-- <MapMarker :coords="markers" :markerClass="$style.markerClass"></MapMarker> -->
    <!-- <Debug></Debug> -->
  </OLMap>
</div>
</template>

<script>
import {OLMap} from '@/components/olmap'
import MapMarker from '@/components/olmap/controls/MapMarker'
import Debug from '@/components/olmap/controls/Debug'

import testConfigs from '../test-layer-configs'
import {createLayer} from '@/components/olmap/layers'
import {simpleConfigAdaptor} from '@/components/olmap/layers'

export default {
  data() {
    return {
      viewOptions: {
        // center: [119.45, 32.8], // 江苏
        center: [112.55, 37.866667], // 山西
        projection: 'EPSG:4326',
        zoom: 7
      },
      markers: [
        [116.383333, 39.916667]
      ],
    }
  },
  methods: {
    setupMap(mapConfig) {
      mapConfig.layers = [
        createLayer('ogc-wmts', testConfigs['ogc-wmts']['tianditu_vec_c'], {debug: true, adaptor: [simpleConfigAdaptor, c => ({...c, opacity:1})]}),
        createLayer('ogc-wmts', testConfigs['ogc-wmts']['tianditu_cva_c'], {debug: true, adaptor: [simpleConfigAdaptor, c => ({...c, opacity:1})]}),
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
  components: {
    OLMap,
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
