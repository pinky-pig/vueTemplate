<script>
export default {
  name: 'Stack',
  props: {
    horizontal: Boolean,
    h: Boolean,
    normalFlow: Boolean
  },
  computed: {
    horizontal_() {
      return this.horizontal || this.h
    }
  },
  render(h) {
    const slots = this.$slots.default.filter(vnode => {
      const isComponent = (vnode.componentOptions && vnode.componentOptions.Ctor.extendOptions)
      if(!isComponent) {
        return false
      }
      const { tag } = vnode.componentOptions || vnode
      return tag === 'StackItem'
    })
    return h(
      'section',
      {
        class: [
          this.$style.stack,
          {[this.$style.horizontal]: this.horizontal_},
          {[this.$style.normalFlow]: this.normalFlow && !this.horizontal_}
        ]
      },
      slots
    )
  }
}
</script>

<style lang="css" module>
.stack {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  /* required */
  width: 100%;
  height: 100%;
}
.horizontal {
  flex-direction: row;
}
.normalFlow {
  height: auto;
}
</style>
