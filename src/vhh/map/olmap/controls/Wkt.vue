<template>
<div style="display:none;"></div>
</template>

<script>
import {Vector as VectorLayer} from 'ol/layer'
import {Vector as VectorSource} from 'ol/source'
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style'
import WKT from 'ol/format/WKT';

export default {
  inject: ['getMap', 'mapReady'],
  data() {
    return {
      context: {}
    }
  },
  props: {
    wkt: {
      type: String,
      default: ''
    },
    dataProjection: {
      type: String,
      default: 'EPSG:4326'
    },
    featureProjection: {
      type: String,
      default: 'EPSG:4326'
    },
  },
  watch: {
    wkt(wkt) {
      let format = new WKT()

      let feature = format.readFeature(wkt, {
        dataProjection: this.dataProjection,
        featureProjection: this.dataProjection,
      })

      // feature = new Feature({
      //   geometry: feature.getGeometry()
      // })
      this.context.source.clear()
      this.context.source.addFeature(feature)
      this.context.vector.setZIndex(9999)
      this.getMap().getView().fit(feature.getGeometry())
    }
  },
  mounted() {
    this.mapReady(map => {
      let source = this.context.source = new VectorSource()
      let vector = this.context.vector = new VectorLayer({
        map: map,
        source: source,
        style: new Style({
          stroke: new Stroke({
            color: "#DC143C",
            lineDash: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            width: 2
          }),
          image: new CircleStyle({
            radius: 7,
            fill: new Fill({
              color: "#DC143C"
            })
          })
        })
      })
    })
  },
  methods: {
  }
}
</script>

