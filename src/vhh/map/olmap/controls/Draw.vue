<script>
import Draw, {createBox, createRegularPolygon} from 'ol/interaction/Draw'
import {Vector as VectorSource} from 'ol/source'
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer'

export default {
  data() {
    return {
    }
  },
  props: {
    touch: Boolean,
    // 绘制类型, 支持的类型: ['rectangle', 'polygon', 'circle', 'custom'],
    type: {
      type: String,
      default: 'box',
      validator(value) {
        if(value === null) {
          return true
        }
        return ['box', 'polygon', 'circle', 'custom'].includes(value)
      }
    },
    mapReady: Function
  },
  created() {
    this.source = null
    this.vector = null
    this.draw = null
  },
  mounted() {
    this.mapReady(map => {
      const source = this.source = new VectorSource({ wrapX: false })
      const vector = this.vector = new VectorLayer({ source })
      map.addLayer(vector)
      this.initDraw()

      this.$on('beforeDestroy', () => {
        map.removeInteraction(draw)
        map.removeLayer(vector)
      })
    })
  },
  methods: {
    initDraw() {
      this.mapReady(map => {
        map.removeInteraction(this.draw)
        if(this.type) {
          const draw = this.draw = new Draw({
            source: this.source,
            ...this.createDrawOptions(this.type, this.touch)
          })
          draw.on('drawend', (e) => {
            this.$emit('drawend', e.feature)
          })
          map.addInteraction(this.draw)
        }
      })
    },
    createDrawOptions(type, touch) {
      let options = {}

      switch(type) {
        case 'box':
          options = {
            type: 'Circle',
            geometryFunction: createBox(),
            freehand: this.touch
          }
          break
        case 'polygon':
          options = {
            type: 'Polygon',
            // polygon 强制 freehand 为 false
            freehand: false
          }
          break
        case 'circle':
          options = {
            type: 'Circle',
            freehand: this.touch
          }
          break
        case 'custom':
          options = {
            type: 'Polygon',
            // custom 强制 freehand 为 true
            freehand: true
          }
          break
        default:
          throw new Error(`Unsupport draw type: ${type}`)
      }
      return options
    }
  },
  components: {
  },
  render(h) {
    return h()
  }
}
</script>
