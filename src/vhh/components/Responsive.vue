<script>
import ResizeObserver from './ResizeObserver'
const defaultBreakPoints = {
  'sm': 640,
  'md': 768,
  'lg': 1024,
  'xl': 1280,
  '2xl': 1536
}

/**
 * responsive => mobile first !
 *
 * polyfill: npm i @juggle/resize-observer
 */
export default {
  name: 'Responsive',
  // TODO: non-reactive !
  // provide() {
  //   return {
  //     $r: this.$r
  //   }
  // },
  data() {
    return {
      width: 0
    }
  },
  props: {
    // name <=> min-width
    breakpoints: {
      type: Object,
      default: () => defaultBreakPoints
    },
    // TODO: 基于元素 (组件子元素) resize 而不是 window#resize
    // elementBased: Boolean
  },
  computed: {
    $r() {
      return Object.keys(this.breakpoints).reduce((acc, cur) => {
        const minWidth = this.breakpoints[cur]
        acc[cur] = this.width >= minWidth
        return acc
      }, {})
    }
  },
  mounted() {
    // this.initResizeObserver()
  },
  methods: {
    onResize({width, height, entry}) {
      // console.log(444, width, height, entry)
      this.width = width
    },
    // initResizeObserver() {
    //   const ro = new ResizeObserver((entries, observer) => {
    //     const entry = entries[0]
    //     if(entry.contentBoxSize) {
    //       // Checking for chrome as using a non-standard array
    //       if (entry.contentBoxSize[0]) {
    //         // const { inlineSize: width, blockSize: height } = entry.contentBoxSize[0]
    //         this.width = entry.contentBoxSize[0].inlineSize
    //       } else {
    //         this.width = entry.contentBoxSize.inlineSize
    //       }
    //     } else {
    //       this.width = entry.contentRect.width
    //     }
    //   })
    //   ro.observe(document.body)
    //   this.$on('hook:beforeDestroy', () => ro.disconnect())
    // }
  },
  render(h) {
    // return this.$scopedSlots.default({
    //   $r: this.$r
    // })
    return h(
      ResizeObserver,
      {
        props: {
          body: true
        },
        on: {
          resize: this.onResize
        }
      },
      [
        this.$scopedSlots.default({
          $r: this.$r
        })
      ]
    )
  },
  components: {
    ResizeObserver
  }
}
</script>
