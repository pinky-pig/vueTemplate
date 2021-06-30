<template>
<svg :class="[fontFamily, $style.iconfont]" :style="[iconStyle]" aria-hidden="true">
  <use :xlink:href="`#${classPrefix}${name}`"></use>
</svg>
</template>

<script>
const Icon = {
  props: {
    fontFamily: String,
    classPrefix: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      required: true
    },
    fill: String,
    size: Number
  },
  computed: {
    iconStyle() {
      let style = {}
      this.fill && (style.fill = this.fill)
      this.size && (style.fontSize = `${this.size}px`)
      return style
    }
  }
}

export default Icon

export function createFromIconfontCN(options) {
  let url = options.url
  let fontFamily = options.fontFamily
  let classPrefix = options.classPrefix

  if(url) {
    const script = document.createElement('script')
    script.setAttribute('src', url)
    document.body.appendChild(script)
  }

  return {
    render(h) {
      return h(Icon, {
        on: this.$listeners,
        attrs: this.$attrs,
        props: {...this.$props, fontFamily: fontFamily, classPrefix: classPrefix}
      })
    }
  }
}
</script>

<style lang="postcss" module>
.iconfont {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
