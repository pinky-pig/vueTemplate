<template>
<div class="absolute top-0 right-0">
  <div>
    <div v-for="(item, index) in layerVisibles" :key="index">
      <input type="checkbox" v-model="layerVisibles[index].visible">
      <span class="p-2">[{{item.name}}]</span>
    </div>
  </div>
</div>
</template>
<script>
export default {
  inject: ['mapReady'],
  data() {
    return {
      layerVisibles: []
    }
  },
  watch: {
    layerVisibles: {
      deep: true,
      handler (v, prev) {
        if(v.length === prev.length) {
          this.updateLayerVisibles()
        }
      }
    }
  },
  mounted() {
    this.mapReady(map => {
      let view = map.getView()
      this.printDebugInfo(map)

      // change:resolution
      view.on('change:resolution', e => this.printDebugInfo(map))

      // click
      map.on('click', e => {
        console.log('map#click', e, e.coordinate)
      })

      this.debugLayers(map)
    })
  },
  methods: {
    printDebugInfo(map) {
      let view = map.getView()
      console.log(
        'change:resolution => ',
        {
          zoom: view.getZoom(),
          resolution: view.getResolution()
        }
      )
    },
    debugLayers(map) {
      // layers
      const layers = map.getLayers().getArray()
      this.layerVisibles = layers.map((layer, index) => {
        return {
          name: layer.get('name') || index,
          visible: layer.get('visible') === true
        }
      })
    },
    updateLayerVisibles() {
      this.mapReady(map => {
        const layers = map.getLayers().getArray()
        this.layerVisibles.forEach((item, index) => {
          layers[index].set('visible', item.visible)
        })
      })
    }
  }
}
</script>

<style lang="postcss" module>
.debug {
}
</style>
