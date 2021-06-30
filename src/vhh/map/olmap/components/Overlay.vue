<script>
import Overlay from 'ol/Overlay'

const DEFAULT = {
  positioning: 'bottom-center',
  stopEvent: true
}

export default {
  inject: ['mapReady'],
  name: 'Overlay',
  data() {
    return {
    }
  },
  props: {
    // 至少包含 position 属性 - [longitude, latitude]
    config: {
      type: Object,
      default: () => ({}),
      required: true,
      validator(value) {
        return !!value && !!value.position
      }
    },
    styles: {
      type: Object,
      default: () => ({})
    }
  },
  mounted() {
    this.mapReady(map => {
      let marker = new Overlay(Object.assign({}, DEFAULT, this.config, {
        // element: this.$refs.marker,
        element: this.$slots.default[0].elm,
      }))

      map.addOverlay(marker)

      // 自定义样式
      Object.keys(this.styles).forEach(item => {
        marker.element.style[item] = this.styles[item]
      })

      this.$on('hook:beforeDestroy', () => {
        map.removeOverlay(marker)
      })
    })
  },
  render() {
    return this.$scopedSlots.default({})
  },
}
</script>
