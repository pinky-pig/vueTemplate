<template>
<!-- display:none => fix: 地图右侧空隙 -->
<div style="display:none;">
  <div
    :key="index"
    v-for="(item, index) in coords"
    ref="markers">
    <slot :index="index">
      <div :class="[$style.marker, markerClass]"></div>
    </slot>
  </div>
</div>
</template>

<script>
import Overlay from 'ol/Overlay'
import {boundingExtent} from 'ol/extent'

const defaultOverlayOptions = {
  positioning: 'center-center',
  stopEvent: false
}

/**
 * TODO: functional
 */
export default {
  inject: ['mapReady'],
  props: {
    coords: {
      type: Array,
      default: () => []
    },
    autoFit: Boolean,
    markerClass: String,
    overlayOptions: Object,
    // 单点模式 -> 切换坐标时使用动画移动的方式
    singlePoint: Boolean
  },
  watch: {
    coords() {
      this.drawMarkers()
    }
  },
  mounted() {
    this.drawMarkers()
  },
  methods: {
    drawMarkers() {
      this.mapReady(map => {
        this.coords.forEach((coord, index) => {
          this.$nextTick(() => {
            let options = Object.assign(
              {},
              defaultOverlayOptions,
              this.overlayOptions,
              {
                position: coord,
                element: this.$refs.markers[index],
              }
            )
            let marker = new Overlay(options)
            map.addOverlay(marker)
          })
        })


        if(this.singlePoint) {
          map.getView().animate({
            center: this.coords[0],
            duration: 700
          })
        } else if(this.autoFit) {
          // auto fit
          const extent = boundingExtent(this.coords)
          map.getView().fit(extent, {
            padding: [54, 54, 54, 54],
            maxZoom: 8
          })
        }
      })
    }
  },
}
</script>

<style lang="postcss" module>
.marker {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: red;
  box-shadow: 0 1px 1px rgba(0,0,0,.05), 0 2px 6px 0 rgba(0,0,0,.045);
}
</style>
