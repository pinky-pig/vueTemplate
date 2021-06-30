<template>
<div :class="$style.baseLayerSwitcher">
  <div :class="$style.inner" :style="{right: `${innerElementOffset}px`, width: `${totalWidth}px`}">
    <div
      v-for="item in layerConfigs"
      :key="item.id"
      :class="[$style.item, $style[item.mapType], {[$style.activeItem]: isActive(item.id)}]"
      @click="onClick(item)"
    >
      <!-- <span :class="$style.label">{{item.shortname || item.name}}</span> -->
    </div>
  </div>
</div>
</template>

<script>
export default {
  inject: ['mapReady'],
  data() {
    return {
      currentLayerId_: null
    }
  },
  props: {
    // tree data
    layerConfigs: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    visibleConfigs() {
      return this.layerConfigs.filter(item => item.visible)
    },
    firstVisibleConfig() {
      return this.visibleConfigs[0]
    },
    currentLayerId() {
      return this.currentLayerId_ || (this.firstVisibleConfig && this.firstVisibleConfig.id)
    },
    layerKeyById() {
      return this.layerConfigs.reduce((acc, cur) => {
        acc[cur.id] = cur
        return acc
      }, {})
    },

    innerElementOffset() {
      return this.layerConfigs.map(item => item.id)
        .indexOf(this.currentLayerId) * this.$style.widthPerItem
    },

    totalWidth() {
      return this.layerConfigs.length * this.$style.widthPerItem
    }
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    isActive(id) {
      return id === this.currentLayerId
    },
    onClick(layerConfig) {
      this.mapReady(map => {
        let layers = map.getLayers()
        let baseLayers = layers.getArray().filter(item => {
          return this.layerKeyById[item.get('id')]
        })
        baseLayers.forEach(item => {
          if(item.get('id') === layerConfig.id) {
            item.set('visible', true)
          } else {
            item.set('visible', false)
          }
        })

        this.currentLayerId_ = layerConfig.id
      })
    }
  },
  components: {
  }
}
</script>

<style lang="less" module>
@widthPerItem: 87;

:export {
  widthPerItem: @widthPerItem;
}

.baseLayerSwitcher {
  position: absolute;
  bottom: 16px;
  right: 16px;
  // background-color: #fff;

  width: unit(@widthPerItem, px);
  overflow: hidden;
  &:hover {
    width: auto;
    .inner {
      right: 0!important;
    }
  }
}

.inner {
  display: flex;
  position: relative;
}

.item {
  flex: 0 0 auto;
  position: relative;
  width: unit(@widthPerItem, px);
  height: 61px;
  padding: 2px;
  cursor: pointer;
}

.activeItem {
  &.vector {
    background: url(../assets/maptype.png) -87px -61px no-repeat;
  }
  &.image {
    background: url(../assets/maptype.png) -87px 0 no-repeat;
  }
  &.dem {
    background: url(../assets/maptype.png) -87px -305px no-repeat;
  }

  &.sx {
    background: url(../assets/sx.png) no-repeat;

    &:after {
      background-color: #00A4FE;
    }
  }
}

.vector {
  background: url(../assets/maptype.png) 0 -61px no-repeat;
}
.image {
  background: url(../assets/maptype.png) 0 0 no-repeat;
}
.dem {
  background: url(../assets/maptype.png) 0 -305px no-repeat;
}
.sx {
  background: url(../assets/sx.png) no-repeat;
  &:after {
    content: "政区";
    display: inline-block;
    position: absolute;
    bottom: 2px;
    right: 0;
    // width: 100px;
    padding: 2px 4px;
    font-size: 13px;
    color: #fff;
    border-radius: 4px;
  }
}
</style>
