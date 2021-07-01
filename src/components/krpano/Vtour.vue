<template>
  <div id="pano" class=" w-full h-full">
    <slot></slot>
  </div>
</template>

<script>
// 加载krpano.js
function loadScript (src) {
  return new Promise(function (resolve, reject) {
    let shouldAppend = false
    let el = document.querySelector('script[src="' + src + '"]')
    if (!el) {
      el = document.createElement('script')
      el.type = 'text/javascript'
      el.async = true
      el.src = src
      shouldAppend = true
    }
    else if (el.hasAttribute('data-loaded')) {
      resolve(el)
      return
    }
    el.addEventListener('error', reject)
    el.addEventListener('abort', reject)
    el.addEventListener('load', function loadScriptHandler() {
      el.setAttribute('data-loaded', true)
      resolve(el)
    })
    if (shouldAppend) document.head.appendChild(el)
  })
}
const krpanoScriptUrl = '/krpano/krpano.js'
// loadScript(krpanoScriptUrl).then(() => window.embedpano )
export default {
  data() {
    return {
      //krpano对象
      krpano: document.querySelector('#krpanoSWFObject'),
      // xml: 'http://www.jshhxx.cn/hh-pano/QJ_ChongQingWuLongHuangYing/QJ_WL_02/tour_pic1.xml',
      xml:"/krpano/tour.xml",
    }
  },
  async mounted() {

    await loadScript(krpanoScriptUrl).then(() => window.embedpano )

    // 在页面加载全景
    var el = document.createElement('script')
    el.type = 'text/javascript'
    el.async = true
    el.text = `embedpano({swf:"/krpano/tour.swf", xml:"${this.xml}", target:"pano", html5:"auto", mobilescale:1.0, passQueryParameters:true});`
    // el.text = `embedpano({swf:"/krpano/tour.swf", xml:"/krpano/tour.xml", target:"pano", html5:"auto", mobilescale:1.0, passQueryParameters:true});`
    let panoDom = document.getElementById('pano')
    panoDom.appendChild(el)

    this.onready()
},
  methods:{
    onready() {

    }
  }
}
</script>

<style>

</style>
