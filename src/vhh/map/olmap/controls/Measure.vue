<template>
<div :class="$style.control">
  <span :class="$style.controlItem" @click="clear()">
    <!-- <v-icon name="trash" scale="1.3"></v-icon> -->
    clear
  </span>
  <span :class="[$style.controlItem, {[$style.activeBtn]: activeButton === 'LineString'}]" @click="measure('LineString')">
    <!-- <v-icon name="pencil-ruler" scale="1.3"></v-icon> -->
    ruler
  </span>
  <span :class="[$style.controlItem, {[$style.activeBtn]: activeButton === 'Polygon'}]" @click="measure('Polygon')">
    <!-- <v-icon name="vector-square" scale="1.4"></v-icon> -->
    square
  </span>
</div>
</template>

<script>
import Overlay from 'ol/Overlay'
import {getArea, getLength} from 'ol/sphere'
import {LineString, Polygon} from 'ol/geom'
import Draw from 'ol/interaction/Draw'
import {Vector as VectorLayer} from 'ol/layer'
import {Vector as VectorSource} from 'ol/source'
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style'

// TODO: 亩/公顷
export default {
  inject: ['getMap', 'mapReady'],
  data() {
    return {
      context: {},

      activeButton: ''
    }
  },
  mounted() {
    this.mapReady(map => {
      let source = this.context.source = new VectorSource()
      let vector = this.context.vector = new VectorLayer({
        map: map,
        source: source,
        style: new Style({
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)'
          }),
          stroke: new Stroke({
            color: '#ffcc33',
            width: 2
          }),
          image: new CircleStyle({
            radius: 7,
            fill: new Fill({
              color: '#ffcc33'
            })
          })
        })
      })
    })
  },
  methods: {
    measure(type) {
      if(this.activeButton === type) {
        return
      }

      // 先清除
      if(this.context.draw) {
        this.getMap().removeInteraction(this.context.draw)
      }

      // 按钮状态控制
      this.activeButton = type

      let draw = this.context.draw = new Draw({
        source: this.context.source,
        type: type,
        style: new Style({
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)'
          }),
          stroke: new Stroke({
            color: 'rgba(0, 0, 0, 0.5)',
            lineDash: [10, 10],
            width: 2
          }),
          image: new CircleStyle({
            radius: 5,
            stroke: new Stroke({
              color: 'rgba(0, 0, 0, 0.7)'
            }),
            fill: new Fill({
              color: 'rgba(255, 255, 255, 0.2)'
            })
          })
        })
      })
      this.getMap().addInteraction(draw)

      this.createMeasureTooltip()

      let listener
      draw.on('drawstart', (evt) => {
        let sketch = this.context.sketch = evt.feature
        let tooltipCoord = evt.coordinate
        listener = sketch.getGeometry().on('change', (evt) => {
          var geom = evt.target
          var output
          if (geom instanceof Polygon) {
            output = this.formatArea(geom)
            tooltipCoord = geom.getInteriorPoint().getCoordinates()
          } else if (geom instanceof LineString) {
            output = this.formatLength(geom)
            tooltipCoord = geom.getLastCoordinate()
          }
          this.context.measureTooltipElement.innerHTML = output
          this.context.measureTooltip.setOffset([0, -30])
          this.context.measureTooltip.setPosition(tooltipCoord)
        })
      }, this)

      draw.on('drawend', (e) => {
        this.context.measureTooltipElement.className = `${this.$style.tooltip} ${this.$style.tooltipStatic}`
        this.context.measureTooltip.setOffset([0, -7])
        // unset sketch
        this.context.sketch = null
        // unset tooltip so that a new one can be created
        this.context.measureTooltipElement = null
        this.createMeasureTooltip()

        // clear, setTimeout => 避免双击导致缩放
        // setTimeout(() => this.getMap().removeInteraction(draw), 0)
      }, this)
    },
    createMeasureTooltip() {
      if (this.context.measureTooltipElement) {
        this.context.measureTooltipElement.parentNode.removeChild(this.context.measureTooltipElement)
      }
      this.context.measureTooltipElement = document.createElement('div')
      this.context.measureTooltipElement.className = `${this.$style.tooltip} ${this.$style.tooltipMeasure}`
      this.context.measureTooltip = new Overlay({
        element: this.context.measureTooltipElement,
        offset: [0, -15],
        positioning: 'bottom-center',
      })
      this.context.measureTooltip.set('_type', 'measure-control-overlay')
      this.getMap().addOverlay(this.context.measureTooltip)
    },
    formatLength(line) {
      let length = getLength(line, {projection: 'EPSG:4326'})
      let output
      if (length > 100) {
        output = (Math.round(length / 1000 * 100) / 100) + ' km'
      } else {
        output = (Math.round(length * 100) / 100) + ' m'
      }
      return output
    },
    formatArea(polygon) {
      var area = getArea(polygon, {projection: 'EPSG:4326'})
      let mu = Math.round(area / 666.6666667 * 100) / 100
      var output
      // if (area > 10000) {
      if (area > 10000) {
        output = `${(Math.round(area / 1000000 * 100) / 100)} km2 (${mu}mu)`
      } else {
        output = `${(Math.round(area * 100) / 100)} m2 (${mu}mu)`
      }
      return output
    },
    clear() {
      let map = this.getMap()
      this.context.source.clear()
      map.getOverlays().getArray().slice(0).forEach(overlay => {
        if(overlay.get('_type') === 'measure-control-overlay') {
          map.removeOverlay(overlay)
        }
      })

      // 按钮状态控制
      this.activeButton = null
      // 清除 draw
      this.getMap().removeInteraction(this.context.draw)
    }
  }
}
</script>

<style lang="postcss" module>
.tooltip {
  position: relative;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  color: white;
  padding: 4px 8px;
  opacity: 0.7;
  white-space: nowrap;
}
.tooltipMeasure {
  opacity: 1;
  font-weight: bold;

  /* 测量结束前隐藏 tooltip, 否则 tooltip 的存在会导致其附近区域无法点击 */
  display: none;
}
.tooltipStatic {
  background-color: #ffcc33;
  color: black;
  border: 1px solid white;
}
.tooltipMeasure:before,
.tooltipStatic:before {
  border-top: 6px solid rgba(0, 0, 0, 0.5);
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
  content: "";
  position: absolute;
  bottom: -6px;
  margin-left: -7px;
  left: 50%;
}
.tooltipStatic:before {
  border-top-color: #ffcc33;
}

.activeBtn {
  /* background: @primary-color; */
  svg {
    fill: #fff;
  }
}
</style>
