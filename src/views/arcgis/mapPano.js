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


const initPano = function (elementName, xml) {
  debugger
  loadScript(krpanoScriptUrl).then(() => window.embedpano)
  var el = document.createElement('script')
  el.type = 'text/javascript'
  el.async = true
  el.text = `embedpano({swf:"/krpano/tour.swf", xml:"${xml}", target:"pano", html5:"auto", mobilescale:1.0, passQueryParameters:true});`
  let panoDom = document.getElementById(`${elementName}`)
  panoDom.appendChild(el)
}
export default initPano