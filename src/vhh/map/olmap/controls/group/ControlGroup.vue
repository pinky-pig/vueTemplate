<template>
<div :class="classes" class="absolute flex border border-primary">
  <slot></slot>
</div>
</template>

<script>
export default {
  name: 'ControlGroup',
  data() {
    return {
      items: []
    }
  },
  props: {
    // h | v (水平 | 垂直)
    direction: {
      type: String,
      default: 'h'
    },
    // names of active items
    value: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    classes() {
      const $style = this.$style
      return [
        $style.controlGroup,
        this.isStacked ? $style.v : ''
      ]
    },
    isStacked() {
      return this.direction === 'v'
    },
    activeItemsKeyByName() {
      return this.value.reduce((acc, cur) =>
        Object.assign(acc, {[cur]: true}), {})
    },
    statefulItems() {
      return this.items.filter(item => item.stateful)
    }
  },
  watch: {
    // parent 修改 value 时
    activeItemsKeyByName(value) {
      this.items.forEach(item => item.active = !!value[item.name_])
    }
  },
  methods: {
    addItem(item) {
      if(!item.name_) {
        item.name_ = this.items.length + 1
      }
      if(this.activeItemsKeyByName[item.name_]) {
        item.active = true
      }
      this.items.push(item)
    },
    toggleItemStates(item) {
      const exclusive = item.exclusive
      // 互斥 item 设置为非激活状态
      if(exclusive && !item.active) {
        this.statefulItems.forEach(item => {
          if(item.exclusive === exclusive) {
            item.active = false
          }
        })
      }
      // 激活状态置反
      item.active = !item.active

      this.$emit(
        'input',
        this.statefulItems.filter(item => item.active)
          .map(item => item.name_)
      )
      // setTimeout(() => console.log(this.value, 5555))
    },
  },
  components: {
  }
}
</script>

<style lang="postcss" module>
.controlGroup {
}

.v {
  flex-direction: column;
}
</style>
