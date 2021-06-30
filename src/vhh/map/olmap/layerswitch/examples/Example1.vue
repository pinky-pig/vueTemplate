<template>
<div :class="$style.example1" class="h-full">
  <OLMap
    :viewOptions="viewOptions"
    :debug="false"
    :setup="setupMap"
    @ready="onMapReady"
    ref="map">
    <BaselayerSwitch :layers="layerBindings"></BaselayerSwitch>
  </OLMap>
</div>
</template>

<script>
import {fromLonLat} from 'ol/proj'
import {OLMap} from 'vhh/map/olmap'
import {createLayer} from 'vhh/map/olmap/layers'
import {getBJCoord} from 'vhh/map/olmap/utils'
import {
  BaselayerSwitch,
  bindLayers
} from 'vhh/map/olmap/layerswitch/baselayer'

export default {
  data() {
    return {
      viewOptions: {
        center: fromLonLat(getBJCoord()),
        // center: getBJCoord(),
        zoom: 4,
        projection: 'EPSG:3857', // EPSG: 4326
        // projection: 'baidu'
      },

      layerBindings: []
    }
  },
  methods: {
    setupMap(config) {

      const baseLayers = [
        // createLayer('tianditu', {opacity: 1}, {props: {name: 'tianditu'}}),
        createLayer('baidu', {layer: 'vec', opacity: 1}, {props: {name: 'baidu-vec'}}),
        createLayer('baidu', {layer: 'img', opacity: 1}, {props: {name: 'baidu-img'}}),
        createLayer('amap-xyz', {layer: 'vec', opacity: 1}, {props: {name: 'amap-vec'}}),
        createLayer('amap-xyz', {layer: 'img', opacity: 1}, {props: {name: 'amap-img'}}),
        createLayer('google', {layer: 'vec', opacity: 1}, {props: {name: 'google-vec'}}),
        createLayer('google', {layer: 'img', opacity: 1}, {props: {name: 'google-img'}}),
      ]

      let icons = [
        require('vhh/map/olmap/layerswitch/baselayer/assets/bing/vec.png'),
        require('vhh/map/olmap/layerswitch/baselayer/assets/bing/img.png'),
      ]

      let bindingOptions = [
        {alias: '百度(矢量)',image: icons[0]},
        {alias: '百度(影像)',image: icons[1]},
        {alias: '高德(矢量)',image: icons[0]},
        {alias: '高德(影像)',image: icons[1]},
        {alias: '谷歌(矢量)',image: icons[0]},
        {alias: '谷歌(影像)',image: icons[1]}
      ]
      bindingOptions.forEach((item, index) => item.layer = baseLayers[index])
      this.layerBindings = bindLayers(bindingOptions)

      config.layers = [
        createLayer('osm', {opacity: 1}, {props: {name: 'osm'}}),
        ...baseLayers
      ]
      return config
    },
    onMapReady(map) {
    }
  },
  components: {
    OLMap,
    BaselayerSwitch
  }
}
</script>

<style lang="postcss" module>
.example1 {
}
</style>
