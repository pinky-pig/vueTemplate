<template>
<div :class="$style.quillContainer">
  <!-- <slot name="toolbar"></slot> -->
  <div ref="editor" :class="[$style.editor, {[$style.viewMode]: viewMode}, editorClass]"></div>
</div>
</template>

<script>
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'

/**
 * https://github.com/surmon-china/vue-quill-editor
 *
 * - TODO: toolbar slot
 * - view-mode: `<v-quill-editor view-mode :content="content"></v-quill-editor>`
 */
const defaultOptions = {
  theme: 'snow',
  boundary: document.body,
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      // [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      // [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'],
      // ['link', 'image', 'video']
    ]
  },
  // placeholder: '',
  readOnly: false
}

const viewModeOptions = {
  modules: {
    toolbar: []
  },
  readOnly: true
}

export default {
  name: 'v-quill-editor',
  model: {
    prop: 'content',
    // event: 'input'
  },
  data() {
    return {
      // paste => 赋值死循环 问题
      _content: ''
    }
  },
  props: {
    // html
    content: {
      type: String
    },
    config: {
      type: Object,
      default: () => ({})
    },
    viewMode: Boolean,
    editorClass: {
      type: String
    }
  },
  watch: {
    // Watch content change
    content(newVal, oldVal) {
      // console.log('watch#pasteHTML', `[${newVal}]`, `[${oldVal}]`)
      if (newVal && newVal !== this._content) {
        // this._content = newVal
        this.quill.pasteHTML(newVal)
      } else if(!newVal) {
        this.quill.setText('')
      }
    }
  },
  created() {
    this.quill = null
  },
  mounted() {
    let options = this.viewMode ? viewModeOptions : {
      ...defaultOptions,
      ...this.config,
    }
    let quill = this.quill = new Quill(this.$refs.editor, options)

    if(this.content) {
      this.quill.pasteHTML(this.content)
    }

    // Mark model as touched if editor lost focus
    quill.on('selection-change', range => {
      if (!range) {
        this.$emit('blur', quill)
      } else {
        this.$emit('focus', quill)
      }
    })

    // Update model if text changes
    this.quill.on('text-change', (delta, oldDelta, source) => {
      let html = this.$refs.editor.children[0].innerHTML
      const text = this.quill.getText()
      if (html === '<p><br></p>') {
        html = ''
      }

      // console.log('text-change', `[${html}]`)

      this._content = html

      this.$emit('input', html)
      this.$emit('change', { html, text, quill })
    })
  },
  beforeDestroy() {
    this.quill = null
  },
  methods: {
  },
  components: {
  }
}
</script>

<style lang="postcss" module>
.quillContainer {
  box-sizing: border-box;
  width: 100%;
  // height: 400px;

  .viewMode {
    height: auto;
  }
}

.editor {
  height: 400px;
  // preserveWhitespace
  // https://github.com/quilljs/quill/issues/1751
  // white-space: normal!important;
  white-space:pre-wrap;
}
</style>
