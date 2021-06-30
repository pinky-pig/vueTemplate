<template>
<div :class="$style.simplePdfViewer">
  <div ref="viewerContainer" :class="$style.viewerContainer">
    <div class="pdfViewer" :class="$style.pdfViewer"></div>
  </div>
</div>
</template>

<script>
require('pdfjs-dist/web/pdf_viewer.css')
const pdfjsLib = require('pdfjs-dist')
const pdfjsViewer = require('pdfjs-dist/web/pdf_viewer')
const workerPath = require('pdfjs-dist/build/pdf.worker.entry')

/**
 * usage:
 * - 建议使用页面组件 (router component) 包裹该组件, 并异步引入页面组件
 * - 可以通过 router query 给包裹的页面组件传入 props
 * - copy-webpack-plugin 复制 /node_modules/pdfjs-dist/cmaps/
 *
 * refs:
 * - https://github.com/mozilla/pdf.js/blob/master/examples/components/simpleviewer.html
 */

/**
// vue.config.js
configureWebpack: {
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'node_modules/pdfjs-dist/cmaps/'),
        to: 'pdf/cmaps/',
      }
    ])
  ]
},
 */
export default {
  name: 'SimplePdfViewer',
  data() {
    return {
    }
  },
  props: {
    url: String,
    cmapUrl: {
      type: String,
      default: process.env.BASE_URL + 'pdf/cmaps/'
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      pdfjsLib.GlobalWorkerOptions.workerSrc = workerPath
      const CMAP_URL = this.cmapUrl
      const CMAP_PACKED = true

      var SEARCH_FOR = ""; // try 'Mozilla';

      const container = this.$refs.viewerContainer

      const eventBus = new pdfjsViewer.EventBus()

      // (Optionally) enable hyperlinks within PDF files.
      const pdfLinkService = new pdfjsViewer.PDFLinkService({
        eventBus,
      })

      // (Optionally) enable find controller.
      const pdfFindController = new pdfjsViewer.PDFFindController({
        eventBus,
        linkService: pdfLinkService,
      })

      const pdfViewer = new pdfjsViewer.PDFViewer({
        container,
        eventBus,
        linkService: pdfLinkService,
        findController: pdfFindController,
      })
      pdfLinkService.setViewer(pdfViewer)

      eventBus.on("pagesinit", function () {
        // We can use pdfViewer now, e.g. let's change default scale.
        pdfViewer.currentScaleValue = "page-width"

        // We can try searching for things.
        if (SEARCH_FOR) {
          pdfFindController.executeCommand("find", { query: SEARCH_FOR })
        }
      })

      // Loading document.
      var loadingTask = pdfjsLib.getDocument({
        url: this.url,
        cMapUrl: CMAP_URL,
        cMapPacked: CMAP_PACKED,
      })
      loadingTask.promise.then(function (pdfDocument) {
        // Document loaded, specifying document for the viewer and
        // the (optional) linkService.
        pdfViewer.setDocument(pdfDocument)

        pdfLinkService.setDocument(pdfDocument, null)
      })

    }
  },
  components: {
  }
}
</script>

<style lang="postcss" module>
.simplePdfViewer {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #808080;
}

.viewerContainer {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: auto;
}

/* 页面居中问题 (右侧边距较小问题) */
.pdfViewer {
  > :global(.page) {
    box-sizing: content-box;
  }
}
</style>
