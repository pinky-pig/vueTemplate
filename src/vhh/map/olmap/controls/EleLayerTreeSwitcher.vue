<template>
<div :class="$style.eleLayerTreeSwitcher">
  <el-tree
    :data="layerConfigs"
    show-checkbox
    node-key="id"
    :default-expanded-keys="defaultExpandedKeys"
    :default-checked-keys="defaultCheckedKeys"
    :props="defaultProps"
    @check-change="onCheckChange"
  >
  </el-tree>

</div>
</template>

<script>
import {flattenTree} from '../utils'
/**
 * 基于 elementui 的图树管理器
 */
export default {
  inject: ['mapReady'],
  data() {
    return {
      indexCounter: 0,
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  props: {
    layerConfigs: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    flattened() {
      return flattenTree(this.layerConfigs)
    },
    defaultCheckedKeys() {
      // 图层结点 && visible 不为 false
      return this.flattened.filter(item => !!item.type && item.visible !== false)
        .map(item => item.id)
    },
    defaultExpandedKeys() {
      if(this.layerConfigs[0]) {
        return [this.layerConfigs[0].id]
      }
    },
  },
  watch: {
  },
  mounted() {
  },
  methods: {
    onCheckChange(config, checked, subtreeChecked) {
      // 图层 (非目录)
      if(!!config.type) {
        this.mapReady(map => {
          let layers = map.getLayers().getArray()
          let layer = layers.filter(item => item.get('id') === config.id)[0]
          if(layer) {
            layer.set('visible', checked)
            // if(checked) {
            //   layer.set('zIndex', ++this.indexCounter)
            // }
          }
        })
      }
    }
  },
  components: {
  }
}
</script>

<style lang="postcss" module>
.eleLayerTreeSwitcher {
  box-sizing: border-box;
  position: absolute;
  top: 16px;
  left: 16px;
  min-width: 200px;
  padding: 24px 24px 24px 16px;
  overflow-y: hidden;
  background-color: #fff;

  &:hover {
    overflow-y: auto;
  }
}
</style>
