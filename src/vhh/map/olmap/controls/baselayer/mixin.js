import {getUid} from 'ol/util'

export default {
  inject: ['getMap', 'mapReady'],
  data() {
    return {
      activeIndex: 0
    }
  },
  props: {
    /**
     * @returns {Object[]} layerOptions
     *          {string} layerOptions[].id - openlayers Layer instance ol_uid
     *          {string} layerOptions[].label - 显示标签
     *          {*} ...
     */
    layerOptions: {
      type: Array,
      required: true
    }
  },
  computed: {
    layerOptionsKeyById() {
      return this.layerOptions
        .reduce((acc, cur) => Object.assign(acc, {[cur.id]: cur}), {})
    },
    activeLayerOption() {
      return this.layerOptions[this.activeIndex]
    }
  },
  mounted() {
  },
  methods: {
    activate(index) {
      if(index === this.activeIndex) {
        return
      }
      this.getLayerById(this.activeLayerOption.id).setVisible(false)
      this.getLayerById(this.layerOptions[index].id).setVisible(true)

      this.activeIndex = index
    },
    getLayerById(id) {
      let map = this.getMap()
      // console.log(this.layerOptions, 99999)
      return map.getLayers().getArray().filter(layer => {
        return getUid(layer) === id
      })[0]
    }
  }
}
