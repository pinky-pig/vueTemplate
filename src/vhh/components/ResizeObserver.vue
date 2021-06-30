<script>
/**
 * 兼听 child (this.$el) 或指定 element (target)
 * 统一为最新规范 API
 * polyfill: npm i @juggle/resize-observer
 */
export default {
  name: 'ResizeObserver',
  data() {
    return {
      width: null,
      height: null,
      contentBoxSize: null,
    }
  },
  props: {
    body: Boolean,
    target: {
      type: [Function]
    },
    box: {
      type: String,
      validator(value) {
        return []
      }
    }
  },
  mounted() {
    this.initResizeObserver()
  },
  methods: {
    initResizeObserver() {
      const ro = new ResizeObserver((entries, observer) => {
        const entry = entries[0]
        // 注意 新旧 API 兼容性
        const contentBoxSize = this.getContentBoxSize(entry)

        // width/height 常用 - contentBoxSize alias
        this.width = contentBoxSize.inlineSize
        this.height = contentBoxSize.blockSize
        // contentBoxSize 常用
        this.contentBoxSize = contentBoxSize

        this.$emit('resize', {
          width: this.width,
          height: this.height,
          contentBoxSize: this.contentBoxSize,
          entry
        })
      })

      let target = this.$el
      if(this.body) {
        target = document.body
      } else if(this.target) {
        target = this.target()
      }

      ro.observe(target)
      this.$on('hook:beforeDestroy', () => ro.disconnect())
    },
    getContentBoxSize(entry) {
      // 旧 API
      if(!entry.contentBoxSize) {
        return {
          inlineSize: entry.contentRect.width,
          blockSize: entry.contentRect.height
        }
      }

      // Checking for chrome as using a non-standard array
      if (entry.contentBoxSize[0]) {
        return entry.contentBoxSize[0]
      }

      return entry.contentBoxSize
    },
  },
  render() {
    return this.$scopedSlots.default({
      width: this.width,
      height: this.height,
      contentBoxSize: this.contentBoxSize,
    })
  },
}
</script>
